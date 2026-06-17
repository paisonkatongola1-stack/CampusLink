import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, MapPin, Star, Plus, Tag, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { MarketplaceItem } from '../types';
import { fadeInUp, staggerContainer, hoverScale, scaleUp } from '../utils/animations';
import { postMarketplaceItem } from '../utils/firebaseUtils';

const Marketplace = () => {
  const { data: dbItems } = useCollection<MarketplaceItem>('marketplace');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    category: "Electronics",
    location: "UNZA",
    description: "",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  });

  const mockItems: MarketplaceItem[] = [
    { id: '1', title: "MacBook Pro M1 2020", price: "K15,000", location: "UNZA", rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", sellerId: 'user1' },
    { id: '2', title: "Engineering Calculus 9th Ed", price: "K450", location: "CBU", rating: 4.5, category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80", sellerId: 'user2' },
    { id: '3', title: "Solid Wood Study Desk", price: "K1,200", location: "ZCAS", rating: 4.2, category: "Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a20a?auto=format&fit=crop&w=800&q=80", sellerId: 'user3' },
    { id: '4', title: "Scientific Calculator CASIO", price: "K350", location: "UNZA", rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80", sellerId: 'user4' },
  ];

  const items = dbItems.length > 0 ? dbItems : mockItems;

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All Items" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, activeCategory]);

  const handlePostItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await postMarketplaceItem({
        ...newItem,
        rating: 5.0,
      } as any);
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        setNewItem({ title: "", price: "", category: "Electronics", location: "UNZA", description: "", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80" });
      }, 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

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
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
           <Button variant="primary" className="p-4 rounded-2xl shadow-primary/30">
              <ShoppingCart size={22} strokeWidth={2.5} />
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['All Items', 'Electronics', 'Books', 'Furniture', 'Fashion', 'Services'].map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeCategory === cat ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:border-primary/40 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
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
        </AnimatePresence>
      </motion.div>

      <motion.button
        {...hoverScale}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-accent rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-accent/40 z-40 text-white"
      >
        <Plus size={32} strokeWidth={3} />
      </motion.button>

      {/* Post Item Modal */}
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
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative w-full max-w-xl glass border border-white/10 rounded-[2.5rem] p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black tracking-tight uppercase">Sell <span className="text-primary italic">Something</span></h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {success ? (
                <div className="text-center py-20">
                   <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} strokeWidth={2.5} />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Item Posted!</h3>
                   <p className="text-gray-400 font-medium">Your listing is now live on the marketplace.</p>
                </div>
              ) : (
                <form onSubmit={handlePostItem} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Item Title"
                      placeholder="e.g. iPhone 13"
                      value={newItem.title}
                      onChange={e => setNewItem({...newItem, title: e.target.value})}
                      required
                    />
                    <Input
                      label="Price (ZMW)"
                      placeholder="e.g. K5,000"
                      value={newItem.price}
                      onChange={e => setNewItem({...newItem, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Category</label>
                      <select
                        value={newItem.category}
                        onChange={e => setNewItem({...newItem, category: e.target.value})}
                        className="w-full bg-secondary border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none text-sm text-white"
                      >
                        {['Electronics', 'Books', 'Furniture', 'Fashion', 'Services'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Location"
                      placeholder="e.g. UNZA Main Campus"
                      value={newItem.location}
                      onChange={e => setNewItem({...newItem, location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Description</label>
                    <textarea
                      rows={3}
                      value={newItem.description}
                      onChange={e => setNewItem({...newItem, description: e.target.value})}
                      className="w-full bg-secondary border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none text-sm text-white placeholder:text-gray-600"
                      placeholder="Tell buyers more about the item..."
                    />
                  </div>
                  <div className="p-6 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-primary transition-colors cursor-pointer">
                     <ImageIcon size={32} className="mb-2 opacity-50" />
                     <p className="text-[10px] font-black uppercase tracking-widest">Upload Images</p>
                  </div>
                  <Button type="submit" className="w-full py-5 text-[10px] uppercase tracking-widest" isLoading={isSubmitting}>
                    List Item Now
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

export default Marketplace;
