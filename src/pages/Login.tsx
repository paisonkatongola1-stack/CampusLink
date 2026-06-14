import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { fadeInUp, scaleUp, hoverScale } from '../utils/animations';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error: any) {
            setError("Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            navigate("/dashboard");
        } catch (error: any) {
            setError("Google login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleUp}
                className="w-full max-w-md relative z-10"
            >
                <Card className="p-12 shadow-2xl border-white/5" hoverable={false}>
                    <div className="text-center mb-12">
                        <motion.div variants={fadeInUp} className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-6 shadow-xl shadow-primary/5">
                           <Sparkles size={28} strokeWidth={2.5} />
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl font-black mb-3 tracking-tight italic">Welcome <span className="text-primary italic-none">Back</span></motion.h2>
                        <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Access your student portal</motion.p>
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl mb-8 text-xs font-bold flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-4 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-8">
                        <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
                          <Input
                              label="Institutional Email"
                              type="email"
                              placeholder="name@university.zm"
                              icon={<Mail size={20} strokeWidth={2.5} />}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} transition={{ delay: 0.2 }} className="space-y-3">
                            <Input
                                label="Secure Password"
                                type="password"
                                placeholder="••••••••"
                                icon={<Lock size={20} strokeWidth={2.5} />}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="flex justify-end px-1">
                                <Link to="/forgot-password" size="sm" className="text-[10px] text-primary hover:text-white transition-colors font-black uppercase tracking-widest underline decoration-primary/30 underline-offset-4">Lost access?</Link>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
                          <Button
                              type="submit"
                              className="w-full py-5 text-[10px] uppercase tracking-[0.2em]"
                              isLoading={loading}
                              size="lg"
                          >
                              <LogIn size={20} strokeWidth={2.5} className="mr-3" /> Secure Login
                          </Button>
                        </motion.div>
                    </form>

                    <div className="mt-12">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="border-t border-white/5 w-full" />
                            <span className="absolute bg-[#0F111A] px-5 text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Identity Hub</span>
                        </div>

                        <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
                          <Button
                              type="button"
                              onClick={handleGoogleLogin}
                              variant="secondary"
                              className="w-full border-white/10 hover:border-primary/40 py-4 text-[10px] uppercase tracking-[0.2em]"
                              disabled={loading}
                          >
                              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-4" alt="Google" />
                              Continue with Google
                          </Button>
                        </motion.div>
                    </div>

                    <p className="mt-10 text-center text-gray-500 text-xs font-bold">
                        New to CampusLink? <Link to="/signup" className="text-primary font-black hover:text-white transition-colors ml-2 uppercase tracking-widest underline underline-offset-4">Create Account</Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
}
