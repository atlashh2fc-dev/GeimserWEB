'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';
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
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-4">
                            <ShieldCheck className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h1 className="text-xl font-medium text-white tracking-wide">Acceso Restringido</h1>
                        <p className="text-sm text-neutral-500 mt-2">Introduce tus credenciales de administrador</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 ml-1">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="Usuario..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 ml-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white/30 transition-colors"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Verificando...</span>
                                </>
                            ) : (
                                <span>Ingresar al Sistema</span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6 text-neutral-600 text-xs">
                    Sistema de Monitoreo Geimser 360 &copy; 2026
                </div>
            </motion.div>
        </div>
    );
}
