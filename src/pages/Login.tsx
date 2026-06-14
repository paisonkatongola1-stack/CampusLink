import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            setError("Failed to log in. Please check your credentials.");
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/dashboard");
        } catch (error) {
            setError("Google login failed.");
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass p-10 rounded-3xl border border-white/10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Log in to your CampusLink account</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
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

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-400">Password</label>
                            <Link to="/forgot-password" size="sm" className="text-sm text-primary hover:underline">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-secondary border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary transition-all outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary py-4 rounded-xl font-bold flex items-center justify-center hover:bg-primary-dark transition-all"
                    >
                        <LogIn size={20} className="mr-2" /> Login
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="border-t border-white/10 w-full" />
                        <span className="absolute bg-secondary px-4 text-sm text-gray-500">Or continue with</span>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full glass py-3 rounded-xl flex items-center justify-center hover:bg-white/5 transition-all border border-white/10"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google" />
                        Google
                    </button>
                </div>

                <p className="mt-8 text-center text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
}
