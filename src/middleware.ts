import { NextRequest, NextResponse } from 'next/server';

const EXPERIENCE_COOKIE = 'gx-experience-session';

type AccessPayload = {
  aud?: string;
  exp?: number;
  iat?: number;
  sub?: string;
  v?: number;
};

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function validSession(token: string | undefined) {
  const secret = process.env.EXPERIENCE_AUTH_SECRET?.trim();
  if (!token || !secret) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    const authentic = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(signature),
      new TextEncoder().encode(encoded),
    );
    if (!authentic) return false;

    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(encoded))) as AccessPayload;
    const now = Math.floor(Date.now() / 1000);
    return payload.aud === 'geimser-experience'
      && payload.v === 1
      && typeof payload.sub === 'string'
      && payload.sub.length > 0
      && typeof payload.iat === 'number'
      && payload.iat <= now + 5
      && typeof payload.exp === 'number'
      && payload.exp >= now
      && payload.exp - payload.iat <= 60 * 60 * 12;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/experiencia/acceso' || pathname === '/api/experience/auth') {
    return NextResponse.next();
  }

  // Los SaaS integrados validan tickets desde sus servidores y no comparten la cookie del hub.
  if (pathname === '/api/experience/demo-ticket' && request.method === 'POST') {
    return NextResponse.next();
  }

  if (await validSession(request.cookies.get(EXPERIENCE_COOKIE)?.value)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'Acceso comercial requerido.' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  const login = request.nextUrl.clone();
  login.pathname = '/experiencia/acceso';
  login.search = '';
  login.searchParams.set('next', '/experiencia');
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ['/experiencia/:path*', '/api/experience/:path*'],
};
