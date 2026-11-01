import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, MapPin, Star, Plus, X, Tag, UserCheck, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { MarketplaceItem } from '../types';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';
import { MARKETPLACE_CATEGORIES } from '../utils/constants';

const Marketplace = () => {
  const { data } = useCollection<MarketplaceItem>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  // Upload modal state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [location, setLocation] = useState('UNZA');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80');

  const [localItems, setLocalItems] = useState<MarketplaceItem[]>([
    { id: '1', title: "MacBook Pro M1 2020", price: "K15,000", location: "UNZA", rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", sellerId: 'user1' },
    { id: '2', title: "Engineering Calculus 9th Ed", price: "K450", location: "CBU", rating: 4.5, category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80", sellerId: 'user2' },
    { id: '3', title: "Solid Wood Study Desk", price: "K1,200", location: "ZCAS", rating: 4.2, category: "Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a20a?auto=format&fit=crop&w=800&q=80", sellerId: 'user3' },
    { id: '4', title: "Scientific Calculator CASIO", price: "K350", location: "UNZA", rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80", sellerId: 'user4' },
    { id: '5', title: "Campus Hoodie (Warm Grey)", price: "K300", location: "Mulungushi", rating: 4.6, category: "Fashion", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80", sellerId: 'user5' },
    { id: '6', title: "Resume & CV Formatting", price: "K150", location: "Remote / Lusaka", rating: 5.0, category: "Services", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80", sellerId: 'user6' }
  ]);

  const allItems = data.length > 0 ? data : localItems;

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;
    const newItem: MarketplaceItem = {
      id: Date.now().toString(),
      title,
      price: price.startsWith('K') ? price : `K${price}`,
      location,
      rating: 5.0,
      category,
      image,
      sellerId: 'current-user'
    };
    setLocalItems([newItem, ...localItems]);
    setIsModalOpen(false);
    setTitle('');
    setPrice('');
  };

  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'All Items' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
             placeholder="Search items, textbooks, gadgets..."
             icon={<Search size={20} strokeWidth={2.5} />}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="md:w-80 shadow-2xl"
           />
           <Button onClick={() => setIsModalOpen(true)} variant="primary" className="px-5 rounded-2xl flex items-center space-x-2 text-xs font-bold uppercase tracking-wider">
              <Plus size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">Upload Product</span>
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {MARKETPLACE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              selectedCategory === cat
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                : 'glass border-white/5 text-gray-500 hover:border-primary/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
          >
            <Card className="h-full flex flex-col group relative overflow-hidden p-0 border-white/5" hoverable={true}>
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.2em] border border-white/10 z-10">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-base mb-1 tracking-tight truncate text-white">{item.title}</h3>
                <div className="text-primary font-black text-2xl mb-4 tracking-tighter">{item.price}</div>

                <div className="flex items-center justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <div className="flex items-center">
                    <MapPin size={12} strokeWidth={2.5} className="mr-1.5 text-primary" /> {item.location}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star size={12} strokeWidth={3} className="mr-1.5 fill-yellow-500" /> {item.rating}
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedItem(item)}
                  variant="glass"
                  className="w-full mt-auto py-3 text-[10px] font-black uppercase tracking-[0.2em] border-white/5 hover:bg-primary hover:border-primary"
                >
                  Contact Seller
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Action Button */}
      <motion.button
        {...hoverScale}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-14 h-14 bg-accent rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-accent/40 z-40 text-white"
        title="Upload Product"
      >
        <Plus size={28} strokeWidth={3} />
      </motion.button>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-3xl border border-white/10 max-w-md w-full relative"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <div className="h-48 rounded-2xl overflow-hidden mb-4">
                <img src={selectedItem.image} className="w-full h-full object-cover" alt={selectedItem.title} />
              </div>
              <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-xl font-bold uppercase">{selectedItem.category}</span>
              <h3 className="text-xl font-black text-white mt-2">{selectedItem.title}</h3>
              <div className="text-2xl font-black text-primary my-2">{selectedItem.price}</div>
              <p className="text-xs text-gray-300 font-medium mb-4">Location: {selectedItem.location} • Verified Student Seller (4.8 ★)</p>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCheck size={20} className="text-primary" />
                  <span className="text-xs font-bold text-white">Direct Student Message</span>
                </div>
                <span className="text-[10px] text-green-400 font-bold uppercase">Online Now</span>
              </div>

              <textarea
                rows={3}
                defaultValue={`Hi! I am interested in buying your ${selectedItem.title}. Can we arrange a pickup on campus?`}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-primary mb-6"
              />

              <Button onClick={() => setSelectedItem(null)} className="w-full py-4 text-xs font-bold uppercase tracking-wider">
                <MessageSquare size={16} className="mr-2" /> Send Message to Seller
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-3xl border border-white/10 max-w-lg w-full relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-black text-white mb-2">Upload Product</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Sell electronics, textbooks, furniture & gear</p>

              <form onSubmit={handleUpload} className="space-y-4">
                <Input
                  label="Product Title"
                  placeholder="e.g. MacBook Air M2 2022"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Price (ZMW)"
                    placeholder="e.g. K4,500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-2xl p-3.5 text-xs text-white outline-none focus:border-primary"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Books">Books</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Campus Location"
                    placeholder="e.g. UNZA Great East Rd"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <Input
                    label="Image URL"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" className="w-full py-4 text-xs font-bold uppercase tracking-wider">
                    Publish Listing
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Marketplace;
