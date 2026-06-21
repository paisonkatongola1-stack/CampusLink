import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap, Heart, Map as MapIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { AccommodationListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';

const Accommodation = () => {
  const { data } = useCollection<AccommodationListing>('accommodation');
  const [showMap, setShowMap] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const mockListings: AccommodationListing[] = [
    {
      id: '1',
      title: "Silverest Executive Lodge",
      price: "K3,500",
      distance: "500m from UNZA",
      location: "Silverest, Lusaka",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      amenities: ['wifi', 'power', 'security'],
      landlordId: 'l1',
      university: 'UNZA'
    },
    {
      id: '2',
      title: "CBU Modern Hostels",
      price: "K2,800",
      distance: "1km from CBU",
      location: "Riverside, Kitwe",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
      amenities: ['wifi', 'water'],
      landlordId: 'l2',
      university: 'CBU'
    },
  ];

  const listings = data.length > 0 ? data : mockListings;

  const amenityIcons: any = {
    wifi: <Wifi size={14} strokeWidth={2.5} />,
    power: <Zap size={14} strokeWidth={2.5} />,
    security: <ShieldCheck size={14} strokeWidth={2.5} />,
    water: <Wind size={14} strokeWidth={2.5} />,
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Accommodation <span className="text-primary">Finder</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Find verified student housing near your campus</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex space-x-4">
           <Input
             placeholder="Search location or university..."
             icon={<Search size={20} strokeWidth={2.5} />}
             className="md:w-80 shadow-2xl"
           />
           <Button variant="glass" className="p-3.5">
              <Filter size={20} strokeWidth={2.5} />
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Under K3,000', 'UNZA Area', 'CBU Area', 'Mulungushi', 'Self-contained'].map((filter, i) => (
          <button key={i} className={`px-6 py-2.5 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:text-white hover:border-primary/40'}`}>
            {filter}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {listings.map((item, i) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
          >
            <Card className="p-0 group relative overflow-hidden" hoverable={true}>
              <div className="relative h-72 overflow-hidden bg-white/5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                <button
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-6 left-6 p-3 glass rounded-full border border-white/10 z-10 transition-all hover:scale-110"
                >
                  <Heart size={18} className={saved.includes(item.id) ? "fill-accent text-accent" : "text-white"} />
                </button>

                <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-xl text-white font-black px-4 py-2 rounded-xl text-sm shadow-2xl border border-white/10">
                  {item.price}<span className="text-[10px] font-normal text-white/70">/mo</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                   <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                   <div className="flex space-x-2">
                     {item.amenities.map((key, idx) => (
                       <div key={idx} className="text-gray-500 hover:text-primary transition-colors cursor-help">{amenityIcons[key] || <Zap size={14} strokeWidth={2.5} />}</div>
                     ))}
                   </div>
                </div>
                <div className="flex items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                  <MapPin size={12} strokeWidth={2.5} className="mr-2 text-primary" /> {item.distance} • {item.location}
                </div>
                <Button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em]" variant="primary" size="lg">
                  Contact Landlord
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Map Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMap(true)}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-primary px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/40 z-40 flex items-center space-x-3"
      >
        <MapIcon size={18} strokeWidth={2.5} />
        <span>Open Map View</span>
      </motion.button>

      {/* Map Modal Placeholder */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-5xl h-[80vh] glass border border-white/10 rounded-[3rem] overflow-hidden relative shadow-2xl"
            >
              <div className="absolute top-8 right-8 z-10">
                <button
                  onClick={() => setShowMap(false)}
                  className="p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-red-500 transition-all"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20 shadow-2xl">
                    <MapIcon size={40} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-black mb-4 tracking-tight">Interactive Map</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">Map functionality is currently in development.</p>
                </div>
              </div>

              {/* Decorative Map Elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full blur-sm" />
                 <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-accent rounded-full blur-xs" />
                 <div className="absolute top-1/2 right-1/2 w-5 h-5 bg-blue-500 rounded-full blur-md" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accommodation;
