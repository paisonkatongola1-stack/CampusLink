import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Layout, Activity,
  CheckCircle, AlertCircle, TrendingUp, DollarSign,
  ArrowUpRight, Settings, Trash2, Check, X
} from 'lucide-react';
import { useState } from 'react';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'Accommodation' | 'Marketplace' | 'Events' | 'Businesses'>('Accommodation');

  const [pendingItems, setPendingItems] = useState([
    { id: 1, title: "Riverside Shared Room (K2,200)", user: "Landlord: John B.", category: "Accommodation", campus: "CBU" },
    { id: 2, title: "Silverest Self-Contained Flat", user: "Landlord: Alice M.", category: "Accommodation", campus: "UNZA" },
    { id: 3, title: "HP Laptop G8 Pro (K7,500)", user: "Student: Mwaka M.", category: "Marketplace", campus: "UNZA" },
    { id: 4, title: "Economics Textbooks Bundle", user: "Student: Bwalya C.", category: "Marketplace", campus: "Mulungushi" },
    { id: 5, title: "Zambia Tech Expo 2026", user: "Organizer: ICT Union", category: "Events", campus: "UNZA" },
    { id: 6, title: "Zed Print Hub & Binding", user: "Business: Patrick N.", category: "Businesses", campus: "Lusaka" },
  ]);

  const handleApprove = (id: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReject = (id: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredPending = pendingItems.filter(item => item.category === selectedTab);

  const stats = [
    { label: "Total Users", val: "10,248", icon: <Users size={24} strokeWidth={2.5} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Listings", val: "1,245", icon: <Layout size={24} strokeWidth={2.5} />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Revenue (MTD)", val: "K45,800", icon: <DollarSign size={24} strokeWidth={2.5} />, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "System Health", val: "99.9%", icon: <Activity size={24} strokeWidth={2.5} />, color: "text-accent", bg: "bg-accent/10" },
  ];

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
                 <div className="flex border-b border-white/5 bg-white/2 overflow-x-auto no-scrollbar">
                    {(['Accommodation', 'Marketplace', 'Events', 'Businesses'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`flex-1 py-4 px-3 text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
                          selectedTab === tab
                            ? 'bg-primary/20 text-primary border-b-2 border-primary'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                 </div>
                 <div className="p-6 space-y-4">
                    {filteredPending.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 text-xs font-bold">
                        No pending items in {selectedTab}. All caught up!
                      </div>
                    ) : (
                      filteredPending.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-white/3 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                          <div>
                            <div className="font-bold text-xs tracking-tight text-white">{item.title}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{item.user} • {item.campus}</div>
                          </div>
                          <div className="flex space-x-2">
                             <button
                               onClick={() => handleApprove(item.id)}
                               className="p-2.5 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500 hover:text-white transition-all"
                               title="Approve Listing"
                             >
                               <Check size={16} strokeWidth={3} />
                             </button>
                             <button
                               onClick={() => handleReject(item.id)}
                               className="p-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                               title="Reject Listing"
                             >
                               <X size={16} strokeWidth={3} />
                             </button>
                          </div>
                        </div>
                      ))
                    )}
                 </div>
              </div>
           </motion.div>

           <motion.div variants={fadeInUp} className="space-y-8">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center ml-2">
                <TrendingUp size={16} strokeWidth={3} className="mr-3 text-primary" /> Growth Analytics
              </h3>
              <Card className="p-10 h-[450px] flex items-center justify-center relative overflow-hidden" hoverable={false}>
                 {/* Visualized growth bars */}
                 <div className="absolute inset-x-10 bottom-10 h-64 flex items-end justify-between space-x-2">
                    {[40, 60, 45, 90, 65, 80, 100, 75, 85, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-xl shadow-lg shadow-primary/10"
                      />
                    ))}
                 </div>
                 <div className="z-10 text-center bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                    <p className="text-white font-black text-lg tracking-tight uppercase italic mb-1">User Engagement</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Real-time growth metrics</p>
                 </div>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
