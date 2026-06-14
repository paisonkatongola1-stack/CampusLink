import { motion } from 'framer-motion';
import { Search, MapPin, Star, Phone, MessageSquare } from 'lucide-react';

const Services = () => {
  const businesses = [
    { id: 1, name: "Zed Print Hub", desc: "High-quality document printing and binding.", category: "Printing", rating: 4.8, location: "UNZA East Park", services: ["Printing", "Binding", "Laminating"] },
    { id: 2, name: "Campus Bites", desc: "Student-friendly affordable meals.", category: "Restaurant", rating: 4.5, location: "UNZA G-Block", services: ["Lunch", "Dinner", "Snacks"] },
    { id: 3, name: "Tutor Me Zambia", desc: "Expert tutoring in STEM subjects.", category: "Education", rating: 4.9, location: "Lusaka / Online", services: ["Math", "Physics", "Coding"] },
    { id: 4, name: "The Glam Spot", desc: "Hair and nails for students.", category: "Salon", rating: 4.2, location: "Chanda’s Mall", services: ["Hair", "Nails", "Makeup"] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Business Directory</h1>
          <p className="text-gray-400">Student-friendly businesses and services</p>
        </div>
        <div className="relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
           <input type="text" placeholder="Search services..." className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all w-full md:w-80" />
        </div>
      </div>

      <div className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All Services', 'Restaurants', 'Printing', 'Tutoring', 'Salons', 'Tech'].map((cat, i) => (
          <button key={i} className={`px-6 py-2 rounded-full whitespace-nowrap border ${i === 0 ? 'bg-primary border-primary' : 'glass border-white/10 text-gray-400 hover:border-primary/50'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {businesses.map((biz, i) => (
          <motion.div
            key={biz.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 hover:border-primary/30 transition-all group"
          >
             <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
               {biz.name.charAt(0)}
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold">{biz.name}</h3>
                   <div className="flex items-center text-yellow-500 text-sm">
                      <Star size={14} className="mr-1 fill-yellow-500" /> {biz.rating}
                   </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{biz.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                   {biz.services.map(s => (
                     <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-300 uppercase tracking-wider">{s}</span>
                   ))}
                </div>
                <div className="flex items-center text-gray-500 text-xs mb-6">
                   <MapPin size={14} className="mr-2 text-primary" /> {biz.location}
                </div>
                <div className="flex space-x-3">
                   <button className="flex-1 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                     <Phone size={14} className="mr-2" /> Call
                   </button>
                   <button className="flex-1 py-3 glass border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-all flex items-center justify-center">
                     <MessageSquare size={14} className="mr-2" /> Message
                   </button>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
