import { motion } from 'framer-motion';
import { Search, MapPin, Star, Phone, MessageSquare, Filter, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';

const Services = () => {
  const businesses = [
    { id: 1, name: "Zed Print Hub", desc: "High-quality document printing and binding for students.", category: "Printing", rating: 4.8, location: "UNZA East Park", services: ["Printing", "Binding", "Laminating"], verified: true },
    { id: 2, name: "Campus Bites", desc: "Student-friendly affordable meals and snacks.", category: "Restaurant", rating: 4.5, location: "UNZA G-Block", services: ["Lunch", "Dinner", "Snacks"], verified: true },
    { id: 3, name: "Tutor Me Zambia", desc: "Expert tutoring in STEM subjects and coding.", category: "Education", rating: 4.9, location: "Lusaka / Online", services: ["Math", "Physics", "Coding"], verified: true },
    { id: 4, name: "The Glam Spot", desc: "Professional hair and nail services for students.", category: "Salon", rating: 4.2, location: "Chanda’s Mall", services: ["Hair", "Nails", "Makeup"], verified: false },
    { id: 5, name: "Express Laundry", desc: "Fast and reliable laundry services near campus.", category: "Laundry", rating: 4.6, location: "Marshlands", services: ["Wash", "Dry", "Iron"], verified: true },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-6 md:space-y-0">
        <motion.div variants={fadeInUp}>
          <h1 className="text-5xl font-black mb-2 tracking-tight uppercase italic">Business <span className="text-primary italic-none">Directory</span></h1>
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Premium services for the modern student</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex space-x-4">
           <Input placeholder="Search services..." icon={<Search size={20} strokeWidth={2.5} />} className="md:w-80 shadow-2xl" />
           <Button variant="glass" className="p-4 border-white/5">
              <Filter size={20} strokeWidth={2.5} />
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['All Services', 'Restaurants', 'Printing', 'Tutoring', 'Salons', 'Tech', 'Laundry'].map((cat, i) => (
          <button key={i} className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:border-primary/40 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {businesses.map((biz, i) => (
          <motion.div
            key={biz.id}
            variants={fadeInUp}
          >
            <Card className="p-10 flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12 group relative overflow-hidden" hoverable={true}>
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
               <div className="w-28 h-28 bg-surface-bright rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-primary flex-shrink-0 group-hover:scale-105 transition-transform border border-white/5 shadow-2xl z-10 relative">
                 {biz.name.charAt(0)}
                 {biz.verified && (
                   <div className="absolute -bottom-2 -right-2 p-1.5 bg-primary rounded-full border-4 border-[#0A0B14] shadow-lg">
                      <ShieldCheck size={14} strokeWidth={3} className="text-white" />
                   </div>
                 )}
               </div>
               <div className="flex-1 z-10">
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{biz.name}</h3>
                     <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20">
                        <Star size={14} strokeWidth={3} className="mr-1.5 fill-yellow-500" />
                        <span className="text-xs font-black">{biz.rating}</span>
                     </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed font-medium line-clamp-2">{biz.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                     {biz.services.map(s => (
                       <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] text-gray-400 font-black uppercase tracking-widest hover:border-primary/40 hover:text-white transition-colors cursor-default">{s}</span>
                     ))}
                  </div>
                  <div className="flex items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                     <MapPin size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {biz.location}
                  </div>
                  <div className="flex space-x-4">
                     <motion.button {...hoverScale} className="flex-1 py-4 bg-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center shadow-lg shadow-primary/20">
                       <Phone size={16} strokeWidth={2.5} className="mr-2" /> Call
                     </motion.button>
                     <motion.button {...hoverScale} className="flex-1 py-4 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center hover:bg-white/5">
                       <MessageSquare size={16} strokeWidth={2.5} className="mr-2" /> Message
                     </motion.button>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
