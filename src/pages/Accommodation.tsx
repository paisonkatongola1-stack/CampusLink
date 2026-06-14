import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Wind, Wifi, ShieldCheck, Zap } from 'lucide-react';

const Accommodation = () => {
  const listings = [
    {
      id: 1,
      title: "Silverest Executive Lodge",
      price: "K3,500",
      distance: "500m from UNZA",
      location: "Silverest, Lusaka",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      amenities: [<Zap size={14} />, <Wifi size={14} />, <ShieldCheck size={14} />]
    },
    {
      id: 2,
      title: "CBU Modern Hostels",
      price: "K2,800",
      distance: "1km from CBU",
      location: "Riverside, Kitwe",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
      amenities: [<Wifi size={14} />, <Wind size={14} />]
    },
    {
      id: 3,
      title: "Apex Student Village",
      price: "K4,200",
      distance: "200m from Apex",
      location: "Chalala, Lusaka",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      amenities: [<Zap size={14} />, <Wifi size={14} />, <ShieldCheck size={14} />, <Wind size={14} />]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Accommodation Finder</h1>
          <p className="text-gray-400">Find verified student housing near your campus</p>
        </div>
        <div className="flex space-x-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search location or university..."
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all w-full md:w-80"
              />
           </div>
           <button className="p-3 glass rounded-2xl border border-white/10 hover:bg-white/5 transition-all">
              <Filter size={20} />
           </button>
        </div>
      </div>

      {/* Categories / Filters */}
      <div className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Under K3,000', 'UNZA Area', 'CBU Area', 'Mulungushi', 'Self-contained'].map((filter, i) => (
          <button key={i} className={`px-6 py-2 rounded-full whitespace-nowrap border ${i === 0 ? 'bg-primary border-primary' : 'glass border-white/10 text-gray-400'}`}>
            {filter}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl overflow-hidden border border-white/10 group hover:border-primary/50 transition-all"
          >
            <div className="relative h-64">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
              <div className="absolute top-4 right-4 bg-primary text-white font-bold px-4 py-1 rounded-full text-sm">
                {item.price}<span className="text-[10px] font-normal">/mo</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold">{item.title}</h3>
                 <div className="flex space-x-2">
                   {item.amenities.map((icon, idx) => (
                     <div key={idx} className="text-gray-400">{icon}</div>
                   ))}
                 </div>
              </div>
              <div className="flex items-center text-gray-400 text-sm mb-6">
                <MapPin size={14} className="mr-1 text-primary" /> {item.distance} • {item.location}
              </div>
              <button className="w-full py-4 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
                Contact Landlord
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
