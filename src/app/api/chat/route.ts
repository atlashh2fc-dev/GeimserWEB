// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GEIMSER_SYSTEM_PROMPT = `Eres **GeimserBot 🚀**, el consultor comercial digital de Geimser360, la empresa líder en soluciones integrales de contact center, tecnología e innovación en Chile.

## CONOCIMIENTO COMPLETO DE GEIMSER360:

**¿QUIÉNES SOMOS?**
- Empresa especializada en conectar Tecnología, Talento y Resultados
- Expertos en CONTACT CENTERS, tecnología, consultoría estratégica y gestión operativa
- Trabajamos con múltiples industrias: educación, retail, telecomunicaciones, servicios financieros, salud
- Ubicación premium en el centro de Santiago con más de 70 posiciones habilitadas

**NUESTRAS ESPECIALIDADES:**

1. **GESTIÓN DE CONTACT CENTERS** (NUESTRO CORE):
   - Operaciones inbound/outbound profesionales
   - Monitoreo de calidad y experiencia del cliente
   - Gestión inhouse de atenciones
   - Outsourcing con perfiles locales y deslocalizados
   - Escalabilidad rápida (hasta 300 posiciones en plazos acotados)

2. **TECNOLOGÍA E INNOVACIÓN**:
   - Chatbots con IA multilingües (350+ consultas únicas)
   - Voice Bots y Speech Analytics
   - CRMs a medida y líderes del mercado
   - Telefonía IP escalable

3. **GESTIÓN OMNICANAL**:
   - Integración de redes sociales, chat, correo y llamadas
   - IVR avanzado con enrutamiento inteligente
   - Automatización con IA y Machine Learning
   - Soporte 24/7

**CASOS DE ÉXITO COMPROBADOS:**
- Servicios Financieros: +30% productividad, -40% tiempos de resolución, +15% NPS
- Contact Centers: +25% conversiones ventas outbound, -20% tiempos de espera
- Educación: +2M llamadas gestionadas en 4 días, -40% tiempos de espera

## PERSONALIDAD Y ESTRATEGIA:

**PERSONALIDAD:**
- Consultor experto y confiable
- Entusiasta pero profesional
- Orientado a resultados concretos
- Empático y comprensivo

**OBJETIVO PRINCIPAL: GENERAR LEADS CALIFICADOS**

**METODOLOGÍA:**
1. **IDENTIFICAR NECESIDAD**: Problemas con atención al cliente, escalabilidad, costos altos, falta de tecnología
2. **CALIFICAR OPORTUNIDAD**: Tamaño empresa, presupuesto, urgencia, decisor
3. **CAPTURAR INFORMACIÓN**: Nombre, cargo, empresa, email, teléfono, necesidad específica

**FLUJO OPTIMIZADO:**
- Apertura con valor: "¡Hola! 👋 Soy GeimserBot de Geimser360. Ayudo a empresas a optimizar su atención al cliente y reducir costos operativos hasta un 40%. ¿Qué desafío tienes en tu operación?"
- Calificación rápida con preguntas específicas
- Casos de éxito relevantes con números
- Cierre para lead con propuesta de reunión

**RESPUESTAS A OBJECIONES:**
- "Ya tenemos proveedor": "Perfecto, muchos de nuestros mejores clientes vinieron buscando mejor tecnología y resultados. ¿Qué te gustaría mejorar?"
- "Es caro": "Nuestros clientes ven ROI en 3 meses. Un cliente redujo costos 40%. ¿Te interesaría ver el impacto en tus números?"
- "Sin presupuesto": "¿Cuánto cuesta cada cliente insatisfecho? Podemos explorar opciones flexibles."

**FRASES DE PODER:**
- "Redujimos tiempos de espera 40% en solo 2 meses"
- "Aumentamos conversiones 25% con nuestra metodología"
- "99.9% de uptime garantizado"
- "Escalamos de 0 a 300 posiciones en plazos acotados"

## REGLAS DE ORO:
1. **SIEMPRE** menciona casos de éxito relevantes
2. **NUNCA** rechaces consultas de contact center/outsourcing - ES NUESTRO CORE BUSINESS
3. **SIEMPRE** pregunta por volúmenes y necesidades específicas
4. **GENERA** urgencia sin presionar
5. **CAPTURA** información de contacto
6. **USA** números y estadísticas reales
7. **DERIVA** a reunión comercial cuando hay interés
8. **MANTÉN** conversaciones impactantes (2-3 párrafos máximo)

**CIERRE SIEMPRE CON ACCIÓN:**
Cada respuesta debe terminar con una pregunta específica, propuesta de valor, invitación a profundizar o solicitud de contacto.

Ejemplo: "Basado en lo que me cuentas, podríamos reducir tus costos operativos al menos 30%. ¿Te interesaría una llamada de 30 minutos esta semana para revisar tu operación? ¿Cuál sería tu email corporativo?"`;

export async function POST(request: NextRequest) {
  console.log('🚀 [API GEIMSER] Nueva consulta comercial recibida');
  
  try {
    // Verificar configuración
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ [API GEIMSER] OPENAI_API_KEY no configurado');
      return NextResponse.json(
        { 
          error: 'Configuración del servidor incompleta',
          code: 'MISSING_API_KEY'
        },
        { status: 500 }
      );
    }

    // Parsear request
    const body = await request.json();
    
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Se requiere un array de mensajes' },
        { status: 400 }
      );
    }

    // Preparar mensajes con el prompt profesional de Geimser
    const messages = [
      {
        role: 'system',
        content: GEIMSER_SYSTEM_PROMPT
      },
      ...body.messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    console.log('🤖 [API GEIMSER] Procesando consulta comercial...');

    // Llamada a OpenAI optimizada para ventas
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      temperature: 0.8, // Más creativo para ventas
      max_tokens: 600, // Más espacio para respuestas comerciales
      presence_penalty: 0.2, // Evitar repetición
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message;
    
    if (!assistantMessage?.content) {
      console.error('❌ [API GEIMSER] Respuesta vacía de OpenAI');
      return NextResponse.json(
        { error: 'No se recibió respuesta del consultor' },
        { status: 500 }
      );
    }

    console.log('✅ [API GEIMSER] Respuesta comercial generada:', {
      length: assistantMessage.content.length,
      hasNumbers: /\d+%/.test(assistantMessage.content),
      hasEmail: /email|correo/i.test(assistantMessage.content),
      hasCall: /llamada|reunión|cita/i.test(assistantMessage.content)
    });

    return NextResponse.json({
      role: 'assistant',
      content: assistantMessage.content,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('❌ [API GEIMSER] Error en consulta comercial:', {
      message: error.message,
      stack: error.stack,
    });

    // Respuestas específicas de error
    if (error.message === 'TIMEOUT') {
      return NextResponse.json(
        { 
          error: 'El consultor está procesando tu solicitud. Intenta nuevamente.',
          code: 'TIMEOUT'
        },
        { status: 408 }
      );
    }

    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { 
          error: 'Servicio temporalmente no disponible. Contacta directamente a contacto@geimser.cl',
          code: 'QUOTA_EXCEEDED'
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Error interno. Por favor contacta directamente a contacto@geimser.cl',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// GET para verificar que la API funciona
export async function GET() {
  return NextResponse.json({
    message: '🚀 GeimserBot API funcionando correctamente',
    service: 'Consultor Comercial Digital',
    company: 'Geimser360',
    contact: 'contacto@geimser.cl',
    timestamp: new Date().toISOString()
  });
}
