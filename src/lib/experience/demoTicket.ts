import 'server-only';

import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const demoProducts = ['itsm', 'learning', 'legal', 'crm'] as const;
export type DemoProductId = (typeof demoProducts)[number];

type DemoTicketPayload = {
  aud: 'geimser-product-demo';
  exp: number;
  iat: number;
  jti: string;
  product: DemoProductId;
};

function ticketSecret() {
  const secret = process.env.SUPABASE_JWT_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error('Demo ticket signing is not configured.');
  return secret;
}

function encode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function signature(payload: string) {
  return createHmac('sha256', ticketSecret()).update(payload).digest('base64url');
}

export function isDemoProduct(value: string): value is DemoProductId {
  return demoProducts.includes(value as DemoProductId);
}

export function issueDemoTicket(product: DemoProductId) {
  const now = Math.floor(Date.now() / 1000);
  const payload: DemoTicketPayload = {
    aud: 'geimser-product-demo',
    exp: now + 90,
    iat: now,
    jti: randomUUID(),
    product,
  };
  const encoded = encode(JSON.stringify(payload));
  return `${encoded}.${signature(encoded)}`;
}

export function verifyDemoTicket(ticket: string, product: DemoProductId) {
  const [encoded, suppliedSignature] = ticket.split('.');
  if (!encoded || !suppliedSignature) return false;

  const expected = Buffer.from(signature(encoded));
  const supplied = Buffer.from(suppliedSignature);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as DemoTicketPayload;
    const now = Math.floor(Date.now() / 1000);
    return payload.aud === 'geimser-product-demo'
      && payload.product === product
      && payload.iat <= now + 5
      && payload.exp >= now
      && payload.exp - payload.iat <= 90;
  } catch {
    return false;
  }
}
