import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, GraduationCap, Briefcase, Home, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { createUserProfile } from '../utils/firebaseUtils';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<'student' | 'business' | 'landlord' | 'employer'>("student");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const roles = [
        { id: 'student', title: 'Student', icon: <GraduationCap size={24} />, desc: 'Find housing & jobs' },
        { id: 'business', title: 'Business', icon: <Briefcase size={24} />, desc: 'Sell to students' },
        { id: 'landlord', title: 'Landlord', icon: <Home size={24} />, desc: 'List your property' },
        { id: 'employer', title: 'Employer', icon: <ShieldCheck size={24} />, desc: 'Hire top talent' },
    ] as const;

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await createUserProfile(user.uid, {
                uid: user.uid,
                email: user.email,
                displayName: fullName,
                role: role,
                createdAt: new Date()
            });

            navigate("/dashboard");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[120vh] py-20 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <Card className="p-10" hoverable={false}>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Join the CampusLink Zambia network</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400">I want to join as a:</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {roles.map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => setRole(r.id as any)}
                                        className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center ${
                                            role === r.id
                                            ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/10'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className={`mb-3 ${role === r.id ? 'text-primary' : 'text-gray-500'}`}>
                                            {r.icon}
                                        </div>
                                        <div className="font-bold text-[10px] uppercase tracking-wider">{r.title}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                type="text"
                                placeholder="John Doe"
                                icon={<UserIcon size={18} />}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="name@university.zm"
                                icon={<Mail size={18} />}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock size={18} />}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={loading}
                        >
                            Create Account
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-gray-400 text-sm">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
}
