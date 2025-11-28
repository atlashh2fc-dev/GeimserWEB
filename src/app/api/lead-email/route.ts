import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// Configuración genérica SMTP (compatible con cPanel, Gmail, etc.)
const REQUIRED_ENV_VARS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM'];

function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno para email: ${missing.join(', ')}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    validateEnv();

    const body = await request.json();

    const {
      nombre,
      correo,
      telefono,
      empresa,
      mensaje,
      tipo_interes,
      conversacion_completa,
      fuente,
      user_agent,
      url_origen,
    } = body || {};

    const subject = `🚀 Nuevo lead desde GeimserBot - ${nombre || 'Usuario del chat'}`;

    const textLines = [
      'Se ha generado un nuevo lead desde el chat GeimserBot.',
      '',
      '📌 Datos del lead:',
      `- Nombre: ${nombre || 'No especificado'}`,
      `- Empresa: ${empresa || 'No especificada'}`,
      `- Correo: ${correo || 'No especificado'}`,
      `- Teléfono: ${telefono || 'No especificado'}`,
      `- Tipo de interés: ${tipo_interes || 'No especificado'}`,
      '',
      '📝 Mensaje principal:',
      mensaje || 'Sin mensaje registrado',
      '',
      '💬 Conversación completa:',
      conversacion_completa || 'No se registró el detalle de la conversación.',
      '',
      '🔎 Metadatos:',
      `- Fuente: ${fuente || 'Chat Widget Geimser'}`,
      `- URL de origen: ${url_origen || 'No disponible'}`,
      `- User Agent: ${user_agent || 'No disponible'}`,
      '',
      '---',
      'Este correo fue enviado automáticamente por GeimserBot.',
    ];

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      // Si MAIL_TO no está definido, por defecto se usa el buzón de GeimserBot
      to: process.env.MAIL_TO || 'geimserbot@geimser.cl',
      subject,
      text: textLines.join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('❌ [API LEAD EMAIL] Error al enviar email:', {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        ok: false,
        error: 'No se pudo enviar el correo de notificación',
      },
      { status: 500 },
    );
  }
}
