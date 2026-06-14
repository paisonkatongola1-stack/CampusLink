import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
          Campus<span className="text-primary">Link</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-medium">
          <Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link>
          <Link to="/accommodation" className="hover:text-primary transition-colors text-sm">Accommodation</Link>
          <Link to="/marketplace" className="hover:text-primary transition-colors text-sm">Marketplace</Link>
          <Link to="/jobs" className="hover:text-primary transition-colors text-sm">Jobs</Link>
          <Link to="/events" className="hover:text-primary transition-colors text-sm">Events</Link>
          <Link to="/businesses" className="hover:text-primary transition-colors text-sm">Businesses</Link>
          <Link to="/chat" className="hover:text-primary transition-colors text-sm">AI Assistant</Link>
          <Link to="/login" className="px-4 py-2 hover:text-primary transition-colors text-sm">Login</Link>
          <Link to="/signup" className="px-5 py-2 bg-primary rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 text-sm">
            Sign Up
          </Link>
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
          <Link to="/chat" onClick={() => setIsOpen(false)}>AI Assistant</Link>
          <hr className="border-white/10" />
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)} className="text-primary font-bold">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
