import { NextRequest, NextResponse } from 'next/server';
import { isDemoProduct, issueDemoTicket } from '@/lib/experience/demoTicket';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function noStore(response: NextResponse) {
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
}

export async function GET(request: NextRequest) {
  const product = request.nextUrl.searchParams.get('product') ?? '';
  if (!isDemoProduct(product)) {
    return noStore(NextResponse.json({ error: 'Producto inválido.' }, { status: 400 }));
  }

  const fetchSite = request.headers.get('sec-fetch-site');
  const referer = request.headers.get('referer');
  const sameOriginReferer = referer?.startsWith(`${request.nextUrl.origin}/`) ?? false;
  if (fetchSite && fetchSite !== 'same-origin' && !sameOriginReferer) {
    return noStore(NextResponse.json({ error: 'Origen no autorizado.' }, { status: 403 }));
  }

  return noStore(NextResponse.json({ ticket: issueDemoTicket(product), expiresIn: 90 }));
}

export async function POST(request: NextRequest) {
  const { product, ticket } = await request.json().catch(() => ({ product: '', ticket: '' }));
  if (!isDemoProduct(String(product))) {
    return noStore(NextResponse.json({ valid: false }, { status: 400 }));
  }

  const { verifyDemoTicket } = await import('@/lib/experience/demoTicket');
  const valid = verifyDemoTicket(String(ticket ?? ''), product);
  return noStore(NextResponse.json({ valid }, { status: valid ? 200 : 401 }));
}
