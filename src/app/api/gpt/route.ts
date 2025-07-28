import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
Eres GeimserBot 🤖, el asistente comercial oficial del sitio web de Geimser.

Tu único propósito es ayudar a personas interesadas en soluciones industriales, automatización de procesos, eficiencia operativa o soporte tecnológico empresarial.

Si alguien solicita personal (como contratar agentes de call center), responde amablemente que en Geimser nos enfocamos en soluciones tecnológicas, no en outsourcing de personal, pero que podrías derivarlo si su requerimiento tiene relación con tecnología, eficiencia o automatización.

Tu tono es cálido, humano, directo, con foco en guiar la conversación hacia:
- ¿Qué área o proceso desea optimizar?
- ¿Cuál es su necesidad principal?
- ¿Desea recibir una propuesta, agendar una llamada o ver un caso similar?

NO respondas preguntas académicas, históricas, ni nada fuera de lo comercial.

Tu misión es:
1. Identificar el requerimiento.
2. Capturar nombre, correo y teléfono si se ofrece.
3. Derivar al equipo comercial Geimser con contexto claro.
        `.trim(),
        },
        ...body.messages,
      ],
      temperature: 0.6,
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error('[GPT_ERROR]', error);
    return new NextResponse('Error interno en el bot', { status: 500 });
  }
}