import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch (error) {
            setError("Failed to send reset email. Please try again.");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass p-10 rounded-3xl border border-white/10"
            >
                {!sent ? (
                    <>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
                            <p className="text-gray-400">Enter your email to receive a reset link</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleReset} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        placeholder="name@university.zm"
                                        className="w-full bg-secondary border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary transition-all outline-none"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary py-4 rounded-xl font-bold hover:bg-primary-dark transition-all"
                            >
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
                        <p className="text-gray-400 mb-8">We've sent a password reset link to <span className="text-white font-medium">{email}</span></p>
                        <button
                            onClick={() => setSent(false)}
                            className="text-primary font-bold hover:underline"
                        >
                            Try another email
                        </button>
                    </div>
                )}

                <div className="mt-10 text-center border-t border-white/10 pt-8">
                    <Link to="/login" className="text-gray-400 hover:text-white flex items-center justify-center space-x-2 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Login</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
