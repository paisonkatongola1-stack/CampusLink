import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Home, ShoppingBag,
  Briefcase, Calendar, MessageSquare, Cpu,
  Settings, Bell, Search, MapPin, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <User size={20} />, label: "Profile" },
    { icon: <Home size={20} />, label: "Accommodation" },
    { icon: <ShoppingBag size={20} />, label: "Marketplace" },
    { icon: <Briefcase size={20} />, label: "Jobs" },
    { icon: <Calendar size={20} />, label: "Events" },
    { icon: <MessageSquare size={20} />, label: "Messages" },
    { icon: <Cpu size={20} />, label: "AI Assistant" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0B14]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass border-r border-white/5 p-6 space-y-8 sticky top-20 h-[calc(100vh-80px)]">
        <div className="space-y-1">
          {sidebarItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-400">Welcome back, Chanda Musonda</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search everything..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-primary transition-all w-64"
              />
            </div>
            <button className="p-2 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-10"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold">
            CM
          </div>
          <div className="flex-1 text-center md:text-left space-y-1">
            <h2 className="text-2xl font-bold">Chanda Musonda</h2>
            <p className="text-primary font-medium">3rd Year, Bachelor of Computer Science</p>
            <p className="text-gray-400">University of Zambia (UNZA)</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">React.js</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">Python</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">UI/UX Design</span>
            </div>
          </div>
          <button className="px-6 py-3 glass border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">
            Edit Profile
          </button>
        </motion.div>

        {/* Widgets Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recommended Accommodation */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Recommended for You</h3>
              <Link to="/accommodation" className="text-primary text-sm hover:underline">View All</Link>
            </div>
            <div className="glass p-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group">
              <div className="aspect-video bg-white/5 rounded-xl mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Room" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">Silverest Executive Lodge</h4>
                  <div className="flex items-center text-gray-400 text-xs mt-1">
                    <MapPin size={12} className="mr-1" /> 500m from UNZA
                  </div>
                </div>
                <div className="text-primary font-bold">K3,500<span className="text-[10px] font-normal text-gray-400">/mo</span></div>
              </div>
            </div>
          </div>

          {/* New Job Openings */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">New Internships</h3>
              <Link to="/jobs" className="text-primary text-sm hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
               {[
                 { role: "Software Dev Intern", company: "Zambia Tech Hub", pay: "K4,000/mo" },
                 { role: "Marketing Assistant", company: "Zed Media", pay: "Part-time" }
               ].map((job, i) => (
                 <div key={i} className="glass p-4 rounded-2xl border border-white/10 flex items-center space-x-4">
                   <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-bold text-primary">
                     {job.company.charAt(0)}
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-sm">{job.role}</h4>
                     <p className="text-gray-400 text-xs">{job.company}</p>
                   </div>
                   <div className="text-right">
                     <div className="text-xs font-bold">{job.pay}</div>
                     <button className="text-[10px] text-primary hover:underline">Quick Apply</button>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Marketplace */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Marketplace</h3>
              <Link to="/marketplace" className="text-primary text-sm hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { title: "MacBook Pro M1", price: "K15,000", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
                 { title: "Calculus Textbook", price: "K350", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80" }
               ].map((item, i) => (
                 <div key={i} className="glass p-3 rounded-2xl border border-white/10">
                   <img src={item.img} className="w-full aspect-square object-cover rounded-xl mb-3" alt={item.title} />
                   <h4 className="font-bold text-xs truncate">{item.title}</h4>
                   <div className="text-primary font-bold text-xs">{item.price}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Upcoming Events</h3>
              <Link to="/events" className="text-primary text-sm hover:underline">View All</Link>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex flex-col items-center justify-center leading-none">
                  <span className="text-xs font-bold uppercase">Oct</span>
                  <span className="text-lg font-extrabold">24</span>
                </div>
                <div>
                  <h4 className="font-bold">Zambia Tech Expo</h4>
                  <p className="text-gray-400 text-xs">UNZA Main Hall • 09:00</p>
                </div>
              </div>
              <button className="w-full py-2 bg-primary rounded-lg text-sm font-bold hover:bg-primary-dark transition-all">
                Get Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
