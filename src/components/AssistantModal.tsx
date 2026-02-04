'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Send, Loader2, Phone, Mail, TrendingUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { saveLead } from './saveLead';
import { obtenerRespuestaGPT, type Message as GPTMessage } from './GPTService';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AssistantModal({ isOpen, onClose }: AssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: '¡Hola! 👋 Soy GeimserBot de Geimser360. Ayudo a empresas a optimizar su atención al cliente y reducir costos operativos hasta un 40%. ¿Qué desafío tienes en tu operación de contact center o atención al cliente?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus en input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const messageText = input.trim();
    if (!messageText || loading) return;

    console.log('🚀 [GEIMSER MODAL] Nueva consulta comercial:', messageText);

    // Mensaje del usuario
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Preparar mensajes para el consultor GPT
      const gptMessages: GPTMessage[] = updatedMessages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      console.log('🤖 [GEIMSER MODAL] Consultando con GeimserBot...');

      // Obtener respuesta del consultor
      const { answer, leadCompleted, leadData } = await obtenerRespuestaGPT(gptMessages);

      console.log('✅ [GEIMSER MODAL] Respuesta comercial recibida:', {
        answerLength: answer.length,
        leadCompleted,
        hasContactInfo: !!(leadData.correo || leadData.telefono)
      });

      // Mensaje del bot consultor
      const botMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // INTENTO DE GUARDADO ROBUSTO (LOOSE LEADS)
      // Guardamos SIEMPRE que haya interacción, actualizando el registro si ya existe
      try {
        // Enriquecer datos del lead
        const currentLeadData = {
          ...leadData,
          fuente: 'Chat Widget Geimser360',
          tipo_interes: leadData.tipo_interes || 'Consulta General',
          conversacion_completa: updatedMessages.map(m => `${m.role}: ${m.content}`).join('\n---\n'),
          // Si ya tenemos un ID capturado en esta sesión, lo enviamos para actualizar
          id: (window as any).__currentLeadId || undefined
        };

        // Guardamos (o actualizamos)
        const savedId = await saveLead(currentLeadData);

        // Si nos devuelve un ID, lo guardamos en la sesión
        if (savedId) {
          (window as any).__currentLeadId = savedId;
          console.log('💾 Sesión de chat sincronizada con ID:', savedId);
        }

        // Si es LEAD CALIFICADO COMPLETO (tiene datos de contacto), marcamos visualmente
        if (leadCompleted && (leadData.correo || leadData.telefono) && !leadCaptured) {
          console.log('💎 [GEIMSER MODAL] Lead calificado completo detectado!');
          setLeadCaptured(true);

          // Mensaje de confirmación interno
          setTimeout(() => {
            const confirmMessage: Message = {
              id: uuidv4(),
              role: 'assistant',
              content: '🎯 Perfecto, he registrado tu información de contacto. Nuestro equipo revisará esta conversación y te contactará a la brevedad.',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, confirmMessage]);
          }, 1000);
        }

      } catch (saveError) {
        console.warn('⚠️ Error al intentar guardar loose lead:', saveError);
      }

    } catch (error) {
      console.error('❌ [GEIMSER MODAL] Error en consulta:', error);

      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Disculpa, hubo un problema técnico. Puedes contactarnos directamente a contacto@geimser.cl o al teléfono que aparece en nuestro sitio. ¡Estaremos encantados de ayudarte!',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-20 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-6rem)]"
    >
      {/* Modal con vidrio templado transparente */}
      <div className="relative w-full h-full rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">

        {/* Efectos de vidrio templado */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 rounded-3xl"></div>

        {/* Header con MUCHO más espacio vertical */}
        <div className="relative flex items-center justify-between px-6 py-8 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
              <Zap className="w-6 h-6 text-blue-300" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-bold text-lg leading-tight">GeimserBot 🚀</h3>
              <p className="text-sm /80 leading-tight">Consultor Comercial Digital</p>
              <p className="text-xs text-blue-300/90 leading-tight">Especialista en Contact Centers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-col">
            {leadCaptured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/20 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-300 font-medium">Lead Capturado</span>
              </motion.div>
            )}

            <button
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/20"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container ajustado para el header más alto */}
        <div className="relative flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm ${message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80  rounded-br-md shadow-lg border border-blue-400/20'
                    : 'bg-white/10  rounded-bl-md border border-white/10 shadow-lg'
                  }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100/70' : '/50'}`}>
                  {message.timestamp.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator mejorado */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl rounded-bl-md border border-white/10 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-300" />
                    <div className="absolute inset-0 w-5 h-5 border-2 border-blue-300/20 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm">GeimserBot está analizando tu consulta...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area con vidrio templado */}
        <div className="relative p-5 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Cuéntame sobre tu operación..."
                disabled={loading}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200"
                maxLength={500}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-600/80 hover:to-blue-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 shadow-lg border border-blue-400/20 backdrop-blur-sm"
              aria-label="Enviar mensaje"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Contact info footer con mejor diseño */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs /60">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Mail className="w-3.5 h-3.5" />
              <span>contacto@geimser.cl</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Phone className="w-3.5 h-3.5" />
              <span>Santiago, Chile</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
