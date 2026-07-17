import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Briefcase, ShoppingBag,
  MessageSquare, Settings, Eye, MessageCircle, Zap, Clock, Plus, TrendingUp, Home, Users
} from 'lucide-react';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/ui/Sidebar';
import { useAuth } from '../context/AuthContext';

const BusinessDashboard = () => {
  const { profile } = useAuth();
  const role = profile?.role || 'business';

  // Role-specific settings
  let dashboardTitle = 'Business';
  let dashboardSubtitle = 'Manage your ecosystem presence';
  let ctaButtonText = 'Post New Product';
  let activeListingsHeader = 'Active Listings';
  let createListingButtonText = '+ Create New Listing';

  let stats = [
    { label: "Total Views", value: "12.4k", icon: <Eye size={22} strokeWidth={2.5} className="text-blue-500" />, trend: "+12%" },
    { label: "Inquiries", value: "48", icon: <MessageCircle size={22} strokeWidth={2.5} className="text-green-500" />, trend: "+5%" },
    { label: "Active Listings", value: "5", icon: <ShoppingBag size={22} strokeWidth={2.5} className="text-primary" />, trend: "0%" },
    { label: "Pending Orders", value: "12", icon: <Clock size={22} strokeWidth={2.5} className="text-accent" />, trend: "+2" },
  ];

  let recentApplicationsHeader = 'Recent Applications';
  let mockListings = [
    { title: "MacBook Pro M1", views: "1.2k", price: "K15,000", color: "text-blue-400" },
    { title: "Calculus Tutors", views: "850", price: "K150/hr", color: "text-green-400" }
  ];

  if (role === 'landlord') {
    dashboardTitle = 'Landlord';
    dashboardSubtitle = 'Manage your campus accommodation listings';
    ctaButtonText = 'Post New Property';
    activeListingsHeader = 'Active Properties';
    createListingButtonText = '+ List New Property';
    stats = [
      { label: "Total Views", value: "8.6k", icon: <Eye size={22} strokeWidth={2.5} className="text-blue-500" />, trend: "+8%" },
      { label: "Inquiries", value: "32", icon: <MessageCircle size={22} strokeWidth={2.5} className="text-green-500" />, trend: "+15%" },
      { label: "Properties Listed", value: "3", icon: <Home size={22} strokeWidth={2.5} className="text-primary" />, trend: "0%" },
      { label: "Occupied Rooms", value: "8", icon: <Users size={22} strokeWidth={2.5} className="text-accent" />, trend: "+1" },
    ];
    recentApplicationsHeader = 'Tenant Inquiries';
    mockListings = [
      { title: "Silverest Executive Lodge (Room 4)", views: "1.1k", price: "K3,500/mo", color: "text-blue-400" },
      { title: "CBU Modern Hostels (Shared)", views: "740", price: "K2,800/mo", color: "text-green-400" }
    ];
  } else if (role === 'employer') {
    dashboardTitle = 'Employer';
    dashboardSubtitle = 'Source and manage top student talent';
    ctaButtonText = 'Post New Job';
    activeListingsHeader = 'Active Job Openings';
    createListingButtonText = '+ Post New Job Opening';
    stats = [
      { label: "Job Views", value: "14.2k", icon: <Eye size={22} strokeWidth={2.5} className="text-blue-500" />, trend: "+24%" },
      { label: "Applications", value: "114", icon: <MessageCircle size={22} strokeWidth={2.5} className="text-green-500" />, trend: "+18%" },
      { label: "Active Jobs", value: "2", icon: <Briefcase size={22} strokeWidth={2.5} className="text-primary" />, trend: "0%" },
      { label: "Hired Students", value: "15", icon: <Users size={22} strokeWidth={2.5} className="text-accent" />, trend: "+3" },
    ];
    recentApplicationsHeader = 'Recent Job Applications';
    mockListings = [
      { title: "Software Development Intern", views: "1.8k", price: "K4,000/mo", color: "text-blue-400" },
      { title: "Marketing Assistant", views: "980", price: "K2,500/mo", color: "text-green-400" }
    ];
  }

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} strokeWidth={2.5} />, label: "Dashboard", href: "/business-dashboard" },
    { icon: <User size={20} strokeWidth={2.5} />, label: "Profile", href: "/profile" },
    { icon: <ShoppingBag size={20} strokeWidth={2.5} />, label: "Listings", href: "/marketplace" },
    { icon: <Briefcase size={20} strokeWidth={2.5} />, label: "Jobs Posted", href: "/jobs" },
    { icon: <Zap size={20} strokeWidth={2.5} />, label: "Applications", href: "/profile" },
    { icon: <MessageSquare size={20} strokeWidth={2.5} />, label: "Messages", href: "/messages" },
    { icon: <Settings size={20} strokeWidth={2.5} />, label: "Settings", href: "/profile" },
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
            <h1 className="text-3xl font-black tracking-tight uppercase italic">
              {dashboardTitle} <span className="text-primary italic-none">Hub</span>
            </h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">{dashboardSubtitle}</p>
          </motion.div>
          <motion.button {...hoverScale} className="flex items-center px-8 py-4 bg-primary rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
            <Plus size={18} strokeWidth={3} className="mr-2" /> {ctaButtonText}
          </motion.button>
        </header>

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
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 ml-2">{recentApplicationsHeader}</h3>
              <div className="space-y-4">
                {[
                  { name: "Mwaka Mutale", role: role === 'landlord' ? "Viewing Inquiry" : "Software Intern", status: "New", date: "2h ago" },
                  { name: "Banda Chileshe", role: role === 'landlord' ? "Pricing Inquiry" : "Marketing Assistant", status: "Reviewing", date: "5h ago" },
                  { name: "Kunda Musonda", role: role === 'landlord' ? "Room Booking" : "Software Intern", status: "Shortlisted", date: "Yesterday" },
                ].map((app, i) => (
                  <motion.div key={i} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Card className="flex items-center justify-between p-6 bg-white/2 hover:bg-white/5 border-white/5 transition-all">
                      <div className="flex items-center space-x-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl flex items-center justify-center text-primary font-black text-xl border border-white/5 shadow-xl">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-base tracking-tight">{app.name}</div>
                          <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{app.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                           app.status === 'New' ? 'bg-blue-500/20 text-blue-500' :
                           app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                         }`}>{app.status}</span>
                         <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-2">{app.date}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
           </motion.div>

           <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 ml-2">{activeListingsHeader}</h3>
              <div className="space-y-4">
                 {mockListings.map((item, i) => (
                   <Card key={i} className="p-6 bg-white/2 border-white/5 group">
                      <div className="font-bold text-sm mb-3 tracking-tight group-hover:text-primary transition-colors">{item.title}</div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-[10px] font-black text-gray-600 uppercase tracking-widest">
                          <Eye size={12} className="mr-1.5" /> {item.views}
                        </div>
                        <span className={`font-black text-base tracking-tighter ${item.color}`}>{item.price}</span>
                      </div>
                   </Card>
                 ))}
                 <button className="w-full py-6 border-2 border-dashed border-white/5 rounded-3xl text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] hover:border-primary/40 hover:text-primary transition-all">
                   {createListingButtonText}
                 </button>
              </div>
           </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default BusinessDashboard;
