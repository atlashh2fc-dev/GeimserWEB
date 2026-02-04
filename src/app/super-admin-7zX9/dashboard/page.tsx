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
        try {
            const { data, error } = await supabase
                .from('leads_comerciales')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (err) {
            console.error('Error fetching leads:', err);
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
        return new Date(dateString).toLocaleDateString('es-CL', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Geimser Intelligence</h1>
                            <p className="text-xs text-neutral-400">Panel de Control de Interacciones</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchLeads}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-white"
                            title="Recargar datos"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="h-8 w-px bg-white/10 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">Administrador</p>
                                <p className="text-xs text-neutral-500">Super Admin</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Leads', value: leads.length, color: 'text-blue-400' },
                        { label: 'Esta Semana', value: leads.filter(l => new Date(l.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, color: 'text-emerald-400' },
                        { label: 'Con Correo', value: leads.filter(l => l.correo).length, color: 'text-purple-400' },
                        { label: 'Tasa Conversión', value: '12.5%', color: 'text-yellow-400' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6"
                        >
                            <p className="text-neutral-400 text-sm mb-1">{stat.label}</p>
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, correo, empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                            <Filter className="w-4 h-4" />
                            <span>Filtros</span>
                        </button>
                        <button
                            onClick={exportCSV}
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span>Exportar CSV</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/20 text-neutral-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Fecha</th>
                                    <th className="px-6 py-4 font-medium">Lead</th>
                                    <th className="px-6 py-4 font-medium">Contacto</th>
                                    <th className="px-6 py-4 font-medium">Empresa - Interés</th>
                                    <th className="px-6 py-4 font-medium text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                                            No se encontraron resultados
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 text-neutral-400 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 opacity-50" />
                                                    {formatDate(lead.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white">{lead.nombre || 'Anónimo'}</div>
                                                <div className="text-xs text-neutral-500">{lead.estado}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {lead.correo && (
                                                        <div className="flex items-center gap-1.5 text-neutral-300">
                                                            <Mail className="w-3.5 h-3.5 opacity-50" />
                                                            {lead.correo}
                                                        </div>
                                                    )}
                                                    {lead.telefono && (
                                                        <div className="flex items-center gap-1.5 text-neutral-400">
                                                            <Phone className="w-3.5 h-3.5 opacity-50" />
                                                            {lead.telefono}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-white mb-0.5">{lead.empresa || '-'}</div>
                                                <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                                                    {lead.tipo_interes}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="p-2 bg-white/5 hover:bg-blue-500/20 text-neutral-400 hover:text-blue-400 rounded-lg transition-all"
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

            {/* Conversation Modal */}
            <AnimatePresence>
                {selectedLead && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLead(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#151515]">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <MessageSquare className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Historial de Conversación</h3>
                                        <p className="text-xs text-neutral-400">
                                            {selectedLead.nombre} • {formatDate(selectedLead.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-neutral-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/50">
                                {selectedLead.conversacion_completa ? (
                                    selectedLead.conversacion_completa.split('---').map((msg, idx) => {
                                        const isUser = msg.trim().startsWith('user:');
                                        const content = msg.replace(/^(user|assistant):/, '').trim();

                                        return (
                                            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-indigo-500/20' : 'bg-emerald-500/20'
                                                        }`}>
                                                        {isUser ? <User className="w-4 h-4 text-indigo-400" /> : <Bot className="w-4 h-4 text-emerald-400" />}
                                                    </div>
                                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${isUser
                                                            ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-100 rounded-tr-sm'
                                                            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 rounded-tl-sm'
                                                        }`}>
                                                        {content}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12 text-neutral-500 italic">
                                        No hay historial de conversación disponible para este lead.
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-[#151515] border-t border-white/10 text-xs text-neutral-500 text-center">
                                ID de Conversación: {selectedLead.id}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
