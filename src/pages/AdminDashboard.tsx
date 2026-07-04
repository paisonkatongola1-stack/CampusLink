import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Layout, Activity,
  CheckCircle, AlertCircle, TrendingUp, DollarSign,
  ArrowUpRight, Settings, Clock, X
} from 'lucide-react';
import { useState } from 'react';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Accommodation');

  const stats = [
    { label: "Total Users", val: "10,248", icon: <Users size={24} strokeWidth={2.5} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Listings", val: "1,245", icon: <Layout size={24} strokeWidth={2.5} />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Revenue (MTD)", val: "K45,800", icon: <DollarSign size={24} strokeWidth={2.5} />, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "System Health", val: "99.9%", icon: <Activity size={24} strokeWidth={2.5} />, color: "text-accent", bg: "bg-accent/10" },
  ];

  const getCollectionName = (tab: string) => {
    switch(tab) {
      case 'Accommodation': return 'accommodation';
      case 'Marketplace': return 'marketplace';
      case 'Events': return 'events';
      default: return 'users';
    }
  };

  const pendingItems = {
    'Accommodation': [
       { id: 1, title: "Silverest Shared Room", user: "John B.", date: "1h ago" },
       { id: 2, title: "Riverside Studio", user: "Mary K.", date: "3h ago" }
    ],
    'Marketplace': [
       { id: 3, title: "HP Laptop G8", user: "Mwaka M.", date: "30m ago" },
       { id: 4, title: "Calculus Textbook", user: "Banda C.", date: "5h ago" }
    ],
    'Events': [
       { id: 5, title: "Zambia Tech Expo", user: "ICT Union", date: "Yesterday" }
    ]
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#05060B] p-6 lg:p-12 pt-28"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-6 md:space-y-0">
          <motion.div variants={fadeInUp}>
            <div className="flex items-center space-x-4 mb-3">
              <div className="p-3 bg-accent/20 text-accent rounded-2xl shadow-xl shadow-accent/10 border border-accent/20">
                <Shield size={24} strokeWidth={2.5} />
              </div>
              <h1 className="text-4xl font-black tracking-tight uppercase">Control <span className="text-primary italic">Center</span></h1>
            </div>
            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Platform-wide administrative authority</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex space-x-3">
             <Button variant="glass" size="md" className="border-white/5">
                <Settings size={18} strokeWidth={2.5} className="mr-2" /> Settings
             </Button>
             <Button variant="primary" size="md">
                View Logs <ArrowUpRight size={18} strokeWidth={3} className="ml-2" />
             </Button>
          </motion.div>
        </header>

        <motion.div variants={staggerContainer} className="grid md:grid-cols-4 gap-8 mb-16">
           {stats.map((s, i) => (
             <motion.div key={i} variants={scaleUp}>
               <Card className="p-10 group relative overflow-hidden" hoverable={true}>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 blur-3xl rounded-full" />
                 <div className={`${s.color} ${s.bg} p-4 rounded-2xl inline-flex mb-8 border border-white/5 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                   {s.icon}
                 </div>
                 <div className="text-4xl font-black tracking-tighter mb-2">{s.val}</div>
                 <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{s.label}</div>
               </Card>
             </motion.div>
           ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
           <motion.div variants={fadeInUp} className="space-y-8">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center ml-2">
                <AlertCircle size={16} strokeWidth={3} className="mr-3 text-yellow-500" /> Pending Approvals
              </h3>
              <div className="glass overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                 <div className="flex border-b border-white/5 bg-white/2">
                    {['Accommodation', 'Marketplace', 'Events'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-white'}`}
                      >
                        {tab}
                      </button>
                    ))}
                 </div>
                 <div className="p-8 space-y-6 min-h-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {(pendingItems[activeTab] || []).map((item, i) => (
                          <div key={item.id} className="flex items-center justify-between p-5 bg-white/3 rounded-[1.5rem] border border-white/5 hover:border-primary/20 transition-all group">
                            <div className="flex items-center space-x-5">
                               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-xs text-primary border border-white/10">
                                  {item.user.charAt(0)}
                               </div>
                               <div>
                                  <div className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{item.title}</div>
                                  <div className="flex items-center text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">
                                    <Users size={10} className="mr-1.5" /> {item.user} • <Clock size={10} className="mx-1.5" /> {item.date}
                                  </div>
                               </div>
                            </div>
                            <div className="flex space-x-3">
                               <button className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-lg shadow-green-500/10"><CheckCircle size={18} strokeWidth={2.5} /></button>
                               <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"><X size={18} strokeWidth={2.5} /></button>
                            </div>
                          </div>
                        ))}
                        {pendingItems[activeTab].length === 0 && (
                          <div className="flex flex-col items-center justify-center py-20 text-gray-600 italic">
                             <CheckCircle size={40} className="mb-4 opacity-20" />
                             <p className="text-[10px] font-black uppercase tracking-[0.2em]">All clear! No pending items.</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                 </div>
                 <div className="p-6 border-t border-white/5 bg-white/2">
                    <button className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">
                       View Moderation History
                    </button>
                 </div>
              </div>
           </motion.div>

           <motion.div variants={fadeInUp} className="space-y-8">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center ml-2">
                <TrendingUp size={16} strokeWidth={3} className="mr-3 text-primary" /> Growth Analytics
              </h3>
              <Card className="p-10 h-[525px] flex flex-col relative overflow-hidden" hoverable={false}>
                 <div className="flex justify-between items-start mb-10 z-10">
                    <div>
                       <div className="text-3xl font-black tracking-tighter">1,240 <span className="text-green-500 text-xs font-bold ml-2">+12%</span></div>
                       <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">New users this month</div>
                    </div>
                    <Button variant="glass" size="sm" className="text-[8px] border-white/5">Export CSV</Button>
                 </div>

                 <div className="flex-1 relative">
                    {/* Visualized growth bars */}
                    <div className="absolute inset-x-0 bottom-0 h-64 flex items-end justify-between space-x-2">
                        {[40, 60, 45, 90, 65, 80, 100, 75, 85, 95].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-xl shadow-lg shadow-primary/10 relative group"
                          >
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                               {h}%
                             </div>
                          </motion.div>
                        ))}
                    </div>
                 </div>

                 <div className="mt-10 pt-6 border-t border-white/5 z-10">
                    <div className="flex justify-between items-center">
                       <p className="text-white font-black text-xs tracking-tight uppercase italic">User Engagement</p>
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Updated 5m ago</p>
                    </div>
                 </div>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
