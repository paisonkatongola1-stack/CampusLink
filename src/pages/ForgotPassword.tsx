import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { fadeInUp, scaleUp } from '../utils/animations';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch (error: any) {
            setError("Failed to send reset email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-6 py-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleUp}
                className="w-full max-w-md relative z-10"
            >
                <Card className="p-12 shadow-2xl border-white/5" hoverable={false}>
                    {!sent ? (
                        <>
                            <div className="text-center mb-12">
                                <motion.div variants={fadeInUp} className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-6 shadow-xl shadow-primary/5">
                                   <Sparkles size={28} strokeWidth={2.5} />
                                </motion.div>
                                <motion.h2 variants={fadeInUp} className="text-4xl font-black mb-3 tracking-tight italic">Reset <span className="text-primary italic-none">Password</span></motion.h2>
                                <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Recover your login credentials</motion.p>
                            </div>

                            {error && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl mb-8 text-xs font-bold flex items-center">
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-4 animate-pulse" />
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleReset} className="space-y-8">
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

                                <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
                                  <Button
                                      type="submit"
                                      className="w-full py-5 text-[10px] uppercase tracking-[0.2em]"
                                      isLoading={loading}
                                      size="lg"
                                  >
                                      Send Reset Link
                                  </Button>
                                </motion.div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-20 h-20 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/5 border border-green-500/10"
                            >
                                <CheckCircle2 size={36} strokeWidth={2.5} />
                            </motion.div>
                            <h2 className="text-3xl font-black mb-3 tracking-tight italic">Check Your <span className="text-green-500 italic-none">Email</span></h2>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.25em] mb-10 leading-relaxed">We've sent a password reset link to <span className="text-white font-black">{email}</span></p>
                            <button
                                onClick={() => setSent(false)}
                                className="text-[10px] text-primary hover:text-white transition-colors font-black uppercase tracking-widest underline decoration-primary/30 underline-offset-4"
                            >
                                Try another email
                            </button>
                        </div>
                    )}

                    <div className="mt-12 text-center border-t border-white/5 pt-8">
                        <Link to="/login" className="text-gray-500 hover:text-white flex items-center justify-center space-x-2 group text-[10px] font-black uppercase tracking-widest transition-colors">
                            <ArrowLeft size={16} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Login</span>
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
