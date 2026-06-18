import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap, Heart, MessageCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { AccommodationListing } from '../types';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';

const Accommodation = () => {
  const { data } = useCollection<AccommodationListing>('accommodation');

  const mockListings: AccommodationListing[] = [
    {
      id: '1',
      title: "Silverest Executive Lodge",
      price: "K3,500",
      distance: "500m from UNZA",
      location: "Silverest, Lusaka",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"],
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
      images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"],
      amenities: ['wifi', 'water'],
      landlordId: 'l2',
      university: 'CBU'
    },
    {
      id: '3',
      title: "Marshlands Student Heights",
      price: "K4,200",
      distance: "200m from UNZA",
      location: "Marshlands, Lusaka",
      images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"],
      amenities: ['wifi', 'power', 'security', 'water'],
      landlordId: 'l3',
      university: 'UNZA'
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-6 md:space-y-0">
        <motion.div variants={fadeInUp}>
          <h1 className="text-5xl font-black mb-2 tracking-tight uppercase italic">Accommodation <span className="text-primary italic-none">Finder</span></h1>
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Find verified student housing near your campus</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex space-x-4">
           <Input
             placeholder="Search location or university..."
             icon={<Search size={20} strokeWidth={2.5} />}
             className="md:w-80 shadow-2xl"
           />
           <Button variant="glass" className="p-4 border-white/5">
              <Filter size={20} strokeWidth={2.5} />
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Under K3,000', 'UNZA Area', 'CBU Area', 'Mulungushi', 'Self-contained'].map((filter, i) => (
          <button key={i} className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:text-white hover:border-primary/40'}`}>
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
            <Card className="p-0 group relative overflow-hidden h-full flex flex-col" hoverable={true}>
              <div className="relative h-72 overflow-hidden bg-white/5">
                <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-6 left-6 z-10 flex space-x-2">
                   {item.amenities.map((key, idx) => (
                     <div key={idx} className="p-2 bg-black/40 backdrop-blur-xl rounded-xl text-white border border-white/10 shadow-lg" title={key}>
                        {amenityIcons[key] || <Zap size={14} strokeWidth={2.5} />}
                     </div>
                   ))}
                </div>

                <div className="absolute top-6 right-6 z-10">
                   <motion.button {...hoverScale} className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl text-white border border-white/10 hover:bg-red-500 transition-all group/heart">
                      <Heart size={18} strokeWidth={2.5} className="group-hover/heart:fill-white" />
                   </motion.button>
                </div>

                <div className="absolute bottom-6 left-6 z-10">
                   <div className="bg-primary/90 backdrop-blur-xl text-white font-black px-5 py-2.5 rounded-xl text-sm shadow-2xl border border-white/10">
                     {item.price}<span className="text-[10px] font-normal text-white/70 ml-1">/mo</span>
                   </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">{item.title}</h3>

                <div className="flex items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                  <MapPin size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {item.distance} • {item.location}
                </div>

                <div className="mt-auto flex space-x-4">
                  <Button className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em]" variant="primary" size="lg">
                    <MessageCircle size={16} className="mr-2" /> Contact
                  </Button>
                  <Button className="py-4 px-6 glass border-white/5" variant="secondary" size="lg">
                    View
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

export default Accommodation;
