import { NextRequest, NextResponse } from 'next/server';
import {
  createExperienceSession,
  EXPERIENCE_COOKIE,
  EXPERIENCE_SESSION_SECONDS,
  validExperienceCredentials,
} from '@/lib/experience/accessSession';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function noStore(response: NextResponse) {
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json().catch(() => ({ username: '', password: '' }));

  try {
    if (!validExperienceCredentials(String(username ?? ''), String(password ?? ''))) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      return noStore(NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 401 }));
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(EXPERIENCE_COOKIE, createExperienceSession(String(username)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: EXPERIENCE_SESSION_SECONDS,
    });
    return noStore(response);
  } catch {
    return noStore(NextResponse.json({ error: 'El acceso comercial no está configurado.' }, { status: 503 }));
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(EXPERIENCE_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return noStore(response);
}
