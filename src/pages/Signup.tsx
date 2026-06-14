import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, GraduationCap, Briefcase, Home, ShieldCheck } from 'lucide-react';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const roles = [
        { id: 'student', title: 'Student', icon: <GraduationCap size={24} />, desc: 'Find housing & jobs' },
        { id: 'business', title: 'Business', icon: <Briefcase size={24} />, desc: 'Sell to students' },
        { id: 'landlord', title: 'Landlord', icon: <Home size={24} />, desc: 'List your property' },
        { id: 'employer', title: 'Employer', icon: <ShieldCheck size={24} />, desc: 'Hire top talent' },
    ];

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // In a real app, save role to Firestore here
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-[120vh] py-20 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl glass p-10 rounded-3xl border border-white/10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-gray-400">Join the CampusLink Zambia network</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-400">I want to join as a:</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setRole(r.id)}
                                    className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center ${
                                        role === r.id
                                        ? 'bg-primary/20 border-primary text-white shadow-lg shadow-primary/10'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                    }`}
                                >
                                    <div className={`mb-3 ${role === r.id ? 'text-primary' : 'text-gray-500'}`}>
                                        {r.icon}
                                    </div>
                                    <div className="font-bold text-xs">{r.title}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-secondary border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>
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
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Password</label>
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

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary py-4 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                </p>
            </motion.div>
        </div>
    );
}
