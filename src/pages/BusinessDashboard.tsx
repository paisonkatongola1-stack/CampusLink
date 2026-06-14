import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Briefcase, ShoppingBag,
  MessageSquare, Settings, Bell, Search, Eye,
  MessageCircle, Zap, Clock, Plus
} from 'lucide-react';

const BusinessDashboard = () => {
  const stats = [
    { label: "Total Views", value: "12.4k", icon: <Eye className="text-blue-500" />, trend: "+12%" },
    { label: "Inquiries", value: "48", icon: <MessageCircle className="text-green-500" />, trend: "+5%" },
    { label: "Active Jobs", value: "5", icon: <Briefcase className="text-primary" />, trend: "0%" },
    { label: "Pending Orders", value: "12", icon: <Clock className="text-accent" />, trend: "+2" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0B14]">
      {/* Sidebar - Shared style with Student */}
      <aside className="hidden lg:flex flex-col w-64 glass border-r border-white/5 p-6 space-y-8 sticky top-20 h-[calc(100vh-80px)]">
        <div className="space-y-1">
          {["Dashboard", "Profile", "Listings", "Jobs Posted", "Applications", "Messages", "Settings"].map((label, i) => (
            <button key={i} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${i === 0 ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>
              <span className="font-medium text-sm">{label}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Business Hub</h1>
            <p className="text-gray-400">Manage your listings and reach Zambian students</p>
          </div>
          <button className="hidden md:flex items-center px-6 py-3 bg-primary rounded-xl font-bold hover:bg-primary-dark transition-all">
            <Plus size={20} className="mr-2" /> Post New
          </button>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-3xl border border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">{stat.icon}</div>
                <span className="text-xs font-bold text-green-500">{stat.trend}</span>
              </div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold mb-6">Recent Applications</h3>
              <div className="space-y-6">
                {[
                  { name: "Mwaka Mutale", role: "Software Intern", status: "New", date: "2h ago" },
                  { name: "Banda Chileshe", role: "Marketing Assistant", status: "Reviewing", date: "5h ago" },
                  { name: "Kunda Musonda", role: "Software Intern", status: "Shortlisted", date: "Yesterday" },
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">{app.name.charAt(0)}</div>
                      <div>
                        <div className="font-bold text-sm">{app.name}</div>
                        <div className="text-xs text-gray-400">{app.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                         app.status === 'New' ? 'bg-blue-500/20 text-blue-500' :
                         app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                       }`}>{app.status}</span>
                       <div className="text-[10px] text-gray-500 mt-1">{app.date}</div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold mb-6">Active Listings</h3>
              <div className="space-y-4">
                 {[
                   { title: "MacBook Pro M1", views: "1.2k", price: "K15,000" },
                   { title: "Calculus Tutors", views: "850", price: "K150/hr" }
                 ].map((item, i) => (
                   <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{item.views} views</span>
                        <span className="text-primary font-bold">{item.price}</span>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-gray-500 text-sm hover:border-primary hover:text-primary transition-all">
                   + Create New Listing
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;
