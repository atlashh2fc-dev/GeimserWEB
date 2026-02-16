'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
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
    Bot
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

export default function DashboardPage() {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    useEffect(() => {
        // Auth check
        const auth = getCookie('geimser_admin_auth');
        if (!auth) {
            router.push('/super-admin-7zX9/login');
            return;
        }

        fetchLeads();
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

    const filteredLeads = leads.filter(lead =>
        lead.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.empresa?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                {/* Stats Row - Light Mode */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Leads', value: leads.length, color: 'text-blue-600', icon: 'from-blue-500/10 to-blue-500/20' },
                        { label: 'Esta Semana', value: leads.filter(l => new Date(l.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, color: 'text-emerald-600', icon: 'from-emerald-500/10 to-emerald-500/20' },
                        { label: 'Con Correo', value: leads.filter(l => l.correo).length, color: 'text-purple-600', icon: 'from-purple-500/10 to-purple-500/20' },
                        { label: 'Tasa Conversión', value: '12.5%', color: 'text-amber-600', icon: 'from-amber-500/10 to-amber-500/20' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        </motion.div>
                    ))}
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

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <span>Filtros</span>
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
                                    <th className="px-6 py-4 font-semibold">Contacto</th>
                                    <th className="px-6 py-4 font-semibold">Empresa - Interés</th>
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
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
                                                <div className="text-xs text-gray-500 mt-0.5 inline-flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${lead.estado === 'pendiente' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                                                    {lead.estado}
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
                                        const isUser = msg.trim().startsWith('user:');
                                        const content = msg.replace(/^(user|assistant):/, '').trim();

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
