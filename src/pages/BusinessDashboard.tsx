import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Briefcase, ShoppingBag,
  MessageSquare, Settings, Bell, Search, Eye,
  MessageCircle, Zap, Clock, Plus, TrendingUp
} from 'lucide-react';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/ui/Sidebar';
import CreateListing from '../components/CreateListing';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCollection } from '../hooks/useData';
import { where } from 'firebase/firestore';

const BusinessDashboard = () => {
  const { user } = useAuth();
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  const { data: userApplications } = useCollection('applications', [
    where('userId', '==', user?.uid)
  ]);

  const { data: userListings } = useCollection('marketplace', [
    where('userId', '==', user?.uid)
  ]);
  const stats = [
    { label: "Total Views", value: "12.4k", icon: <Eye size={22} strokeWidth={2.5} className="text-blue-500" />, trend: "+12%" },
    { label: "Inquiries", value: "48", icon: <MessageCircle size={22} strokeWidth={2.5} className="text-green-500" />, trend: "+5%" },
    { label: "Active Jobs", value: "5", icon: <Briefcase size={22} strokeWidth={2.5} className="text-primary" />, trend: "0%" },
    { label: "Pending Orders", value: "12", icon: <Clock size={22} strokeWidth={2.5} className="text-accent" />, trend: "+2" },
  ];

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} strokeWidth={2.5} />, label: "Dashboard", href: "/business-dashboard" },
    { icon: <User size={20} strokeWidth={2.5} />, label: "Profile", href: "/profile" },
    { icon: <ShoppingBag size={20} strokeWidth={2.5} />, label: "Listings", href: "/listings" },
    { icon: <Briefcase size={20} strokeWidth={2.5} />, label: "Jobs Posted", href: "/jobs-posted" },
    { icon: <Zap size={20} strokeWidth={2.5} />, label: "Applications", href: "/applications" },
    { icon: <MessageSquare size={20} strokeWidth={2.5} />, label: "Messages", href: "/messages" },
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
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-black tracking-tight uppercase italic">Business <span className="text-primary italic-none">Hub</span></h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Manage your ecosystem presence</p>
          </motion.div>
          <motion.button
            {...hoverScale}
            onClick={() => setIsListingModalOpen(true)}
            className="flex items-center px-8 py-4 bg-primary rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
          >
            <Plus size={18} strokeWidth={3} className="mr-2" /> Post New
          </motion.button>
        </header>

        <CreateListing
          isOpen={isListingModalOpen}
          onClose={() => setIsListingModalOpen(false)}
        />

        <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="p-8 group relative overflow-hidden" hoverable={true}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 blur-2xl rounded-full" />
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-colors duration-500">{stat.icon}</div>
                  <div className="flex items-center text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                    <TrendingUp size={10} strokeWidth={2.5} className="mr-1" /> {stat.trend}
                  </div>
                </div>
                <div className="text-3xl font-black tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
           <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 ml-2">Recent Applications</h3>
              <div className="space-y-4">
                {userApplications.length === 0 ? (
                  <div className="text-gray-600 text-[10px] font-black uppercase tracking-widest p-6 text-center glass rounded-2xl">No applications yet</div>
                ) : (
                  userApplications.map((app: any) => (
                    <motion.div key={app.id} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Card className="flex items-center justify-between p-6 bg-white/2 hover:bg-white/5 border-white/5 transition-all">
                        <div className="flex items-center space-x-5">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl flex items-center justify-center text-primary font-black text-xl border border-white/5 shadow-xl">
                            {app.name?.charAt(0) || "A"}
                          </div>
                          <div>
                            <div className="font-bold text-base tracking-tight">{app.name || "Applicant"}</div>
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{app.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                            app.status === 'pending' ? 'bg-blue-500/20 text-blue-500' :
                            app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                          }`}>{app.status}</span>
                          <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-2">
                            {app.appliedAt?.toDate().toLocaleDateString()}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
           </motion.div>

           <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 ml-2">Your Listings</h3>
              <div className="space-y-4">
                 {userListings.length === 0 ? (
                    <div className="text-gray-600 text-[10px] font-black uppercase tracking-widest p-6 text-center border-2 border-dashed border-white/5 rounded-2xl">No listings yet</div>
                 ) : (
                   userListings.map((item: any) => (
                    <Card key={item.id} className="p-6 bg-white/2 border-white/5 group">
                        <div className="font-bold text-sm mb-3 tracking-tight group-hover:text-primary transition-colors">{item.title}</div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            <span className={`px-2 py-1 rounded-lg ${item.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                              {item.status}
                            </span>
                          </div>
                          <span className={`font-black text-base tracking-tighter text-primary`}>{item.price}</span>
                        </div>
                    </Card>
                   ))
                 )}
                 <button
                  onClick={() => setIsListingModalOpen(true)}
                  className="w-full py-6 border-2 border-dashed border-white/5 rounded-3xl text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] hover:border-primary/40 hover:text-primary transition-all"
                >
                   + Create New Listing
                 </button>
              </div>
           </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default BusinessDashboard;
