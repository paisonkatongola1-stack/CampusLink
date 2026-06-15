import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, MapPin, Home, Zap, ShieldCheck, Wifi, Wind } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { postAccommodation } from '../utils/firebaseUtils';

interface PostAccommodationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostAccommodationModal: React.FC<PostAccommodationModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    distance: '',
    university: 'UNZA',
    description: '',
    amenities: [] as string[]
  });

  const amenitiesList = [
    { id: 'wifi', icon: <Wifi size={16} />, label: 'WiFi' },
    { id: 'power', icon: <Zap size={16} />, label: '24/7 Power' },
    { id: 'security', icon: <ShieldCheck size={16} />, label: 'Security' },
    { id: 'water', icon: <Wind size={16} />, label: 'Water' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postAccommodation({
        ...formData,
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', // Default placeholder
      });
      onClose();
    } catch (error) {
      console.error("Error posting accommodation:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (id: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id]
    }));
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
            className="relative w-full max-w-2xl glass rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-black tracking-tight uppercase italic">List <span className="text-primary italic-none">Property</span></h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Listing Title"
                  placeholder="e.g. Silverest Executive Lodge"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
                <Input
                  label="Monthly Rent (ZMW)"
                  placeholder="e.g. K3,500"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Location"
                  placeholder="e.g. Silverest, Lusaka"
                  icon={<MapPin size={18} />}
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required
                />
                <Input
                  label="Distance from Campus"
                  placeholder="e.g. 500m from UNZA"
                  value={formData.distance}
                  onChange={e => setFormData({...formData, distance: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Target University</label>
                <select
                  className="w-full bg-secondary border border-white/10 rounded-xl py-3 px-4 focus:border-primary transition-all outline-none text-sm text-white"
                  value={formData.university}
                  onChange={e => setFormData({...formData, university: e.target.value})}
                >
                  <option>UNZA</option>
                  <option>CBU</option>
                  <option>Mulungushi</option>
                  <option>ZCAS</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenitiesList.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAmenity(item.id)}
                      className={`p-3 rounded-xl border flex items-center space-x-2 transition-all ${
                        formData.amenities.includes(item.id)
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-white/5 border-white/10 text-gray-400'
                      }`}
                    >
                      {item.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/40 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="text-sm font-bold">Upload Property Photos</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <Button type="submit" className="w-full py-5 text-[10px] uppercase tracking-[0.2em]" isLoading={loading}>
                Submit Listing for Approval
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostAccommodationModal;
