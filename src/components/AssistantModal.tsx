'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bot, Send } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { saveLead } from './saveLead';
import { obtenerRespuestaGPT } from './GPTService';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const systemPrompt = {
  role: 'system',
  content: `Eres GeimserBot 🤖, el asistente comercial oficial del sitio web de Geimser.
Tu propósito es ayudar a personas interesadas en soluciones industriales, automatización de procesos o soporte tecnológico.
Guía la conversación con preguntas como:
- ¿Qué tipo de solución estás buscando?
- ¿Cuál es tu desafío actual en tu empresa?
- ¿Quieres que te agendemos una llamada o te preparemos una propuesta?
Evita responder cosas fuera del ámbito comercial.`
};

export default function AssistantModal({ isOpen, onClose }: AssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: uuidv4(), role: 'assistant', content: 'Hola 👋 Soy parte del equipo Geimser. Cuéntame qué necesitas y me encargaré de derivarlo al equipo comercial correcto.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const { answer, leadCompleted, leadData } = await obtenerRespuestaGPT([
        systemPrompt,
        ...updatedMessages
      ]);

      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: answer
        }
      ]);

      if (leadCompleted) {
        await saveLead(leadData);
      }
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="relative w-full max-w-md p-4 rounded-xl bg-[#171c39] shadow-lg border border-white/10 backdrop-blur-md text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Bot className="w-5 h-5" />
            Asistente Comercial Geimser
          </div>
          <button onClick={onClose} className="hover:text-red-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-72 overflow-y-auto space-y-3 pr-1 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl px-4 py-2 max-w-[90%] whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white self-end ml-auto'
                  : 'bg-white/10 text-white self-start mr-auto'
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder:text-white/50 outline-none"
            placeholder="Escribe tu mensaje aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition disabled:opacity-50"
            disabled={loading}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}