import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap, X, Bookmark, Phone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { AccommodationListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import { saveItem } from '../utils/firebaseUtils';

const Accommodation = () => {
  const { user } = useAuth();
  const { data: dbListings } = useCollection<AccommodationListing>('accommodation');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

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
    {
      id: '3',
      title: "ZCAS Student Studio",
      price: "K4,200",
      distance: "200m from ZCAS",
      location: "Central, Lusaka",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      amenities: ['wifi', 'power', 'security', 'water'],
      landlordId: 'l3',
      university: 'ZCAS'
    },
  ];

  const listings = dbListings.length > 0 ? dbListings : mockListings;

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.university.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;
      if (activeFilter === "Under K3,000") {
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        matchesFilter = priceNum < 3000;
      } else if (activeFilter === "UNZA Area") {
        matchesFilter = item.university === "UNZA" || item.location.includes("Silverest");
      } else if (activeFilter === "CBU Area") {
        matchesFilter = item.university === "CBU" || item.location.includes("Kitwe");
      } else if (activeFilter === "Self-contained") {
        matchesFilter = item.amenities.includes('security'); // Proxy for premium
      }

      return matchesSearch && matchesFilter;
    });
  }, [listings, searchTerm, activeFilter]);

  const amenityIcons: any = {
    wifi: <Wifi size={14} strokeWidth={2.5} />,
    power: <Zap size={14} strokeWidth={2.5} />,
    security: <ShieldCheck size={14} strokeWidth={2.5} />,
    water: <Wind size={14} strokeWidth={2.5} />,
  };

  const handleSave = async (itemId: string) => {
    if (!user) return alert("Please login to save listings");
    try {
      await saveItem(user.uid, itemId, 'accommodation');
      alert("Listing saved successfully!");
    } catch (e) {
      console.error(e);
    }
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
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
           <Button variant="glass" className="p-3.5" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={20} strokeWidth={2.5} />
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Under K3,000', 'UNZA Area', 'CBU Area', 'Mulungushi', 'Self-contained'].map((filter, i) => (
          <button
            key={i}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeFilter === filter ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:text-white hover:border-primary/40'}`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-10">
        {/* Main Grid */}
        <div className="lg:col-span-3">
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredListings.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="p-0 group relative overflow-hidden h-full flex flex-col" hoverable={true}>
                    <div className="relative h-64 overflow-hidden bg-white/5">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                      <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-xl text-white font-black px-4 py-2 rounded-xl text-sm shadow-2xl border border-white/10">
                        {item.price}<span className="text-[10px] font-normal text-white/70">/mo</span>
                      </div>
                      <button
                        onClick={() => handleSave(item.id)}
                        className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-white hover:bg-accent transition-colors"
                      >
                        <Bookmark size={16} />
                      </button>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                         <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                         <div className="flex space-x-2">
                           {item.amenities.slice(0, 3).map((key, idx) => (
                             <div key={idx} className="text-gray-500 hover:text-primary transition-colors cursor-help">{amenityIcons[key] || <Zap size={14} strokeWidth={2.5} />}</div>
                           ))}
                         </div>
                      </div>
                      <div className="flex items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                        <MapPin size={12} strokeWidth={2.5} className="mr-2 text-primary" /> {item.distance} • {item.location}
                      </div>
                      <div className="mt-auto flex space-x-3">
                        <Button className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em]" variant="primary" size="lg">
                          Contact Landlord
                        </Button>
                        <Button variant="glass" className="p-4 border-white/5">
                           <Phone size={18} strokeWidth={2.5} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sidebar/Map Placeholder */}
        <div className="hidden lg:block space-y-10">
          <motion.div variants={fadeInUp}>
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Location View</h3>
             <div className="aspect-[3/4] glass rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <div className="relative z-10">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mb-6 mx-auto shadow-2xl shadow-primary/20"
                  >
                    <MapPin size={40} strokeWidth={2} />
                  </motion.div>
                  <h4 className="text-lg font-bold mb-2">Interactive Map</h4>
                  <p className="text-xs text-gray-500 font-medium">Coming soon: Browse accommodation using our interactive campus map.</p>
                </div>
                {/* Decorative map lines */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-1/4 left-0 w-full h-px bg-white" />
                  <div className="absolute top-2/4 left-0 w-full h-px bg-white" />
                  <div className="absolute top-3/4 left-0 w-full h-px bg-white" />
                  <div className="absolute top-0 left-1/3 w-px h-full bg-white" />
                  <div className="absolute top-0 left-2/3 w-px h-full bg-white" />
                </div>
             </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Need Help?</h3>
            <p className="text-sm text-gray-400 font-medium mb-6">Our AI assistant can help you find the best room based on your budget and university.</p>
            <Button variant="secondary" className="w-full text-[10px] uppercase tracking-widest py-3 border-white/10" onClick={() => window.location.href='/chat'}>
              Ask CampusAI
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Accommodation;
