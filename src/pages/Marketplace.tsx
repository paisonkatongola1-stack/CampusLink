import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, MapPin, Star, Plus, Tag, X, Upload } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { MarketplaceItem } from '../types';
import { fadeInUp, staggerContainer, hoverScale, scaleUp } from '../utils/animations';
import { uploadFile, postMarketplaceItem } from '../utils/firebaseUtils';

const Marketplace = () => {
  const { data } = useCollection<MarketplaceItem>('marketplace');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Electronics',
    location: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

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

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-lg glass border border-white/10 rounded-[2.5rem] p-10 relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={2.5} />
              </button>

              <h2 className="text-3xl font-black mb-8 tracking-tight italic">List <span className="text-primary italic-none">Product</span></h2>

              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  let imageUrl = '';
                  if (imageFile) {
                    imageUrl = await uploadFile('marketplace', imageFile);
                  }
                  await postMarketplaceItem({
                    ...formData,
                    image: imageUrl,
                    rating: 5.0,
                  });
                  setIsModalOpen(false);
                  setFormData({ title: '', price: '', category: 'Electronics', location: '' });
                  setImageFile(null);
                } catch (err) {
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              }}>
                <Input
                  label="Product Title"
                  placeholder="e.g. MacBook Pro M1"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Price (ZMW)"
                    placeholder="e.g. K15,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm font-medium appearance-none"
                    >
                      {['Electronics', 'Books', 'Furniture', 'Fashion', 'Services'].map(cat => (
                        <option key={cat} value={cat} className="bg-[#0A0B14]">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Input
                  label="Location"
                  placeholder="e.g. UNZA Main Campus"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Product Image</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-primary/40 hover:bg-white/5 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload size={24} className="text-gray-500 mb-2" />
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                        {imageFile ? imageFile.name : 'Click to upload image'}
                      </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  </label>
                </div>

                <Button type="submit" className="w-full py-5 text-[10px] uppercase tracking-[0.2em]" isLoading={loading}>
                  Upload Product
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Marketplace;
