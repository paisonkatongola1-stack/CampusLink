import { motion } from 'framer-motion';
import {
  Shield, Users, Layout, Activity,
  CheckCircle, AlertCircle, TrendingUp, DollarSign,
  ArrowUpRight, Settings, LayoutDashboard, Database,
  Eye, Filter, MoreVertical, Trash2, ArrowDownRight
} from 'lucide-react';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/ui/Sidebar';

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", val: "10,248", icon: <Users size={24} strokeWidth={2.5} />, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12.5%", positive: true },
    { label: "Total Listings", val: "1,245", icon: <Layout size={24} strokeWidth={2.5} />, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+5.2%", positive: true },
    { label: "Revenue (MTD)", val: "K45,800", icon: <DollarSign size={24} strokeWidth={2.5} />, color: "text-green-500", bg: "bg-green-500/10", trend: "+22.1%", positive: true },
    { label: "Server Load", val: "42%", icon: <Activity size={24} strokeWidth={2.5} />, color: "text-accent", bg: "bg-accent/10", trend: "-2.4%", positive: true },
  ];

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} strokeWidth={2.5} />, label: "Dashboard", href: "/admin-dashboard" },
    { icon: <Users size={20} strokeWidth={2.5} />, label: "User Management", href: "/admin/users" },
    { icon: <Database size={20} strokeWidth={2.5} />, label: "Content Approval", href: "/admin/approvals" },
    { icon: <TrendingUp size={20} strokeWidth={2.5} />, label: "Growth Data", href: "/admin/analytics" },
    { icon: <Shield size={20} strokeWidth={2.5} />, label: "System Logs", href: "/admin/logs" },
    { icon: <Settings size={20} strokeWidth={2.5} />, label: "Settings", href: "/settings" },
  ];

  const recentUsers = [
    { name: "Mwaka Mutale", email: "mwaka@unza.zm", role: "Student", joined: "1h ago", status: "Active" },
    { name: "Copperbelt Real Estate", email: "info@cbu-re.zm", role: "Landlord", joined: "3h ago", status: "Pending" },
    { name: "Zed Media Group", email: "jobs@zedmedia.com", role: "Employer", joined: "5h ago", status: "Active" },
    { name: "John Banda", email: "john@student.zm", role: "Student", joined: "Yesterday", status: "Flagged" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex min-h-screen bg-[#05060B]"
    >
      <Sidebar items={sidebarItems} />

      <main className="flex-1 p-6 lg:p-10 pt-28">
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
                  <Filter size={18} strokeWidth={2.5} className="mr-2" /> Filters
               </Button>
               <Button variant="primary" size="md">
                  Export Data <ArrowUpRight size={18} strokeWidth={3} className="ml-2" />
               </Button>
            </motion.div>
          </header>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-4 gap-8 mb-12">
             {stats.map((s, i) => (
               <motion.div key={i} variants={scaleUp}>
                 <Card className="p-8 group relative overflow-hidden" hoverable={true}>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 blur-3xl rounded-full" />
                   <div className="flex justify-between items-start mb-8">
                     <div className={`${s.color} ${s.bg} p-4 rounded-2xl inline-flex border border-white/5 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                       {s.icon}
                     </div>
                     <div className={`flex items-center text-[10px] font-black px-2 py-1 rounded-lg ${s.positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {s.positive ? <TrendingUp size={10} className="mr-1" /> : <ArrowDownRight size={10} className="mr-1" />}
                        {s.trend}
                     </div>
                   </div>
                   <div className="text-4xl font-black tracking-tighter mb-2">{s.val}</div>
                   <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{s.label}</div>
                 </Card>
               </motion.div>
             ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
             <motion.div variants={fadeInUp} className="space-y-8">
                <div className="flex justify-between items-center px-2">
                   <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center">
                     <Users size={16} strokeWidth={3} className="mr-3 text-primary" /> User Management
                   </h3>
                   <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All</button>
                </div>

                <Card className="overflow-hidden border-white/5" hoverable={false}>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-white/2 border-b border-white/5">
                               {['User', 'Role', 'Status', 'Joined', ''].map(h => (
                                 <th key={h} className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                               ))}
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {recentUsers.map((user, i) => (
                              <tr key={i} className="hover:bg-white/2 transition-all">
                                 <td className="p-6">
                                    <div className="flex items-center space-x-4">
                                       <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black text-sm">{user.name.charAt(0)}</div>
                                       <div>
                                          <div className="font-bold text-sm">{user.name}</div>
                                          <div className="text-[10px] text-gray-500 font-medium">{user.email}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="p-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 border border-white/10 px-2.5 py-1 rounded-lg bg-white/2">{user.role}</span>
                                 </td>
                                 <td className="p-6">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                                       user.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                       user.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                    }`}>{user.status}</span>
                                 </td>
                                 <td className="p-6 text-xs text-gray-500 font-bold">{user.joined}</td>
                                 <td className="p-6">
                                    <div className="flex items-center space-x-2">
                                       <button className="p-2 text-gray-500 hover:text-white transition-all"><Eye size={16} strokeWidth={2.5} /></button>
                                       <button className="p-2 text-gray-500 hover:text-red-500 transition-all"><Trash2 size={16} strokeWidth={2.5} /></button>
                                    </div>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </motion.div>

             <motion.div variants={fadeInUp} className="space-y-8">
                <div className="flex justify-between items-center px-2">
                   <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center">
                     <TrendingUp size={16} strokeWidth={3} className="mr-3 text-primary" /> Growth Analytics
                   </h3>
                   <div className="flex space-x-2">
                      {['7D', '30D', '1Y'].map(t => (
                        <button key={t} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${t === '30D' ? 'bg-primary text-white' : 'glass text-gray-500 border-white/5'}`}>{t}</button>
                      ))}
                   </div>
                </div>
                <Card className="p-10 h-[420px] flex items-center justify-center relative overflow-hidden" hoverable={false}>
                   <div className="absolute inset-x-10 bottom-12 h-64 flex items-end justify-between space-x-2">
                      {[40, 60, 45, 90, 65, 80, 100, 75, 85, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-xl shadow-lg shadow-primary/10 relative group"
                        >
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl px-2 py-1 rounded text-[8px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 border border-white/10">
                              Value: {h}%
                           </div>
                        </motion.div>
                      ))}
                   </div>
                   <div className="z-10 text-center bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                      <p className="text-white font-black text-lg tracking-tight uppercase italic mb-1 flex items-center justify-center">
                        <TrendingUp size={18} className="mr-2 text-primary" />
                        Engagement
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Real-time platform metrics</p>
                   </div>
                </Card>
             </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="mt-12">
             <Card className="p-10 relative overflow-hidden" hoverable={false}>
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500">System Activity Logs</h3>
                   <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest border border-white/5">View Detailed Logs</Button>
                </div>
                <div className="space-y-4 font-mono text-[10px] text-gray-500">
                   {[
                     { time: "12:45:02", tag: "NEW_USER", msg: "mwaka@unza.zm (Role: Student)", color: "text-blue-500" },
                     { time: "12:40:15", tag: "LISTING", msg: "MacBook Pro M1 by Mwaka Mutale", color: "text-purple-500" },
                     { time: "12:35:48", tag: "SECURITY", msg: "ADMIN_LOGIN: system_root (IP: 192.168.1.45)", color: "text-green-500" },
                     { time: "12:30:10", tag: "SYSTEM", msg: "CRON_JOB_COMPLETED: cleanup_expired_listings", color: "text-gray-400" },
                     { time: "12:25:22", tag: "ALERT", msg: "High server load (CPU: 84%)", color: "text-accent" }
                   ].map((log, i) => (
                     <div key={i} className="flex items-center space-x-6 p-3 rounded-xl hover:bg-white/2 border border-transparent hover:border-white/5 transition-all">
                        <span className="text-gray-700 whitespace-nowrap">[{log.time}]</span>
                        <span className={`font-black w-20 ${log.color}`}>{log.tag}</span>
                        <span className="flex-1 truncate">{log.msg}</span>
                        <MoreVertical size={14} className="text-gray-800" />
                     </div>
                   ))}
                </div>
             </Card>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default AdminDashboard;
