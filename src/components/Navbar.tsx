import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon, LayoutDashboard, Sparkles, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!profile) return '/dashboard';
    switch (profile.role) {
      case 'business': return '/business-dashboard';
      case 'admin': return '/admin-dashboard';
      case 'landlord': return '/business-dashboard';
      default: return '/dashboard';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Events', path: '/events' },
    { name: 'Services', path: '/businesses' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-white tracking-tighter italic flex items-center">
          Campus<span className="text-primary italic-none ml-0.5">Link</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center font-bold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `text-[10px] uppercase tracking-[0.2em] transition-all ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
            >
              {link.name}
            </NavLink>
          ))}

          <div className="h-4 w-px bg-white/10 mx-2" />

          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
              </button>
              <Link to="/chat" className="text-gray-400 hover:text-primary transition-colors">
                <Sparkles size={18} strokeWidth={2.5} />
              </Link>
              <Link to={getDashboardLink()} className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
                <LayoutDashboard size={14} strokeWidth={2.5} />
                <span>Panel</span>
              </Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors p-2">
                <LogOut size={18} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors px-4 py-2">Login</Link>
              <Link to="/signup">
                <Button size="sm" className="px-6 py-2.5 text-[10px] uppercase tracking-[0.2em]">Join Now</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-b border-white/10 p-8 flex flex-col space-y-6 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-[0.3em]">{link.name}</Link>
            ))}
            <hr className="border-white/5" />
            {user ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-primary">Dashboard</Link>
                <button onClick={handleLogout} className="text-left text-red-500 text-sm font-black uppercase tracking-[0.3em]">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-[0.3em]">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                   <Button className="w-full text-sm font-black uppercase tracking-[0.3em]">Sign Up</Button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
