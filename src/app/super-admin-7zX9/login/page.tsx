'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Loader2, ShieldCheck, User } from 'lucide-react';
import { setCookie } from 'cookies-next';

export default function HiddenLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulación de delay de red para seguridad
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'lpincheira' && password === 'Lpincheira2026') {
            // Login exitoso
            setCookie('geimser_admin_auth', 'true', { maxAge: 60 * 60 * 24 }); // 24 horas
            router.push('/super-admin-7zX9/dashboard');
        } else {
            setError('Credenciales inválidas');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-4 bg-blue-50 rounded-2xl mb-4 shadow-sm">
                            <ShieldCheck className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Acceso Geimser</h1>
                        <p className="text-sm text-gray-500 mt-2">Panel Administrativo</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 ml-1">Usuario</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pl-11 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    placeholder="ID de Usuario"
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 ml-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pl-11 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-600 text-sm text-center bg-red-50 border border-red-100 rounded-xl py-3 px-4"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Verificando...</span>
                                </>
                            ) : (
                                <span>Iniciar Sesión</span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8 text-gray-400 text-xs font-medium">
                    Sistema de Monitoreo Geimser 360 &copy; 2026
                </div>
            </motion.div>
        </div>
    );
}
