import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Tag, ShoppingBag, MapPin, DollarSign } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { postMarketplaceItem } from '../utils/firebaseUtils';

interface PostMarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostMarketplaceModal: React.FC<PostMarketplaceModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Electronics',
    location: '',
    description: ''
  });

  const categories = ['Electronics', 'Books', 'Furniture', 'Fashion', 'Services'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postMarketplaceItem({
        ...formData,
        rating: 5.0, // Initial rating
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', // Placeholder
        status: 'pending'
      });
      onClose();
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl glass rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-black tracking-tight uppercase italic">Post <span className="text-primary italic-none">Product</span></h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              <Input
                label="Product Name"
                placeholder="e.g. MacBook Pro M1"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Price (ZMW)"
                  placeholder="e.g. K15,000"
                  icon={<DollarSign size={18} />}
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  required
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Category</label>
                  <select
                    className="w-full bg-secondary border border-white/10 rounded-xl py-3 px-4 focus:border-primary transition-all outline-none text-sm text-white"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <Input
                label="Pickup Location"
                placeholder="e.g. UNZA East Park"
                icon={<MapPin size={18} />}
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                required
              />

              <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/40 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                  <Upload size={32} />
                </div>
                <p className="text-sm font-bold">Upload Product Image</p>
              </div>

              <Button type="submit" className="w-full py-5 text-[10px] uppercase tracking-[0.2em]" isLoading={loading}>
                List Product
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostMarketplaceModal;
