import { motion } from 'framer-motion';
import {
  Shield, Users, Layout, Activity,
  CheckCircle, AlertCircle, TrendingUp, DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#05060B] p-6 lg:p-10 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-accent/20 text-accent rounded-lg"><Shield size={20} /></div>
            <h1 className="text-3xl font-bold tracking-tight">System Administration</h1>
          </div>
          <p className="text-gray-500">Platform-wide overview and moderation hub</p>
        </header>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
           {[
             { label: "Total Users", val: "10,248", icon: <Users />, color: "text-blue-500" },
             { label: "Total Listings", val: "1,245", icon: <Layout />, color: "text-purple-500" },
             { label: "Revenue (MTD)", val: "K45,800", icon: <DollarSign />, color: "text-green-500" },
             { label: "System Health", val: "99.9%", icon: <Activity />, color: "text-accent" },
           ].map((s, i) => (
             <div key={i} className="glass p-6 rounded-3xl border border-white/5">
               <div className={`${s.color} mb-4`}>{s.icon}</div>
               <div className="text-2xl font-black">{s.val}</div>
               <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
             </div>
           ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
           <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center">
                <AlertCircle size={20} className="mr-2 text-yellow-500" /> Pending Approvals
              </h3>
              <div className="glass overflow-hidden rounded-3xl border border-white/5">
                 <div className="flex border-b border-white/5">
                    {['Accommodation', 'Marketplace', 'Events'].map((tab, i) => (
                      <button key={tab} className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider ${i === 0 ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-white transition-all'}`}>
                        {tab}
                      </button>
                    ))}
                 </div>
                 <div className="p-6 space-y-4">
                    {[
                      { title: "Riverside Shared Room", user: "Landlord: John B.", type: "New Listing" },
                      { title: "Zambia Tech Expo", user: "Organizer: ICT Union", type: "Event" },
                      { title: "HP Laptop for sale", user: "Student: Mwaka M.", type: "Marketplace" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                          <div className="font-bold text-sm">{item.title}</div>
                          <div className="text-[10px] text-gray-400">{item.user}</div>
                        </div>
                        <div className="flex space-x-2">
                           <button className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"><CheckCircle size={16} /></button>
                           <button className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><AlertCircle size={16} /></button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center">
                <TrendingUp size={20} className="mr-2 text-primary" /> Growth Analytics
              </h3>
              <div className="glass p-8 rounded-3xl border border-white/5 h-[400px] flex items-center justify-center relative overflow-hidden">
                 {/* Placeholder for chart */}
                 <div className="absolute inset-0 opacity-20 flex items-end">
                    {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-primary to-transparent mx-1 rounded-t-lg" />
                    ))}
                 </div>
                 <p className="text-gray-500 font-bold z-10 text-center">Interactive Growth Charts<br /><span className="text-xs font-normal">Real-time user engagement data</span></p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
