import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap, Heart, Navigation } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { AccommodationListing } from '../types';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Accommodation = () => {
  const { data } = useCollection<AccommodationListing>('accommodation');
  const [savedListings, setSavedListings] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedListings(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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

      <div className="grid lg:grid-cols-4 gap-10">
        <motion.div
          variants={staggerContainer}
          className="lg:col-span-3 grid md:grid-cols-2 gap-10"
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
                <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-xl text-white font-black px-4 py-2 rounded-xl text-sm shadow-2xl border border-white/10">
                  {item.price}<span className="text-[10px] font-normal text-white/70">/mo</span>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); toggleSave(item.id); }}
                  className={`absolute top-6 left-6 p-2.5 rounded-xl backdrop-blur-xl border border-white/10 transition-all ${savedListings.includes(item.id) ? 'bg-accent text-white' : 'bg-black/40 text-white hover:bg-white/20'}`}
                >
                  <Heart size={18} strokeWidth={2.5} className={savedListings.includes(item.id) ? 'fill-current' : ''} />
                </button>
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

        {/* Map Placeholder */}
        <motion.div variants={fadeInUp} className="hidden lg:block lg:col-span-1">
           <div className="sticky top-28">
              <Card className="p-0 overflow-hidden h-[600px] relative border-white/5 bg-[#0F111A]" hoverable={false}>
                 <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/28.28, -15.42,10/400x600?access_token=pk.xxx')] bg-cover bg-center opacity-40" />
                 <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-black/80" />

                 <div className="relative z-10 h-full flex flex-col items-center justify-center p-10 text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center text-primary mb-6 shadow-2xl border border-primary/20 animate-pulse">
                       <Navigation size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-tight">Interactive Map</h3>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8">View all listings and their proximity to {mockListings[0].university} on an interactive map.</p>
                    <Button variant="glass" className="w-full border-white/10">
                       Enable Location
                    </Button>
                 </div>

                 {/* Decorative Map Pins */}
                 {[
                   { t: '20%', l: '30%' },
                   { t: '45%', l: '65%' },
                   { t: '70%', l: '40%' },
                 ].map((pos, i) => (
                   <div key={i} className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-[0_0_15px_rgba(46,91,255,1)] animate-bounce" style={{ top: pos.t, left: pos.l, animationDelay: `${i * 0.5}s` }} />
                 ))}
              </Card>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Accommodation;
