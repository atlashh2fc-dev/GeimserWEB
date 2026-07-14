import 'server-only';

import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const EXPERIENCE_COOKIE = 'gx-experience-session';
export const EXPERIENCE_SESSION_SECONDS = 60 * 60 * 12;

type AccessPayload = {
  aud: 'geimser-experience';
  exp: number;
  iat: number;
  jti: string;
  sub: string;
  v: 1;
};

function requiredEnv(name: 'EXPERIENCE_AUTH_SECRET' | 'EXPERIENCE_USERNAME' | 'EXPERIENCE_PASSWORD') {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function safeMatch(supplied: string, expected: string) {
  const left = Buffer.from(supplied, 'utf8');
  const right = Buffer.from(expected, 'utf8');
  return left.length === right.length && timingSafeEqual(left, right);
}

function signature(payload: string) {
  return createHmac('sha256', requiredEnv('EXPERIENCE_AUTH_SECRET'))
    .update(payload)
    .digest('base64url');
}

export function validExperienceCredentials(username: string, password: string) {
  return safeMatch(username, requiredEnv('EXPERIENCE_USERNAME'))
    && safeMatch(password, requiredEnv('EXPERIENCE_PASSWORD'));
}

export function createExperienceSession(username: string) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AccessPayload = {
    aud: 'geimser-experience',
    exp: now + EXPERIENCE_SESSION_SECONDS,
    iat: now,
    jti: randomUUID(),
    sub: username,
    v: 1,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return `${encoded}.${signature(encoded)}`;
}
