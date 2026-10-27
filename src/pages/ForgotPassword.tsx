import { useState, FormEvent } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch {
            setError("Failed to send reset email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <Card className="p-10 shadow-2xl border-white/5" hoverable={false}>
                    {!sent ? (
                        <>
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-black mb-2 tracking-tight">Forgot Password</h2>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Enter your email to receive a reset link</p>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-xs font-bold flex items-center">
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleReset} className="space-y-6">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="name@university.zm"
                                    icon={<Mail size={18} strokeWidth={2.5} />}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Button
                                    type="submit"
                                    className="w-full py-4 text-xs font-black uppercase tracking-[0.2em]"
                                    isLoading={loading}
                                    size="lg"
                                >
                                    Send Reset Link
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-xl">
                                <CheckCircle2 size={40} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 tracking-tight">Check Your Email</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                We've sent a password reset link to <span className="text-white font-bold">{email}</span>
                            </p>
                            <Button
                                variant="glass"
                                onClick={() => setSent(false)}
                                className="text-xs font-black uppercase tracking-widest"
                            >
                                Try another email
                            </Button>
                        </div>
                    )}

                    <div className="mt-10 text-center border-t border-white/10 pt-8">
                        <Link to="/login" className="text-gray-400 hover:text-white flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest group transition-colors">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Login</span>
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
