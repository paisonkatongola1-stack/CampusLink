import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap, Heart, Map as MapIcon } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { AccommodationListing } from '../types';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Accommodation = () => {
  const { data } = useCollection<AccommodationListing>('accommodation');

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

      <div className="grid lg:grid-cols-3 gap-12 mb-12">
        <motion.div
          variants={staggerContainer}
          className="lg:col-span-2 grid md:grid-cols-2 gap-10"
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
                  <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-xl text-white font-black px-4 py-2 rounded-xl text-sm shadow-2xl border border-white/10">
                    {item.price}<span className="text-[10px] font-normal text-white/70">/mo</span>
                  </div>
                  <button className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-red-500 transition-all z-10">
                    <Heart size={18} strokeWidth={2.5} />
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
        <motion.div variants={fadeInUp} className="hidden lg:block">
           <Card className="sticky top-28 p-0 h-[600px] overflow-hidden bg-white/2 border-white/5 flex flex-col items-center justify-center text-center group" hoverable={false}>
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="relative z-10 p-10">
                 <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mb-8 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-primary/10">
                    <MapIcon size={40} strokeWidth={2.5} />
                 </div>
                 <h3 className="text-2xl font-black mb-4 tracking-tight">Interactive Map</h3>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10 max-w-xs mx-auto">Visualize listings near UNZA, CBU and other campuses across Zambia</p>
                 <Button variant="glass" className="px-10">Enable Location</Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent" />
           </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Accommodation;
