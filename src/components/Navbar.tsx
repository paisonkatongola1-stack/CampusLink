import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, Sparkles, Bell, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!profile) return '/dashboard';
    switch (profile.role) {
      case 'business': return '/business-dashboard';
      case 'landlord': return '/business-dashboard';
      case 'employer': return '/business-dashboard'; // Shared for now or separate
      case 'admin': return '/admin-dashboard';
      default: return '/dashboard';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Events', path: '/events' },
    { name: 'Directory', path: '/businesses' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 shadow-2xl transition-all duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-white tracking-tighter italic flex items-center group">
          Campus<span className="text-primary italic-none ml-0.5 group-hover:text-white transition-colors">Link</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 items-center font-bold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `text-[10px] uppercase tracking-[0.2em] transition-all relative py-2 ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(46,91,255,0.8)]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="h-6 w-px bg-white/10 mx-2" />

          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/chat" className="text-gray-400 hover:text-primary transition-all relative group">
                <Sparkles size={18} strokeWidth={2.5} />
                <span className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link to="/notifications" className="text-gray-400 hover:text-white transition-all relative">
                <Bell size={18} strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border border-[#0A0B14]" />
              </Link>

              <Link to={getDashboardLink()} className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl hover:bg-primary/10 hover:border-primary/40 transition-all shadow-xl">
                <LayoutDashboard size={14} strokeWidth={2.5} />
                <span>Panel</span>
              </Link>

              <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
                 <Link to="/profile" className="w-10 h-10 rounded-xl bg-surface-bright border border-white/10 flex items-center justify-center text-xs font-black hover:border-primary transition-all shadow-lg overflow-hidden">
                    {profile?.displayName?.substring(0, 2).toUpperCase() || <UserIcon size={16} />}
                 </Link>
                 <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-all p-2 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/20">
                   <LogOut size={18} strokeWidth={2.5} />
                 </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Login</Link>
              <Link to="/signup">
                <Button size="sm" className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-primary/20">Join Now</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          {user && (
            <Link to="/chat" className="text-primary p-2 bg-primary/10 rounded-xl">
              <Sparkles size={20} strokeWidth={2.5} />
            </Link>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg">
            {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-b border-white/10 p-10 flex flex-col space-y-8 shadow-2xl overflow-hidden backdrop-blur-3xl"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] flex items-center justify-between group">
                {link.name}
                <X size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            <div className="h-px bg-white/5 w-full" />
            {user ? (
              <div className="space-y-6">
                <Link to={getDashboardLink()} onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center">
                  <LayoutDashboard size={18} className="mr-4" /> Dashboard
                </Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] flex items-center">
                  <UserIcon size={18} className="mr-4" /> Profile
                </Link>
                <button onClick={handleLogout} className="w-full text-left text-red-500 text-sm font-black uppercase tracking-[0.3em] flex items-center">
                  <LogOut size={18} className="mr-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-[0.3em]">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                   <Button className="w-full text-sm font-black uppercase tracking-[0.3em] py-5">Sign Up</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
