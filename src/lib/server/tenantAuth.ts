import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';

function sha256Hex(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

export async function resolveTenantIdFromBearerToken(token: string): Promise<{ tenantId: string; apiKeyId: string }> {
  const supabase = getSupabaseAdmin();
  const secretHash = sha256Hex(token);

  const { data, error } = await supabase
    .from('tenant_api_keys')
    .select('id, tenant_id, active')
    .eq('secret_hash', secretHash)
    .eq('active', true)
    .maybeSingle();

  if (error) throw error;
  if (!data?.tenant_id) {
    throw new Error('Invalid API token');
  }

  return { tenantId: data.tenant_id as string, apiKeyId: data.id as string };
}

