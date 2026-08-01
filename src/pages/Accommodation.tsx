import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap, Heart, Phone, Mail, User, Navigation, X, Check } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { AccommodationListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';

interface CustomAccommodationListing extends AccommodationListing {
  genderPreference: 'Co-ed' | 'Female only' | 'Male only';
  city: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  isSelfContained: boolean;
}

const Accommodation = () => {
  const { data } = useCollection<CustomAccommodationListing>('accommodation');

  const mockListings: CustomAccommodationListing[] = [
    {
      id: '1',
      title: "Silverest Executive Lodge",
      price: "K3,500",
      distance: "500m from UNZA",
      location: "Silverest, Lusaka",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      amenities: ['wifi', 'power', 'security', 'self-contained'],
      landlordId: 'l1',
      university: 'UNZA',
      genderPreference: 'Co-ed',
      city: 'Lusaka',
      contactName: 'Mwansa Kabwe',
      contactPhone: '+260 977 123456',
      contactEmail: 'mwansa.k@campuslink.co.zm',
      isSelfContained: true
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
      university: 'CBU',
      genderPreference: 'Female only',
      city: 'Kitwe',
      contactName: 'Chileshe Mulenga',
      contactPhone: '+260 966 789012',
      contactEmail: 'c.mulenga@cbu-spaces.zm',
      isSelfContained: false
    },
    {
      id: '3',
      title: "Kabwe Heights Boarding House",
      price: "K2,400",
      distance: "1.5km from Mulungushi",
      location: "Kabwe Town",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      amenities: ['water', 'security'],
      landlordId: 'l3',
      university: 'Mulungushi',
      genderPreference: 'Male only',
      city: 'Kabwe',
      contactName: 'Bwalya Phiri',
      contactPhone: '+260 955 456789',
      contactEmail: 'bwalya.phiri@mulungushihousing.com',
      isSelfContained: false
    },
    {
      id: '4',
      title: "ZCAS Area Premium Apartments",
      price: "K4,200",
      distance: "200m from ZCAS",
      location: "ZCAS Area, Lusaka",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      amenities: ['wifi', 'power', 'security', 'self-contained'],
      landlordId: 'l4',
      university: 'ZCAS',
      genderPreference: 'Co-ed',
      city: 'Lusaka',
      contactName: 'Sarah Banda',
      contactPhone: '+260 971 987654',
      contactEmail: 'sarah.b@zcaspremium.zm',
      isSelfContained: true
    }
  ];

  const rawListings = data.length > 0 ? data : mockListings;

  // Search, active filter (category style) and saved listings states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedListings, setSavedListings] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<CustomAccommodationListing | null>(null);

  // Contact Form inside modal states
  const [formName, setFormName] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Advanced inputs states (can be toggled / customized)
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  const amenityIcons: any = {
    wifi: <Wifi size={14} strokeWidth={2.5} />,
    power: <Zap size={14} strokeWidth={2.5} />,
    security: <ShieldCheck size={14} strokeWidth={2.5} />,
    water: <Wind size={14} strokeWidth={2.5} />,
    'self-contained': <Wind size={14} strokeWidth={2.5} />
  };

  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  // Filter listings based on Search, Category filter, and advanced selectors
  const filteredListings = rawListings.filter(item => {
    // 1. Search Query Match
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.university.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Active Category Filter Match
    if (activeFilter === 'Under K3,000') {
      if (parsePrice(item.price) >= 3000) return false;
    } else if (activeFilter === 'UNZA Area') {
      if (item.university !== 'UNZA') return false;
    } else if (activeFilter === 'CBU Area') {
      if (item.university !== 'CBU') return false;
    } else if (activeFilter === 'Mulungushi') {
      if (item.university !== 'Mulungushi') return false;
    } else if (activeFilter === 'Self-contained') {
      if (!item.amenities.includes('self-contained') && !item.isSelfContained) return false;
    }

    // 3. Advanced Selectors
    if (selectedUniversity !== 'All' && item.university !== selectedUniversity) return false;
    if (selectedGender !== 'All' && item.genderPreference !== selectedGender) return false;
    if (selectedCity !== 'All' && item.city !== selectedCity) return false;

    return true;
  });

  const toggleSaveListing = (id: string) => {
    setSavedListings(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedContact(null);
      setFormName('');
      setFormMessage('');
    }, 2000);
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
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
           <Input
             placeholder="Search location or university..."
             icon={<Search size={20} strokeWidth={2.5} />}
             className="md:w-80 shadow-2xl"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
           <div className="flex space-x-2">
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl px-4 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-primary/50"
              >
                <option value="All" className="bg-[#0A0B14]">All Universities</option>
                <option value="UNZA" className="bg-[#0A0B14]">UNZA</option>
                <option value="CBU" className="bg-[#0A0B14]">CBU</option>
                <option value="Mulungushi" className="bg-[#0A0B14]">Mulungushi</option>
                <option value="ZCAS" className="bg-[#0A0B14]">ZCAS</option>
              </select>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl px-4 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-primary/50"
              >
                <option value="All" className="bg-[#0A0B14]">Gender (All)</option>
                <option value="Co-ed" className="bg-[#0A0B14]">Co-ed</option>
                <option value="Female only" className="bg-[#0A0B14]">Female Only</option>
                <option value="Male only" className="bg-[#0A0B14]">Male Only</option>
              </select>
           </div>
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

      {/* Main Grid: Listings + Map Integration Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Listings column */}
        <div className="lg:col-span-2">
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredListings.length === 0 ? (
              <div className="col-span-2 text-center py-20 glass border border-white/5 rounded-[2.5rem]">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No listings match your filter criteria</p>
              </div>
            ) : (
              filteredListings.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                >
                  <Card className="p-0 group relative overflow-hidden flex flex-col h-full" hoverable={true}>
                    <div className="relative h-64 overflow-hidden bg-white/5">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                      {/* Saved Listing Toggle Button */}
                      <button
                        onClick={() => toggleSaveListing(item.id)}
                        className="absolute top-4 left-4 p-3 rounded-2xl glass border border-white/10 text-white hover:bg-red-500 hover:border-red-500 transition-all z-10"
                      >
                        <Heart
                          size={16}
                          strokeWidth={2.5}
                          className={`${savedListings.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                        />
                      </button>

                      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-xl text-white font-black px-4 py-2 rounded-xl text-xs shadow-2xl border border-white/10">
                        {item.price}<span className="text-[10px] font-normal text-white/70">/mo</span>
                      </div>

                      <div className="absolute bottom-4 left-4 bg-[#0A0B14]/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.2em] border border-white/10">
                        {item.genderPreference}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                           <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                           <div className="flex space-x-1.5">
                             {item.amenities.map((key, idx) => (
                               <div key={idx} className="text-gray-500 hover:text-primary transition-colors cursor-help p-1 bg-white/5 rounded-lg">{amenityIcons[key] || <Zap size={12} strokeWidth={2.5} />}</div>
                             ))}
                           </div>
                        </div>
                        <div className="flex items-center text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                          <MapPin size={12} strokeWidth={2.5} className="mr-2 text-primary" /> {item.distance} • {item.location}
                        </div>
                      </div>

                      <Button
                        onClick={() => setSelectedContact(item)}
                        className="w-full py-3.5 text-[10px] font-black uppercase tracking-[0.2em]"
                        variant="primary"
                        size="md"
                      >
                        Contact Landlord
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* Map Integration Column */}
        <div className="lg:col-span-1">
          <motion.div
            variants={fadeInUp}
            className="sticky top-28 h-[600px] rounded-[2.5rem] overflow-hidden glass border border-white/5 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-primary/20 text-primary rounded-xl">
                  <Navigation size={20} strokeWidth={2.5} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">Interactive Map</h3>
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">Campus Area Navigation</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                GPS Active
              </div>
            </div>

            {/* Decorative Map Graphics */}
            <div className="flex-1 my-6 rounded-[2rem] bg-gradient-to-br from-[#0A0B14] to-[#121422] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2E5BFF_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute w-40 h-40 bg-primary/10 rounded-full filter blur-2xl top-1/4 left-1/4" />
              <div className="absolute w-40 h-40 bg-accent/5 rounded-full filter blur-2xl bottom-1/4 right-1/4" />

              <div className="relative z-10 max-w-xs">
                <Navigation size={48} strokeWidth={2.5} className="mx-auto text-primary mb-4 animate-bounce" />
                <h4 className="font-bold text-base mb-2 tracking-tight">Visualizing Listings Nearby</h4>
                <p className="text-gray-400 text-xs leading-relaxed font-medium mb-6">Explore spaces, cafes, gyms, and safety zones around UNZA, CBU, or Mulungushi.</p>
                <div className="inline-flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                  <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Map Preview Mode</span>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] text-gray-500 uppercase font-black tracking-widest leading-loose">
              Map integration uses OpenStreetMap data
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Landlord Dialog / Modal */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass border border-white/10 rounded-[2.5rem] max-w-lg w-full p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedContact(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-xl border border-primary/20">
                  Landlord Details
                </span>
                <h3 className="text-2xl font-black mt-4 tracking-tight">{selectedContact.title}</h3>
                <p className="text-gray-400 text-xs font-medium mt-1">{selectedContact.location}</p>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <h4 className="text-xl font-bold tracking-tight">Inquiry Sent Successfully!</h4>
                  <p className="text-gray-400 text-xs font-medium mt-2">The landlord has been notified and will respond via Chat shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center text-xs font-bold tracking-tight text-gray-300">
                      <User size={14} strokeWidth={2.5} className="mr-3 text-primary" /> {selectedContact.contactName} (Owner)
                    </div>
                    <div className="flex items-center text-xs font-bold tracking-tight text-gray-300">
                      <Phone size={14} strokeWidth={2.5} className="mr-3 text-primary" /> {selectedContact.contactPhone}
                    </div>
                    <div className="flex items-center text-xs font-bold tracking-tight text-gray-300">
                      <Mail size={14} strokeWidth={2.5} className="mr-3 text-primary" /> {selectedContact.contactEmail}
                    </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Your Name</label>
                    <Input
                      placeholder="Enter your name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Message</label>
                    <textarea
                      placeholder="Hi! I am highly interested in this listing. Is it still available for renting?"
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      required
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-medium text-white placeholder:text-gray-600 outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accommodation;
