import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Home, ShoppingBag,
  Briefcase, Calendar, MessageSquare, Cpu,
  Settings, Bell, Search, MapPin, CheckCircle, TrendingUp, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/ui/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { fadeInUp, staggerContainer, hoverScale, scaleUp } from '../utils/animations';

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

      <main className="flex-1 p-6 lg:p-12 overflow-x-hidden">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl font-black tracking-tight uppercase italic">Student <span className="text-primary italic-none">Dashboard</span></h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Welcome back, {profile?.displayName || 'Student'}</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Quick Search..."
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-primary transition-all w-48 md:w-80 text-sm font-medium shadow-2xl"
              />
            </div>
            <motion.button {...hoverScale} className="p-3.5 glass rounded-2xl border border-white/10 hover:bg-white/5 transition-all relative group">
              <Bell size={20} strokeWidth={2.5} className="text-gray-400 group-hover:text-white" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full border-2 border-[#0A0B14] shadow-lg shadow-accent/20" />
            </motion.button>
          </motion.div>
        </header>

        <motion.div variants={scaleUp} className="mb-16">
          <Card className="p-12 flex flex-col md:flex-row items-center md:items-start space-y-10 md:space-y-0 md:space-x-12 relative overflow-hidden" hoverable={false}>
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[120px] -mr-32 -mt-32 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[100px] -ml-32 -mb-32 rounded-full pointer-events-none" />

            <div className="w-32 h-28 bg-gradient-to-br from-primary to-blue-700 rounded-[2.5rem] flex items-center justify-center text-5xl font-black shadow-2xl shadow-primary/30 z-10 relative">
              <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] blur-sm" />
              <span className="relative">{profile?.displayName?.substring(0, 2).toUpperCase() || 'ST'}</span>
            </div>

            <div className="flex-1 text-center md:text-left z-10">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <h2 className="text-4xl font-black tracking-tight">{profile?.displayName || 'Chanda Musonda'}</h2>
                <div className="ml-4 p-1.5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-2 border-white/10">
                  <CheckCircle size={14} strokeWidth={4} className="text-white" />
                </div>
              </div>
              <p className="text-primary font-black text-xs uppercase tracking-[0.3em]">{profile?.university || 'University of Zambia (UNZA)'}</p>
              <p className="text-gray-500 text-xs mt-3 font-bold italic opacity-80 uppercase tracking-widest">{profile?.course || 'Bachelor of Computer Science'}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-10">
                {['React.js', 'Python', 'UI/UX Design', 'Node.js'].map(skill => (
                  <span key={skill} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-black uppercase tracking-widest hover:border-primary/40 hover:text-white transition-all cursor-default shadow-xl">{skill}</span>
                ))}
              </div>
            </div>

            <Link to="/profile" className="z-10">
              <motion.button {...hoverScale} className="px-10 py-4 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 shadow-2xl">
                Edit Profile
              </motion.button>
            </Link>
          </Card>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Recommended Accommodation */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="flex justify-between items-center px-4">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center">
                <Home size={16} className="mr-3 text-primary" /> Recommended Housing
              </h3>
              <Link to="/accommodation" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors">View All</Link>
            </div>
            <Card className="p-0 group relative overflow-hidden" hoverable={true}>
              <div className="aspect-video bg-white/5 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Room" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 z-10 shadow-2xl">UNZA Area</div>
                <div className="absolute bottom-6 left-6 z-10">
                   <div className="text-white font-black text-3xl tracking-tighter shadow-2xl">K3,500<span className="text-sm font-normal opacity-70 ml-1">/mo</span></div>
                </div>
              </div>
              <div className="p-8 flex justify-between items-center bg-white/2">
                <div>
                  <h4 className="font-bold text-2xl tracking-tight group-hover:text-primary transition-colors">Silverest Executive Lodge</h4>
                  <div className="flex items-center text-gray-500 text-[10px] mt-4 font-black uppercase tracking-widest">
                    <MapPin size={14} strokeWidth={2.5} className="mr-2 text-primary" /> 500m from UNZA
                  </div>
                </div>
                <motion.button {...hoverScale} className="p-4 bg-primary rounded-2xl shadow-xl shadow-primary/20 text-white border border-white/10">
                   <ArrowUpRight size={20} strokeWidth={3} />
                </motion.button>
              </div>
            </Card>
          </motion.div>

          {/* Latest Internships */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="flex justify-between items-center px-4">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center">
                <Briefcase size={16} className="mr-3 text-primary" /> Latest Internships
              </h3>
              <Link to="/jobs" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors">View All</Link>
            </div>
            <div className="space-y-6">
               {[
                 { role: "Software Dev Intern", company: "Zambia Tech Hub", pay: "K4,000", color: "text-blue-500", bg: "bg-blue-500/10", icon: "Z" },
                 { role: "Marketing Assistant", company: "Zed Media Group", pay: "Part-time", color: "text-accent", bg: "bg-accent/10", icon: "M" }
               ].map((job, i) => (
                 <motion.div key={i} whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                   <Card className="p-8 flex items-center space-x-8 group relative overflow-hidden" hoverable={true}>
                     <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 blur-2xl rounded-full" />
                     <div className={`w-16 h-16 ${job.bg} ${job.color} rounded-2xl flex items-center justify-center font-black text-3xl border border-white/5 shadow-2xl z-10 group-hover:scale-110 transition-transform`}>
                       {job.icon}
                     </div>
                     <div className="flex-1 z-10">
                       <h4 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">{job.role}</h4>
                       <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">{job.company}</p>
                     </div>
                     <div className="text-right z-10">
                       <div className="text-lg font-black text-white tracking-tighter">{job.pay}</div>
                       <button className="text-[9px] text-primary hover:text-white uppercase font-black tracking-[0.3em] mt-3 transition-colors border-b border-primary/20 pb-0.5">Details</button>
                     </div>
                   </Card>
                 </motion.div>
               ))}

               <Card className="p-8 bg-gradient-to-r from-primary/10 to-transparent border-dashed border-white/10" hoverable={false}>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/20 rounded-xl text-primary"><TrendingUp size={20} strokeWidth={2.5} /></div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Platform Activity</p>
                           <p className="text-sm font-bold text-white">Your profile is trending! 12 new views.</p>
                        </div>
                     </div>
                     <Star size={20} className="text-yellow-500 fill-yellow-500" />
                  </div>
               </Card>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default StudentDashboard;
