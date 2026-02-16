'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
} from 'recharts';
import {
    LogOut,
    Search,
    Calendar,
    MessageSquare,
    Mail,
    Phone,
    Building2,
    Eye,
    Download,
    Filter,
    RefreshCw,
    X,
    User,
    Bot,
    CheckCircle2,
    Clock,
    PhoneCall,
    Sparkles,
} from 'lucide-react';

// Supabase config
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface Lead {
    id: number;
    created_at: string;
    nombre: string;
    correo: string | null;
    telefono: string | null;
    empresa: string | null;
    mensaje: string;
    tipo_interes: string;
    fuente: string;
    estado: string;
    conversacion_completa?: string;
}

type RangeDays = 7 | 30 | 90;

const STATUS_OPTIONS = ['pendiente', 'contactado', 'cerrado'] as const;

const STATUS_COLORS: Record<string, string> = {
    pendiente: '#f59e0b', // amber-500
    contactado: '#3b82f6', // blue-500
    cerrado: '#10b981', // emerald-500
};

function normalizeText(value: string | null | undefined): string {
    return (value ?? '').toString().trim().toLowerCase();
}

function hasContact(lead: Lead): boolean {
    return Boolean(lead.correo || lead.telefono);
}

function dateKey(date: Date): string {
    return date.toISOString().slice(0, 10);
}

function clampNumber(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function percentChange(current: number, previous: number): number | null {
    if (previous === 0) return current === 0 ? 0 : null;
    return ((current - previous) / previous) * 100;
}

function formatDelta(delta: number | null): { label: string; tone: 'up' | 'down' | 'flat' | 'na' } {
    if (delta === null) return { label: '—', tone: 'na' };
    if (Math.abs(delta) < 0.01) return { label: '0%', tone: 'flat' };
    const rounded = Math.round(delta);
    if (rounded > 0) return { label: `+${rounded}%`, tone: 'up' };
    if (rounded < 0) return { label: `${rounded}%`, tone: 'down' };
    return { label: '0%', tone: 'flat' };
}

function formatShortDateLabel(key: string): string {
    try {
        const d = new Date(`${key}T00:00:00.000Z`);
        return new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: 'short' }).format(d);
    } catch {
        return key;
    }
}

function getStatusColor(status: string): string {
    return STATUS_COLORS[normalizeText(status)] ?? '#64748b'; // slate-500
}

export default function DashboardPage() {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [rangeDays, setRangeDays] = useState<RangeDays>(90);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [interestFilter, setInterestFilter] = useState<string>('all');
    const [sourceFilter, setSourceFilter] = useState<string>('all');
    const [onlyWithContact, setOnlyWithContact] = useState(false);
    const [realtimeStatus, setRealtimeStatus] = useState<'connecting' | 'subscribed' | 'error'>('connecting');
    const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
    const [updatingLeadId, setUpdatingLeadId] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Auth check
        const auth = getCookie('geimser_admin_auth');
        if (!auth) {
            router.push('/super-admin-7zX9/login');
            return;
        }

        fetchLeads();

        // Realtime: actualizar tabla al vuelo (inserts/updates)
        const channel = supabase
            .channel('leads_comerciales_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'leads_comerciales' },
                (payload: any) => {
                    const newRow = payload?.new as Lead | undefined;
                    const oldRow = payload?.old as Lead | undefined;

                    if (payload?.eventType === 'INSERT' && newRow?.id) {
                        setLeads((prev) => {
                            if (prev.some((l) => l.id === newRow.id)) return prev;
                            return [newRow, ...prev];
                        });
                    }

                    if (payload?.eventType === 'UPDATE' && newRow?.id) {
                        setLeads((prev) => prev.map((l) => (l.id === newRow.id ? newRow : l)));
                    }

                    if (payload?.eventType === 'DELETE' && oldRow?.id) {
                        setLeads((prev) => prev.filter((l) => l.id !== oldRow.id));
                    }
                },
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    setRealtimeStatus('subscribed');
                    console.log('✅ [DASHBOARD] Realtime suscrito a leads_comerciales');
                    return;
                }

                if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
                    setRealtimeStatus('error');
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno');
            }

            const { data, error } = await supabase
                .from('leads_comerciales')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
            setLastRefreshedAt(new Date());
        } catch (err) {
            console.error('Error fetching leads:', err);
            setError(
                err instanceof Error ? err.message : 'No se pudieron cargar los leads (ver consola)',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        deleteCookie('geimser_admin_auth');
        router.push('/super-admin-7zX9/login');
    };

    const now = Date.now();
    const rangeStart = new Date(now - rangeDays * 24 * 60 * 60 * 1000);
    const prevRangeStart = new Date(now - rangeDays * 2 * 24 * 60 * 60 * 1000);

    const leadsInRange = leads.filter((l) => new Date(l.created_at) >= rangeStart);
    const leadsPrevRange = leads.filter((l) => {
        const d = new Date(l.created_at);
        return d >= prevRangeStart && d < rangeStart;
    });

    const availableInterests = Array.from(
        new Set(leads.map((l) => l.tipo_interes).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));

    const availableSources = Array.from(
        new Set(leads.map((l) => l.fuente).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));

    const filteredLeads = leadsInRange
        .filter((lead) => {
            const term = normalizeText(searchTerm);
            if (!term) return true;
            return (
                normalizeText(lead.nombre).includes(term) ||
                normalizeText(lead.correo).includes(term) ||
                normalizeText(lead.telefono).includes(term) ||
                normalizeText(lead.empresa).includes(term) ||
                normalizeText(lead.mensaje).includes(term)
            );
        })
        .filter((lead) => (onlyWithContact ? hasContact(lead) : true))
        .filter((lead) =>
            statusFilter === 'all'
                ? true
                : normalizeText(lead.estado) === normalizeText(statusFilter),
        )
        .filter((lead) => (interestFilter === 'all' ? true : lead.tipo_interes === interestFilter))
        .filter((lead) => (sourceFilter === 'all' ? true : lead.fuente === sourceFilter));

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('es-CL', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    const exportCSV = () => {
        const headers = ['Fecha', 'Nombre', 'Correo', 'Teléfono', 'Empresa', 'Interés', 'Mensaje'];
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(lead => [
                `"${lead.created_at}"`,
                `"${lead.nombre || ''}"`,
                `"${lead.correo || ''}"`,
                `"${lead.telefono || ''}"`,
                `"${lead.empresa || ''}"`,
                `"${lead.tipo_interes || ''}"`,
                `"${lead.mensaje?.replace(/"/g, '""') || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `geimser_leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
    };

    const updateLeadStatus = async (leadId: number, newStatus: string) => {
        const statusNormalized = normalizeText(newStatus);
        if (!statusNormalized) return;

        setUpdatingLeadId(leadId);
        try {
            const { error } = await supabase
                .from('leads_comerciales')
                .update({ estado: statusNormalized })
                .eq('id', leadId);

            if (error) throw error;

            setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, estado: statusNormalized } : l)));
        } catch (e) {
            console.error('❌ Error actualizando estado:', e);
            alert('No se pudo actualizar el estado del lead (revisa permisos/RLS).');
        } finally {
            setUpdatingLeadId(null);
        }
    };

    const kpiTotal = leadsInRange.length;
    const kpiPrevTotal = leadsPrevRange.length;
    const kpiTotalDelta = formatDelta(percentChange(kpiTotal, kpiPrevTotal));

    const kpiQualified = leadsInRange.filter(hasContact).length;
    const kpiPrevQualified = leadsPrevRange.filter(hasContact).length;
    const kpiQualifiedDelta = formatDelta(percentChange(kpiQualified, kpiPrevQualified));

    const kpiContacted = leadsInRange.filter((l) => normalizeText(l.estado) === 'contactado').length;
    const kpiPrevContacted = leadsPrevRange.filter((l) => normalizeText(l.estado) === 'contactado').length;
    const kpiContactedDelta = formatDelta(percentChange(kpiContacted, kpiPrevContacted));

    const kpiClosed = leadsInRange.filter((l) => normalizeText(l.estado) === 'cerrado').length;
    const kpiPrevClosed = leadsPrevRange.filter((l) => normalizeText(l.estado) === 'cerrado').length;
    const kpiClosedDelta = formatDelta(percentChange(kpiClosed, kpiPrevClosed));

    const kpiConversion = kpiTotal > 0 ? (kpiClosed / kpiTotal) * 100 : 0;
    const kpiPrevConversion = kpiPrevTotal > 0 ? (kpiPrevClosed / kpiPrevTotal) * 100 : 0;
    const kpiConversionDelta = formatDelta(percentChange(kpiConversion, kpiPrevConversion));

    const dayCounts = new Map<string, number>();
    for (const lead of leadsInRange) {
        const key = dateKey(new Date(lead.created_at));
        dayCounts.set(key, (dayCounts.get(key) ?? 0) + 1);
    }
    const trendDaysCount = clampNumber(rangeDays, 7, 90);
    const trendData: Array<{ day: string; leads: number }> = [];
    for (let i = trendDaysCount - 1; i >= 0; i--) {
        const d = new Date(now - i * 24 * 60 * 60 * 1000);
        const key = dateKey(d);
        trendData.push({ day: key, leads: dayCounts.get(key) ?? 0 });
    }

    const statusCounts = leadsInRange.reduce<Record<string, number>>((acc, l) => {
        const key = normalizeText(l.estado) || 'otros';
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
    }, {});
    const statusPie = Object.entries(statusCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    const interestCounts = leadsInRange.reduce<Record<string, number>>((acc, l) => {
        const key = l.tipo_interes || 'Otros';
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
    }, {});
    const topInterests = Object.entries(interestCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

    const latestLeads = [...leadsInRange].slice(0, 6);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Navbar - Light Mode */}
            <nav className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-lg shadow-md">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight text-gray-900">Geimser Intelligence</h1>
                            <p className="text-xs text-gray-500">Panel de Control de Interacciones</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchLeads}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-blue-600"
                            title="Recargar datos"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">Administrador</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-gray-400"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm shadow-sm">
                        <div className="font-semibold">No se pudieron cargar los leads</div>
                        <div className="mt-1">{error}</div>
                        <div className="mt-2 text-red-600/80">
                            Tip: revisa `GET /api/save-lead` para ver diagnóstico de Supabase.
                        </div>
                    </div>
                )}
                {/* Header controls */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                            <div
                                className={`w-2.5 h-2.5 rounded-full ${
                                    realtimeStatus === 'subscribed'
                                        ? 'bg-emerald-500'
                                        : realtimeStatus === 'error'
                                          ? 'bg-red-500'
                                          : 'bg-amber-500'
                                }`}
                                title={
                                    realtimeStatus === 'subscribed'
                                        ? 'Realtime conectado'
                                        : realtimeStatus === 'error'
                                          ? 'Realtime con error'
                                          : 'Conectando...'
                                }
                            />
                            <span className="text-xs font-medium text-gray-600">
                                {realtimeStatus === 'subscribed'
                                    ? 'En vivo'
                                    : realtimeStatus === 'error'
                                      ? 'Sin realtime'
                                      : 'Conectando'}
                            </span>
                            {lastRefreshedAt && (
                                <span className="text-xs text-gray-400">
                                    • actualizado{' '}
                                    {lastRefreshedAt.toLocaleTimeString('es-CL', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            )}
                        </div>

                        <div className="inline-flex rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                            {([7, 30, 90] as RangeDays[]).map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setRangeDays(d)}
                                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                                        rangeDays === d
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {d} días
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-xs text-gray-500">
                        Comparativo vs periodo anterior ({rangeDays} días)
                    </div>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {[
                        {
                            label: 'Leads',
                            value: kpiTotal,
                            delta: kpiTotalDelta,
                            icon: <Sparkles className="w-4 h-4" />,
                            color: 'text-blue-700',
                            bg: 'from-blue-500/10 to-blue-500/20',
                        },
                        {
                            label: 'Con contacto',
                            value: kpiQualified,
                            delta: kpiQualifiedDelta,
                            icon: <Mail className="w-4 h-4" />,
                            color: 'text-purple-700',
                            bg: 'from-purple-500/10 to-purple-500/20',
                        },
                        {
                            label: 'Contactados',
                            value: kpiContacted,
                            delta: kpiContactedDelta,
                            icon: <PhoneCall className="w-4 h-4" />,
                            color: 'text-sky-700',
                            bg: 'from-sky-500/10 to-sky-500/20',
                        },
                        {
                            label: 'Cerrados',
                            value: kpiClosed,
                            delta: kpiClosedDelta,
                            icon: <CheckCircle2 className="w-4 h-4" />,
                            color: 'text-emerald-700',
                            bg: 'from-emerald-500/10 to-emerald-500/20',
                        },
                        {
                            label: 'Conversión',
                            value: `${kpiConversion.toFixed(1)}%`,
                            delta: kpiConversionDelta,
                            icon: <Clock className="w-4 h-4" />,
                            color: 'text-amber-700',
                            bg: 'from-amber-500/10 to-amber-500/20',
                        },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                </div>
                                <div
                                    className={`p-2 rounded-xl bg-gradient-to-br ${stat.bg} border border-gray-100 text-gray-700`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="mt-3 text-xs">
                                <span
                                    className={
                                        stat.delta.tone === 'up'
                                            ? 'text-emerald-700 font-semibold'
                                            : stat.delta.tone === 'down'
                                              ? 'text-red-700 font-semibold'
                                              : stat.delta.tone === 'flat'
                                                ? 'text-gray-600 font-semibold'
                                                : 'text-gray-400 font-semibold'
                                    }
                                >
                                    {stat.delta.label}
                                </span>
                                <span className="text-gray-400"> vs anterior</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="font-semibold text-gray-900">Leads por día</h2>
                                <p className="text-xs text-gray-500">Últimos {rangeDays} días</p>
                            </div>
                        </div>
                        <div className="h-64">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                                        <XAxis
                                            dataKey="day"
                                            tickFormatter={formatShortDateLabel}
                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                            interval={rangeDays === 7 ? 0 : rangeDays === 30 ? 4 : 9}
                                        />
                                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                        <Tooltip
                                            formatter={(v: any) => [v, 'Leads']}
                                            labelFormatter={(l: any) => `Día: ${l}`}
                                            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }}
                                        />
                                        <Line type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-sm text-gray-400">
                                    Cargando gráfico…
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="font-semibold text-gray-900">Pipeline</h2>
                                <p className="text-xs text-gray-500">Distribución por estado</p>
                            </div>
                        </div>
                        <div className="h-64">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Tooltip
                                            formatter={(v: any) => [v, 'Leads']}
                                            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }}
                                        />
                                        <Pie
                                            data={statusPie}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={55}
                                            outerRadius={85}
                                            paddingAngle={2}
                                        >
                                            {statusPie.map((entry, idx) => (
                                                <Cell key={idx} fill={getStatusColor(entry.name)} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-sm text-gray-400">
                                    Cargando gráfico…
                                </div>
                            )}
                        </div>
                        <div className="mt-4 space-y-2">
                            {statusPie.slice(0, 4).map((s) => (
                                <div key={s.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: getStatusColor(s.name) }} />
                                        <span className="text-gray-700 capitalize">{s.name}</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="font-semibold text-gray-900">Top intereses</h2>
                                <p className="text-xs text-gray-500">En qué están preguntando</p>
                            </div>
                        </div>
                        <div className="h-64">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topInterests} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                            interval={0}
                                            angle={-12}
                                            height={50}
                                        />
                                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                        <Tooltip
                                            formatter={(v: any) => [v, 'Leads']}
                                            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }}
                                        />
                                        <Bar dataKey="value" fill="#06b6d4" radius={[10, 10, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-sm text-gray-400">
                                    Cargando gráfico…
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="font-semibold text-gray-900">Últimas conversaciones</h2>
                                <p className="text-xs text-gray-500">Acceso rápido</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {latestLeads.length === 0 ? (
                                <div className="text-sm text-gray-500">Sin datos en el rango seleccionado.</div>
                            ) : (
                                latestLeads.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => setSelectedLead(l)}
                                        className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="text-sm font-semibold text-gray-900 truncate">
                                                    {l.empresa || l.nombre || 'Lead'}
                                                </div>
                                                <div className="text-xs text-gray-500 truncate">{l.tipo_interes}</div>
                                            </div>
                                            <span className="text-[11px] text-gray-400 whitespace-nowrap">
                                                {formatDate(l.created_at)}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span
                                                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                                style={{
                                                    backgroundColor: `${getStatusColor(l.estado)}1a`,
                                                    color: getStatusColor(l.estado),
                                                }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: getStatusColor(l.estado) }} />
                                                {normalizeText(l.estado) || 'pendiente'}
                                            </span>
                                            {hasContact(l) && (
                                                <span className="text-[11px] text-emerald-700 font-semibold">Contacto</span>
                                            )}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Toolbar - Light Mode */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, correo, empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="flex flex-wrap items-center gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 shadow-sm"
                            >
                                <option value="all">Todos los estados</option>
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={interestFilter}
                                onChange={(e) => setInterestFilter(e.target.value)}
                                className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 shadow-sm"
                            >
                                <option value="all">Todos los intereses</option>
                                {availableInterests.map((i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={sourceFilter}
                                onChange={(e) => setSourceFilter(e.target.value)}
                                className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 shadow-sm"
                            >
                                <option value="all">Todas las fuentes</option>
                                {availableSources.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => setOnlyWithContact((v) => !v)}
                            className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors shadow-sm ${
                                onlyWithContact
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                            }`}
                            title="Mostrar solo leads con correo o teléfono"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Solo con contacto</span>
                        </button>
                        <button
                            onClick={exportCSV}
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                        >
                            <Download className="w-4 h-4" />
                            <span>Exportar CSV</span>
                        </button>
                    </div>
                </div>

                {/* Table - Light Mode */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="px-6 py-4 font-semibold">Fecha</th>
                                    <th className="px-6 py-4 font-semibold">Lead</th>
                                    <th className="px-6 py-4 font-semibold">Estado</th>
                                    <th className="px-6 py-4 font-semibold">Contacto</th>
                                    <th className="px-6 py-4 font-semibold">Empresa - Interés</th>
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No se encontraron resultados
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-blue-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {formatDate(lead.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{lead.nombre || 'Anónimo'}</div>
                                                <div className="text-xs text-gray-500 mt-0.5 max-w-[320px] truncate">
                                                    {lead.mensaje || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold"
                                                        style={{
                                                            backgroundColor: `${getStatusColor(lead.estado)}1a`,
                                                            color: getStatusColor(lead.estado),
                                                        }}
                                                    >
                                                        {normalizeText(lead.estado) || 'pendiente'}
                                                    </span>
                                                    <select
                                                        value={normalizeText(lead.estado) || 'pendiente'}
                                                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                        disabled={updatingLeadId === lead.id}
                                                        className="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-700"
                                                        title="Actualizar estado"
                                                    >
                                                        {STATUS_OPTIONS.map((s) => (
                                                            <option key={s} value={s}>
                                                                {s}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {lead.correo && (
                                                        <div className="flex items-center gap-1.5 text-gray-600">
                                                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                            {lead.correo}
                                                        </div>
                                                    )}
                                                    {lead.telefono && (
                                                        <div className="flex items-center gap-1.5 text-gray-500">
                                                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                            {lead.telefono}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-900 mb-1 font-medium">{lead.empresa || '-'}</div>
                                                <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
                                                    {lead.tipo_interes}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="p-2 bg-gray-50 hover:bg-blue-100 text-gray-400 hover:text-blue-600 rounded-lg transition-all border border-gray-100 hover:border-blue-200"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Conversation Modal - Light Mode */}
            <AnimatePresence>
                {selectedLead && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLead(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-200"
                        >
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Historial de Conversación</h3>
                                        <p className="text-xs text-gray-500">
                                            {selectedLead.nombre} • {formatDate(selectedLead.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                                {selectedLead.conversacion_completa ? (
                                    selectedLead.conversacion_completa.split('---').map((msg, idx) => {
                                        const trimmed = msg.trim();
                                        const isUser = trimmed.startsWith('user:');
                                        const content = trimmed.replace(/^(user|assistant):/, '').trim();

                                        return (
                                            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex max-w-[85%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border ${isUser ? 'bg-indigo-100 border-indigo-200' : 'bg-emerald-100 border-emerald-200'
                                                        }`}>
                                                        {isUser ? <User className="w-4 h-4 text-indigo-600" /> : <Bot className="w-4 h-4 text-emerald-600" />}
                                                    </div>
                                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${isUser
                                                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                                                            : 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm'
                                                        }`}>
                                                        {content}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                        <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                                        <p className="italic">No hay historial de conversación disponible.</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-white border-t border-gray-100 text-xs text-center text-gray-400">
                                ID de Conversación: {selectedLead.id}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
