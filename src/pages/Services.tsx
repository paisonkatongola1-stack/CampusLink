import { motion } from 'framer-motion';
import { Search, MapPin, Star, Phone, MessageSquare } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Services = () => {
  const businesses = [
    { id: 1, name: "Zed Print Hub", desc: "High-quality document printing and binding.", category: "Printing", rating: 4.8, location: "UNZA East Park", services: ["Printing", "Binding", "Laminating"] },
    { id: 2, name: "Campus Bites", desc: "Student-friendly affordable meals.", category: "Restaurant", rating: 4.5, location: "UNZA G-Block", services: ["Lunch", "Dinner", "Snacks"] },
    { id: 3, name: "Tutor Me Zambia", desc: "Expert tutoring in STEM subjects.", category: "Education", rating: 4.9, location: "Lusaka / Online", services: ["Math", "Physics", "Coding"] },
    { id: 4, name: "The Glam Spot", desc: "Hair and nails for students.", category: "Salon", rating: 4.2, location: "Chanda’s Mall", services: ["Hair", "Nails", "Makeup"] },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Business <span className="text-primary">Directory</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Student-friendly businesses and services</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="relative">
           <Input placeholder="Search services..." icon={<Search size={20} strokeWidth={2.5} />} className="md:w-80 shadow-2xl" />
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['All Services', 'Restaurants', 'Printing', 'Tutoring', 'Salons', 'Tech'].map((cat, i) => (
          <button key={i} className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:border-primary/40 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {businesses.map((biz, i) => (
          <motion.div
            key={biz.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-10 flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-10 group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
               <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-3xl font-black text-primary flex-shrink-0 group-hover:scale-105 transition-transform border border-primary/20 shadow-2xl shadow-primary/5 z-10">
                 {biz.name.charAt(0)}
               </div>
               <div className="flex-1 z-10">
                  <div className="flex justify-between items-start mb-3">
                     <h3 className="text-2xl font-bold tracking-tight">{biz.name}</h3>
                     <div className="flex items-center text-yellow-500 text-sm font-black">
                        <Star size={14} strokeWidth={3} className="mr-1.5 fill-yellow-500" /> {biz.rating}
                     </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed font-medium">{biz.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                     {biz.services.map(s => (
                       <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] text-gray-400 font-black uppercase tracking-widest">{s}</span>
                     ))}
                  </div>
                  <div className="flex items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                     <MapPin size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {biz.location}
                  </div>
                  <div className="flex space-x-4">
                     <Button className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em]" variant="primary" size="sm">
                       <Phone size={16} strokeWidth={2.5} className="mr-2" /> Call
                     </Button>
                     <Button className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] border-white/5" variant="secondary" size="sm">
                       <MessageSquare size={16} strokeWidth={2.5} className="mr-2" /> Message
                     </Button>
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
