import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

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
      case 'admin': return '/admin-dashboard';
      case 'landlord': return '/business-dashboard'; // Landlords use business dashboard for now
      default: return '/dashboard';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
          Campus<span className="text-primary">Link</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center font-medium">
          <Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link>
          <Link to="/accommodation" className="hover:text-primary transition-colors text-sm">Accommodation</Link>
          <Link to="/marketplace" className="hover:text-primary transition-colors text-sm">Marketplace</Link>
          <Link to="/jobs" className="hover:text-primary transition-colors text-sm">Jobs</Link>
          <Link to="/events" className="hover:text-primary transition-colors text-sm">Events</Link>
          <Link to="/businesses" className="hover:text-primary transition-colors text-sm">Services</Link>

          {user ? (
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
              <Link to={getDashboardLink()} className="hover:text-primary transition-colors text-sm flex items-center">
                <UserIcon size={16} className="mr-2" />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 ml-4">
              <Link to="/login" className="px-4 py-2 hover:text-primary transition-colors text-sm">Login</Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/accommodation" onClick={() => setIsOpen(false)}>Accommodation</Link>
          <Link to="/marketplace" onClick={() => setIsOpen(false)}>Marketplace</Link>
          <Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link>
          <Link to="/events" onClick={() => setIsOpen(false)}>Events</Link>
          <Link to="/businesses" onClick={() => setIsOpen(false)}>Businesses</Link>
          <hr className="border-white/10" />
          {user ? (
            <>
              <Link to={getDashboardLink()} onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="text-primary font-bold">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
