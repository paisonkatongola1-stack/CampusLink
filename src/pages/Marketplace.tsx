import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, MapPin, Star, Plus, Tag, X, Camera, Package } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { MarketplaceItem } from '../types';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';

const Marketplace = () => {
  const { data } = useCollection<MarketplaceItem>('marketplace');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockItems: MarketplaceItem[] = [
    { id: '1', title: "MacBook Pro M1 2020", price: "K15,000", location: "UNZA", rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", sellerId: 'user1' },
    { id: '2', title: "Engineering Calculus 9th Ed", price: "K450", location: "CBU", rating: 4.5, category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80", sellerId: 'user2' },
    { id: '3', title: "Solid Wood Study Desk", price: "K1,200", location: "ZCAS", rating: 4.2, category: "Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a20a?auto=format&fit=crop&w=800&q=80", sellerId: 'user3' },
    { id: '4', title: "Scientific Calculator CASIO", price: "K350", location: "UNZA", rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80", sellerId: 'user4' },
  ];

  const items = data.length > 0 ? data : mockItems;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-10 relative"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Student <span className="text-primary">Marketplace</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Buy and sell items within the student community</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex space-x-4">
           <Input
             placeholder="Search for items..."
             icon={<Search size={20} strokeWidth={2.5} />}
             className="md:w-80 shadow-2xl"
           />
           <Button variant="primary" className="p-4 rounded-2xl shadow-primary/30">
              <ShoppingCart size={22} strokeWidth={2.5} />
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['All Items', 'Electronics', 'Books', 'Furniture', 'Fashion', 'Services'].map((cat, i) => (
          <button key={i} className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:border-primary/40 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
          >
            <Card className="h-full flex flex-col group relative overflow-hidden" hoverable={true}>
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.2em] border border-white/10 z-10">
                  {item.category}
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary z-10">
                   <Plus size={16} strokeWidth={3} />
                </button>
              </div>
              <div className="p-6 flex-1 flex flex-col relative">
                <h3 className="font-bold text-base mb-1 tracking-tight truncate">{item.title}</h3>
                <div className="text-primary font-black text-2xl mb-4 tracking-tighter">{item.price}</div>

                <div className="flex items-center justify-between text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">
                  <div className="flex items-center">
                    <MapPin size={12} strokeWidth={2.5} className="mr-1.5 text-primary" /> {item.location}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star size={12} strokeWidth={3} className="mr-1.5 fill-yellow-500" /> {item.rating}
                  </div>
                </div>

                <Button variant="glass" className="w-full mt-auto py-4 text-[10px] font-black uppercase tracking-[0.2em] border-white/5 hover:bg-primary hover:border-primary">
                  View Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        {...hoverScale}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-accent rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-accent/40 z-40 text-white"
      >
        <Plus size={32} strokeWidth={3} />
      </motion.button>

      {/* Upload Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-2xl"
             >
                <Card className="p-10 border-white/10 shadow-2xl overflow-hidden" hoverable={false}>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />

                   <div className="flex justify-between items-center mb-10">
                      <div>
                         <h2 className="text-3xl font-black tracking-tight">Upload <span className="text-primary italic">Product</span></h2>
                         <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">List your item in the student community</p>
                      </div>
                      <button onClick={() => setIsModalOpen(false)} className="p-3 glass rounded-xl border border-white/5 text-gray-500 hover:text-white transition-all">
                         <X size={24} strokeWidth={2.5} />
                      </button>
                   </div>

                   <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <Input label="Item Title" placeholder="e.g. Scientific Calculator" required />
                            <div className="grid grid-cols-2 gap-4">
                               <Input label="Price (K)" placeholder="0.00" type="number" required />
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Category</label>
                                  <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:border-primary transition-all text-white appearance-none cursor-pointer">
                                     <option className="bg-secondary">Electronics</option>
                                     <option className="bg-secondary">Books</option>
                                     <option className="bg-secondary">Furniture</option>
                                     <option className="bg-secondary">Fashion</option>
                                  </select>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Location</label>
                               <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:border-primary transition-all text-white appearance-none cursor-pointer">
                                  <option className="bg-secondary">UNZA Main Campus</option>
                                  <option className="bg-secondary">CBU Riverside</option>
                                  <option className="bg-secondary">Mulungushi Town Campus</option>
                                  <option className="bg-secondary">ZCAS Main</option>
                               </select>
                            </div>
                         </div>

                         <div className="space-y-4 flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Product Image</label>
                            <div className="flex-1 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-10 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
                               <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 mb-4 group-hover:text-primary transition-colors">
                                  <Camera size={32} strokeWidth={2.5} />
                               </div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Click to upload</p>
                               <p className="text-[9px] text-gray-700 mt-2">JPG, PNG up to 5MB</p>
                            </div>
                         </div>
                      </div>

                      <div className="pt-4">
                         <Button type="submit" className="w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20" size="lg">
                            <Package size={20} strokeWidth={2.5} className="mr-3" /> Publish Listing
                         </Button>
                      </div>
                   </form>
                </Card>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Marketplace;
