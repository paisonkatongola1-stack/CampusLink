import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap, Heart, Phone, Mail, Navigation, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { AccommodationListing } from '../types';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Accommodation = () => {
  const { data } = useCollection<AccommodationListing>('accommodation');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(['1']);
  const [selectedListing, setSelectedListing] = useState<AccommodationListing | null>(null);

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
      amenities: ['wifi', 'water', 'security'],
      landlordId: 'l2',
      university: 'CBU'
    },
    {
      id: '3',
      title: "Mulungushi Scholars Haven",
      price: "K2,400",
      distance: "800m from Campus",
      location: "Great North Rd, Kabwe",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      amenities: ['wifi', 'power', 'water'],
      landlordId: 'l3',
      university: 'Mulungushi'
    },
    {
      id: '4',
      title: "Apex Medical Student Villa",
      price: "K2,900",
      distance: "400m from LAMU",
      location: "Foxdale, Lusaka",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      amenities: ['wifi', 'power', 'security', 'water'],
      landlordId: 'l4',
      university: 'Apex'
    }
  ];

  const listings = data.length > 0 ? data : mockListings;

  const toggleSave = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.university.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'Under K3,000') {
      const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
      return numericPrice < 3000;
    }
    if (selectedFilter === 'UNZA Area') return item.university === 'UNZA';
    if (selectedFilter === 'CBU Area') return item.university === 'CBU';
    if (selectedFilter === 'Mulungushi') return item.university === 'Mulungushi';
    if (selectedFilter === 'Saved') return savedIds.includes(item.id);

    return true;
  });

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

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <Input
          placeholder="Search location, university (UNZA, CBU, Mulungushi)..."
          icon={<Search size={20} strokeWidth={2.5} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-96 shadow-2xl"
        />
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
          <span>{filteredListings.length} listings found</span>
        </div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Under K3,000', 'UNZA Area', 'CBU Area', 'Mulungushi', 'Saved'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-2.5 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              selectedFilter === filter
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                : 'glass border-white/5 text-gray-500 hover:text-white hover:border-primary/40'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Map Integration Placeholder */}
      <motion.div variants={fadeInUp} className="mb-10 glass p-6 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 bg-primary/20 text-primary rounded-2xl">
            <Navigation size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Campus Proximity Map View</h4>
            <p className="text-gray-400 text-xs">Explore student accommodations mapped around UNZA, CBU, Mulungushi & ZCAS.</p>
          </div>
        </div>
        <Button variant="glass" size="sm" className="whitespace-nowrap text-xs font-bold uppercase tracking-wider">
          Open Interactive Map
        </Button>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {filteredListings.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
          >
            <Card className="p-0 group relative overflow-hidden" hoverable={true}>
              <div className="relative h-72 overflow-hidden bg-white/5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-xl text-white font-black px-4 py-2 rounded-xl text-sm shadow-2xl border border-white/10">
                  {item.price}<span className="text-[10px] font-normal text-white/70">/mo</span>
                </div>
                <button
                  onClick={() => toggleSave(item.id)}
                  className={`absolute top-4 left-4 p-2.5 rounded-xl backdrop-blur-xl border border-white/10 transition-all ${
                    savedIds.includes(item.id) ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:text-red-400'
                  }`}
                >
                  <Heart size={16} fill={savedIds.includes(item.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="p-7">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-lg font-bold tracking-tight text-white">{item.title}</h3>
                   <div className="flex space-x-2">
                     {item.amenities.map((key, idx) => (
                       <div key={idx} className="text-gray-400 hover:text-primary transition-colors">{amenityIcons[key] || <Zap size={14} strokeWidth={2.5} />}</div>
                     ))}
                   </div>
                </div>
                <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                  <MapPin size={12} strokeWidth={2.5} className="mr-1.5 text-primary flex-shrink-0" /> {item.distance} • {item.location}
                </div>
                <Button
                  onClick={() => setSelectedListing(item)}
                  className="w-full py-3.5 text-[10px] font-black uppercase tracking-[0.2em]"
                  variant="primary"
                  size="md"
                >
                  Contact Landlord
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Landlord Modal */}
      <AnimatePresence>
        {selectedListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-3xl border border-white/10 max-w-md w-full relative"
            >
              <button onClick={() => setSelectedListing(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold text-white mb-1">Contact Property Landlord</h3>
              <p className="text-xs text-primary font-bold uppercase mb-6">{selectedListing.title} ({selectedListing.price}/mo)</p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-white/5 rounded-2xl flex items-center space-x-4 border border-white/10">
                  <Phone size={20} className="text-primary" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-bold">Call Landlord</div>
                    <div className="text-sm font-bold text-white">+260 97 123 4567</div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl flex items-center space-x-4 border border-white/10">
                  <Mail size={20} className="text-accent" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-bold">Send Direct Inquiry</div>
                    <div className="text-sm font-bold text-white">housing@campuslink.zm</div>
                  </div>
                </div>
              </div>

              <textarea
                placeholder="Write your inquiry to the landlord (e.g. Can I view the room this Saturday?)..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-primary mb-6"
                defaultValue={`Hi, I'm a student interested in renting ${selectedListing.title}. Is it currently available for viewing?`}
              />

              <Button onClick={() => setSelectedListing(null)} className="w-full py-4 text-xs uppercase font-bold tracking-widest">
                Send Message
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accommodation;
