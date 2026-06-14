import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Home, ShoppingBag,
  Briefcase, Calendar, MessageSquare, Cpu,
  Settings, Bell, Search, MapPin, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/ui/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';

const StudentDashboard = () => {
  const { profile } = useAuth();

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} strokeWidth={2.5} />, label: "Dashboard", href: "/dashboard" },
    { icon: <User size={20} strokeWidth={2.5} />, label: "Profile", href: "/profile" },
    { icon: <Home size={20} strokeWidth={2.5} />, label: "Accommodation", href: "/accommodation" },
    { icon: <ShoppingBag size={20} strokeWidth={2.5} />, label: "Marketplace", href: "/marketplace" },
    { icon: <Briefcase size={20} strokeWidth={2.5} />, label: "Jobs", href: "/jobs" },
    { icon: <Calendar size={20} strokeWidth={2.5} />, label: "Events", href: "/events" },
    { icon: <MessageSquare size={20} strokeWidth={2.5} />, label: "Messages", href: "/messages" },
    { icon: <Cpu size={20} strokeWidth={2.5} />, label: "AI Assistant", href: "/chat" },
    { icon: <Settings size={20} strokeWidth={2.5} />, label: "Settings", href: "/settings" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex min-h-screen bg-[#0A0B14]"
    >
      <Sidebar items={sidebarItems} />

      <main className="flex-1 p-6 lg:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-black tracking-tight">Student <span className="text-primary">Dashboard</span></h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Welcome back, {profile?.displayName || 'Student'}</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-primary transition-all w-48 md:w-64 text-sm font-medium"
              />
            </div>
            <button className="p-2.5 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all relative group">
              <Bell size={20} strokeWidth={2.5} className="text-gray-400 group-hover:text-white" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-[#0A0B14]" />
            </button>
          </motion.div>
        </header>

        <motion.div variants={fadeInUp} className="mb-12">
          <Card className="p-10 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10 relative overflow-hidden" hoverable={false}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />

            <div className="w-28 h-24 bg-gradient-to-br from-primary to-blue-700 rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl shadow-primary/20 z-10">
              {profile?.displayName?.substring(0, 2).toUpperCase() || 'ST'}
            </div>

            <div className="flex-1 text-center md:text-left z-10">
              <h2 className="text-3xl font-extrabold flex items-center justify-center md:justify-start tracking-tight">
                {profile?.displayName || 'Chanda Musonda'}
                <div className="ml-3 p-1 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                  <CheckCircle size={12} strokeWidth={4} className="text-white" />
                </div>
              </h2>
              <p className="text-primary font-bold text-sm mt-2 uppercase tracking-widest">{profile?.university || 'University of Zambia (UNZA)'}</p>
              <p className="text-gray-400 text-xs mt-1 font-medium italic opacity-80">{profile?.course || 'Bachelor of Computer Science'}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-6">
                {['React.js', 'Python', 'UI/UX Design'].map(skill => (
                  <span key={skill} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-300 font-black uppercase tracking-widest hover:border-primary/40 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>

            <Link to="/profile" className="z-10">
              <Button variant="glass" size="sm" className="px-8">Edit Profile</Button>
            </Link>
          </Card>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Recommended Accommodation */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500">Recommended Housing</h3>
              <Link to="/accommodation" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80">View All</Link>
            </div>
            <Card className="p-0 group relative" hoverable={true}>
              <div className="aspect-video bg-white/5 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Room" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-xl px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">UNZA Area</div>
              </div>
              <div className="p-8 flex justify-between items-center bg-gradient-to-b from-transparent to-black/20">
                <div>
                  <h4 className="font-bold text-lg tracking-tight">Silverest Executive Lodge</h4>
                  <div className="flex items-center text-gray-400 text-[10px] mt-2 font-black uppercase tracking-widest">
                    <MapPin size={12} strokeWidth={2.5} className="mr-2 text-primary" /> 500m from UNZA
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-primary font-black text-xl">K3,500</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Per Month</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Latest Internships */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500">Latest Internships</h3>
              <Link to="/jobs" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80">View All</Link>
            </div>
            <div className="space-y-4">
               {[
                 { role: "Software Dev Intern", company: "Zambia Tech Hub", pay: "K4,000", color: "bg-blue-500/20 text-blue-500" },
                 { role: "Marketing Assistant", company: "Zed Media Group", pay: "Part-time", color: "bg-accent/20 text-accent" }
               ].map((job, i) => (
                 <motion.div key={i} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                   <Card className="p-6 flex items-center space-x-6">
                     <div className={`w-14 h-14 ${job.color} rounded-2xl flex items-center justify-center font-black text-2xl border border-white/5 shadow-xl`}>
                       {job.company.charAt(0)}
                     </div>
                     <div className="flex-1">
                       <h4 className="font-bold text-base tracking-tight">{job.role}</h4>
                       <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">{job.company}</p>
                     </div>
                     <div className="text-right">
                       <div className="text-xs font-black text-white">{job.pay}</div>
                       <button className="text-[9px] text-primary hover:text-white uppercase font-black tracking-[0.2em] mt-2 transition-colors">Details</button>
                     </div>
                   </Card>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default StudentDashboard;
