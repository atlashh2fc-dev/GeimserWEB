'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { sileo } from 'sileo';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Building2, Calendar, Globe, LogOut, Mail, Phone, RefreshCw, X } from 'lucide-react';

interface Lead {
  id: number;
  created_at: string;
  nombre: string;
  correo: string | null;
  telefono: string | null;
  empresa: string | null;
  mensaje: string | null;
  tipo_interes: string;
  fuente: string;
  estado: string;
  conversacion_completa?: string | null;
  tenants?: { name: string; slug: string } | null;
}

type RangeDays = 7 | 30 | 90;

type TenantOption = { id: string; name: string; slug: string; status: string };
type Kpis = {
  total_leads: number;
  leads_in_range: number;
  leads_7d: number;
  leads_30d: number;
  leads_today: number;
};
type TopTenant = { tenant_id: string; slug: string; name: string; leads_count: number };
type TimeseriesPoint = { day: string; leads_count: number };

type DashboardResponse = {
  ok: boolean;
  scope: 'global' | 'tenant';
  tenant: { id: string; name: string; slug: string } | null;
  rangeDays: RangeDays;
  dateFrom: string;
  dateTo: string;
  tenants: TenantOption[];
  kpis: Kpis;
  topTenants: TopTenant[];
  timeseries: TimeseriesPoint[];
  latestLeads: Lead[];
  error?: string;
};

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  } catch {
    return value;
  }
}

function safeSlug(value: string | null | undefined): string {
  const v = (value || '').trim();
  return v || 'global';
}

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tenantSlug, setTenantSlug] = useState<string>('global');
  const [rangeDays, setRangeDays] = useState<RangeDays>(30);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const auth = getCookie('geimser_admin_auth');
    if (!auth) {
      router.push('/super-admin-7zX9/login');
      return;
    }

    const qpTenantRaw = searchParams.get('tenant');
    const hasTenantParam = qpTenantRaw !== null;
    const qpTenant = safeSlug(qpTenantRaw);
    const qpRange = Number(searchParams.get('rangeDays'));
    const savedTenant =
      typeof window !== 'undefined' ? safeSlug(localStorage.getItem('geimser_dashboard_tenant')) : 'global';

    const initialTenant = hasTenantParam ? qpTenant : savedTenant;
    const initialRange = (qpRange === 7 || qpRange === 30 || qpRange === 90 ? qpRange : 30) as RangeDays;

    setTenantSlug(initialTenant);
    setRangeDays(initialRange);
  }, [router, searchParams]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('geimser_dashboard_tenant', tenantSlug);
    const url = new URL(window.location.href);
    url.searchParams.set('tenant', tenantSlug);
    url.searchParams.set('rangeDays', String(rangeDays));
    router.replace(url.pathname + '?' + url.searchParams.toString());
  }, [tenantSlug, rangeDays, router]);

  const fetchDashboard = async ({ toast }: { toast: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('tenant', tenantSlug);
      params.set('rangeDays', String(rangeDays));
      const res = await fetch(`/api/admin/dashboard?${params.toString()}`, { method: 'GET' });
      const json = (await res.json()) as DashboardResponse;
      if (!res.ok || !json.ok) throw new Error(json.error || `Error ${res.status}`);
      setData(json);
      if (toast) {
        sileo.success({
          title: 'Dashboard actualizado',
          description: `${json.scope === 'global' ? 'Vista global' : json.tenant?.name || json.tenant?.slug} • ${json.rangeDays} días`,
        });
      }
    } catch (e: any) {
      const msg = String(e?.message || 'No se pudo cargar el dashboard');
      setError(msg);
      if (toast) sileo.error({ title: 'Error', description: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getCookie('geimser_admin_auth');
    if (!auth) return;
    fetchDashboard({ toast: false });
  }, [tenantSlug, rangeDays]);

  const logout = () => {
    deleteCookie('geimser_admin_auth');
    router.push('/super-admin-7zX9/login');
  };

  const activeTenants = useMemo(() => (data?.tenants || []).filter((t) => t.status === 'active'), [data]);

  const filteredLeads = useMemo(() => {
    const leads = data?.latestLeads || [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter((l) => {
      const haystack = [
        l.nombre,
        l.correo || '',
        l.telefono || '',
        l.empresa || '',
        l.mensaje || '',
        l.tipo_interes || '',
        l.fuente || '',
        l.estado || '',
        l.tenants?.name || '',
        l.tenants?.slug || '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [data, searchTerm]);

  const topTenantsData = useMemo(
    () => (data?.topTenants || []).map((t) => ({ name: t.name, leads: t.leads_count })),
    [data],
  );
  const timeseriesData = useMemo(
    () => (data?.timeseries || []).map((p) => ({ day: p.day, leads: p.leads_count })),
    [data],
  );

  const scope = data?.scope || 'global';
  const kpis = data?.kpis;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              {scope === 'global' ? <Globe className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm text-gray-500">Dashboard</div>
              <div className="text-lg font-semibold text-gray-900">
                {scope === 'global' ? 'Vista global' : data?.tenant?.name || 'Tenant'}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Empresa</span>
              <select
                value={tenantSlug}
                onChange={(e) => setTenantSlug(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="global">Vista global</option>
                {activeTenants.map((t) => (
                  <option key={t.id} value={t.slug}>
                    {t.name} ({t.slug})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={rangeDays}
                onChange={(e) => setRangeDays(Number(e.target.value) as RangeDays)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value={7}>7 días</option>
                <option value={30}>30 días</option>
                <option value={90}>90 días</option>
              </select>
            </div>

            <button
              onClick={() => fetchDashboard({ toast: true })}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-black transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total leads</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{kpis?.total_leads ?? '—'}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Leads (rango)</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{kpis?.leads_in_range ?? '—'}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Últimos 7 días</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{kpis?.leads_7d ?? '—'}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Últimos 30 días</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{kpis?.leads_30d ?? '—'}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Hoy</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{kpis?.leads_today ?? '—'}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-gray-900">Serie temporal</div>
              <div className="text-xs text-gray-500">
                {data?.dateFrom ? formatDate(data.dateFrom) : ''} → {data?.dateTo ? formatDate(data.dateTo) : ''}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeseriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="text-sm font-semibold text-gray-900 mb-4">Top empresas</div>
            {scope !== 'global' ? (
              <div className="text-sm text-gray-500">Disponible solo en vista global.</div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topTenantsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} height={60} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <div className="text-sm font-semibold text-gray-900">Últimos leads</div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar…"
              className="w-full md:w-80 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase tracking-wide text-gray-500 border-b">
                <tr>
                  <th className="text-left py-3 pr-4">Fecha</th>
                  {scope === 'global' && <th className="text-left py-3 pr-4">Empresa</th>}
                  <th className="text-left py-3 pr-4">Nombre</th>
                  <th className="text-left py-3 pr-4">Interés</th>
                  <th className="text-left py-3 pr-4">Estado</th>
                  <th className="text-left py-3 pr-4">Contacto</th>
                  <th className="text-right py-3">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={scope === 'global' ? 7 : 6} className="py-6 text-center text-gray-500">
                      Cargando…
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={scope === 'global' ? 7 : 6} className="py-6 text-center text-gray-500">
                      Sin datos.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="py-3 pr-4 whitespace-nowrap text-gray-700">{formatDate(l.created_at)}</td>
                      {scope === 'global' && (
                        <td className="py-3 pr-4 whitespace-nowrap text-gray-700">
                          {l.tenants?.name ? (
                            <span className="inline-flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              {l.tenants.name}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      )}
                      <td className="py-3 pr-4 text-gray-900 font-medium">{l.nombre}</td>
                      <td className="py-3 pr-4">
                        {l.tipo_interes === 'Abogado - Sistema Xel' || l.fuente?.includes('LexChile') ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            🏢 {l.tipo_interes}
                          </span>
                        ) : (
                          <span className="text-gray-700">{l.tipo_interes}</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-gray-700">{l.estado}</td>
                      <td className="py-3 pr-4 text-gray-700">
                        <div className="flex items-center gap-3">
                          {l.correo ? (
                            <span className="inline-flex items-center gap-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {l.correo}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                          {l.telefono ? (
                            <span className="inline-flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {l.telefono}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedLead(l)}
                          className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 border-b flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500">Lead</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedLead.nombre} • {formatDate(selectedLead.created_at)}
                  </div>
                  {scope === 'global' && selectedLead.tenants?.name ? (
                    <div className="text-sm text-gray-600 mt-1 inline-flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      {selectedLead.tenants.name} ({selectedLead.tenants.slug})
                    </div>
                  ) : null}
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Contacto</div>
                    <div className="mt-2 space-y-2 text-sm text-gray-800">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{selectedLead.correo || '—'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{selectedLead.telefono || '—'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span>{selectedLead.empresa || '—'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Contexto</div>
                    <div className="mt-2 space-y-2 text-sm text-gray-800">
                      <div>
                        <span className="text-gray-500">Interés:</span> {selectedLead.tipo_interes}
                      </div>
                      <div>
                        <span className="text-gray-500">Fuente:</span> {selectedLead.fuente}
                      </div>
                      <div>
                        <span className="text-gray-500">Estado:</span> {selectedLead.estado}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Mensaje</div>
                  <div className="mt-2 text-sm text-gray-900 whitespace-pre-wrap">{selectedLead.mensaje || '—'}</div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Conversación</div>
                  <div className="mt-2 text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedLead.conversacion_completa || '—'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

