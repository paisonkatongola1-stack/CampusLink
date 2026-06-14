import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Home, ShoppingBag,
  Briefcase, Calendar, MessageSquare, Cpu,
  Settings, Bell, Search, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/ui/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const StudentDashboard = () => {
  const { profile } = useAuth();

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <User size={20} />, label: "Profile", href: "/profile" },
    { icon: <Home size={20} />, label: "Accommodation", href: "/accommodation" },
    { icon: <ShoppingBag size={20} />, label: "Marketplace", href: "/marketplace" },
    { icon: <Briefcase size={20} />, label: "Jobs", href: "/jobs" },
    { icon: <Calendar size={20} />, label: "Events", href: "/events" },
    { icon: <MessageSquare size={20} />, label: "Messages", href: "/messages" },
    { icon: <Cpu size={20} />, label: "AI Assistant", href: "/chat" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0B14]">
      <Sidebar items={sidebarItems} />

      <main className="flex-1 p-6 lg:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Welcome back, {profile?.displayName || 'Student'}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-primary transition-all w-48 md:w-64 text-sm"
              />
            </div>
            <button className="p-2 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all relative group">
              <Bell size={20} className="text-gray-400 group-hover:text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A0B14]" />
            </button>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Card className="p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8" hoverable={false}>
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl shadow-primary/20">
              {profile?.displayName?.substring(0, 2).toUpperCase() || 'ST'}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start">
                {profile?.displayName || 'Chanda Musonda'}
                <div className="ml-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center"><CheckCircleIcon /></div>
              </h2>
              <p className="text-primary font-medium text-sm mt-1">{profile?.university || 'University of Zambia (UNZA)'}</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">{profile?.course || 'Bachelor of Computer Science'}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
                {['React.js', 'Python', 'UI/UX Design'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-300 font-bold uppercase tracking-tighter">{skill}</span>
                ))}
              </div>
            </div>
            <Link to="/profile">
              <Button variant="secondary" size="sm">Edit Profile</Button>
            </Link>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Recommended Housing</h3>
              <Link to="/accommodation" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <Card className="p-0 group">
              <div className="aspect-video bg-white/5 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Room" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-xl px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10">UNZA Area</div>
              </div>
              <div className="p-5 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">Silverest Executive Lodge</h4>
                  <div className="flex items-center text-gray-400 text-[10px] mt-1 uppercase tracking-tight">
                    <MapPin size={10} className="mr-1 text-primary" /> 500m from UNZA
                  </div>
                </div>
                <div className="text-primary font-bold text-sm">K3,500<span className="text-[10px] font-normal text-gray-500">/mo</span></div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Latest Internships</h3>
              <Link to="/jobs" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
               {[
                 { role: "Software Dev Intern", company: "Zambia Tech Hub", pay: "K4,000" },
                 { role: "Marketing Assistant", company: "Zed Media", pay: "Part-time" }
               ].map((job, i) => (
                 <Card key={i} className="p-4 flex items-center space-x-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary border border-primary/20">
                     {job.company.charAt(0)}
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-sm">{job.role}</h4>
                     <p className="text-gray-400 text-[10px] uppercase tracking-wider">{job.company}</p>
                   </div>
                   <div className="text-right">
                     <div className="text-xs font-bold text-primary">{job.pay}</div>
                     <button className="text-[9px] text-gray-500 hover:text-white uppercase font-bold tracking-widest mt-1">Details</button>
                   </div>
                 </Card>
               ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export default StudentDashboard;
