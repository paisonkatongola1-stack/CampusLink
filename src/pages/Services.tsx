import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Phone, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { BUSINESS_CATEGORIES } from '../utils/constants';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContact, setActiveContact] = useState<any | null>(null);

  const businesses = [
    { id: 1, name: "Zed Print Hub", desc: "High-quality document printing, thesis binding, and graphic solutions near campus.", category: "Printing Services", rating: 4.8, location: "UNZA East Park, Lusaka", phone: "+260 97 111 2233", email: "info@zedprint.zm", services: ["Printing", "Binding", "Laminating"] },
    { id: 2, name: "Campus Bites & Grill", desc: "Student-friendly affordable meals, takeaway combos, and daily specials.", category: "Restaurants", rating: 4.5, location: "UNZA G-Block, Lusaka", phone: "+260 96 222 3344", email: "food@campusbites.zm", services: ["Lunch", "Dinner", "Snacks"] },
    { id: 3, name: "Tutor Me Zambia", desc: "Expert tutoring in Engineering Math, Physics, and Software Programming.", category: "Tutoring", rating: 4.9, location: "Online & Lusaka Hub", phone: "+260 95 333 4455", email: "help@tutormezambia.zm", services: ["Math", "Physics", "Coding"] },
    { id: 4, name: "The Glam Spot & Barber", desc: "Fresh fades, braids, and salon care tailored with university student discounts.", category: "Salons", rating: 4.7, location: "Riverside, Kitwe (Near CBU)", phone: "+260 97 444 5566", email: "glam@riverside.zm", services: ["Barber", "Braids", "Styling"] },
    { id: 5, name: "ZedShuttle Campus Link", desc: "Safe, scheduled group rides and campus-to-town transit for university students.", category: "Transportation", rating: 4.6, location: "Lusaka & Kitwe", phone: "+260 96 555 6677", email: "trips@zedshuttle.zm", services: ["Bus Service", "Airport Run", "Daily Route"] },
    { id: 6, name: "ByteCrafters Tech Lab", desc: "Laptop repair, OS installation, hardware upgrades, and student software licenses.", category: "Tech Services", rating: 4.9, location: "Arcades Mall, Lusaka", phone: "+260 97 666 7788", email: "repairs@bytecrafters.zm", services: ["Hardware Repair", "Data Recovery", "Software"] }
  ];

  const filtered = businesses.filter(biz => {
    const matchesCategory = selectedCategory === 'All Services' || biz.category === selectedCategory;
    const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          biz.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          biz.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Business <span className="text-primary">Directory</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Verified student-friendly businesses & services</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="relative">
           <Input
             placeholder="Search services, salons, tech..."
             icon={<Search size={20} strokeWidth={2.5} />}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="md:w-80 shadow-2xl"
           />
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {BUSINESS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              selectedCategory === cat
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                : 'glass border-white/5 text-gray-500 hover:border-primary/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filtered.map((biz) => (
          <motion.div
            key={biz.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-8 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 group relative overflow-hidden border-white/5">
               <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-black text-primary flex-shrink-0 border border-primary/20 shadow-xl z-10">
                 {biz.name.charAt(0)}
               </div>
               <div className="flex-1 z-10">
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center space-x-2">
                       <h3 className="text-xl font-bold tracking-tight text-white">{biz.name}</h3>
                       <ShieldCheck size={16} className="text-primary" />
                     </div>
                     <div className="flex items-center text-yellow-500 text-xs font-black">
                        <Star size={13} strokeWidth={3} className="mr-1 fill-yellow-500" /> {biz.rating}
                     </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed font-medium">{biz.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                     {biz.services.map(s => (
                       <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[9px] text-gray-300 font-bold uppercase tracking-wider">{s}</span>
                     ))}
                  </div>
                  <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                     <MapPin size={12} strokeWidth={2.5} className="mr-1.5 text-primary" /> {biz.location}
                  </div>
                  <div className="flex space-x-3">
                     <Button
                       onClick={() => setActiveContact({ type: 'Call', ...biz })}
                       className="flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em]"
                       variant="primary"
                       size="sm"
                     >
                       <Phone size={14} strokeWidth={2.5} className="mr-2" /> Call
                     </Button>
                     <Button
                       onClick={() => setActiveContact({ type: 'Message', ...biz })}
                       className="flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] border-white/10"
                       variant="secondary"
                       size="sm"
                     >
                       <MessageSquare size={14} strokeWidth={2.5} className="mr-2" /> Message
                     </Button>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Business Modal */}
      <AnimatePresence>
        {activeContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-3xl border border-white/10 max-w-md w-full relative"
            >
              <button onClick={() => setActiveContact(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold text-white mb-1">{activeContact.name}</h3>
              <p className="text-xs text-primary font-bold uppercase mb-6">{activeContact.category} • Verified Business</p>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-xs text-white">
                  <Phone size={16} className="text-primary" />
                  <span>{activeContact.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-white">
                  <MapPin size={16} className="text-accent" />
                  <span>{activeContact.location}</span>
                </div>
              </div>

              {activeContact.type === 'Message' ? (
                <>
                  <textarea
                    rows={3}
                    placeholder="Inquire about student pricing, hours or services..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-primary mb-4"
                    defaultValue="Hi, I'm a student at campus. Do you offer student discounts on this service?"
                  />
                  <Button onClick={() => setActiveContact(null)} className="w-full py-4 text-xs font-bold uppercase tracking-wider">
                    Send Inquiry
                  </Button>
                </>
              ) : (
                <a href={`tel:${activeContact.phone}`} className="block">
                  <Button className="w-full py-4 text-xs font-bold uppercase tracking-wider">
                    Dial Number Now
                  </Button>
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Services;
