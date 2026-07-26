import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/server/rateLimit';

export const runtime = 'nodejs';
const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM'];
const clean = (value: unknown, limit: number) => typeof value === 'string' ? value.trim().slice(0, limit) : '';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(`contact-form:${ip}`, { limit: 8, windowMs: 60_000 }).allowed) return NextResponse.json({ error: 'Demasiados intentos' }, { status: 429 });
  try {
    const body = await request.json();
    const name = clean(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 32);
    const message = clean(body.message, 2000);
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Datos de contacto inválidos' }, { status: 400 });
    const missing = requiredEnv.filter((key) => !process.env[key]);
    const recipient = process.env.CONTACT_FORM_TO || process.env.MAIL_TO;
    if (missing.length || !recipient) return NextResponse.json({ error: 'Servicio de contacto no configurado' }, { status: 503 });
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT), secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    await transporter.sendMail({ from: process.env.MAIL_FROM, to: recipient, replyTo: email, subject: `Nueva solicitud web de ${name}`, text: [`Nueva solicitud enviada desde www.geimser.cl`, '', `Nombre: ${name}`, `Correo: ${email}`, `Teléfono: ${phone || 'No informado'}`, '', 'Mensaje:', message].join('\n') });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] Mail delivery failed', error);
    return NextResponse.json({ error: 'No se pudo enviar la solicitud' }, { status: 502 });
  }
}
