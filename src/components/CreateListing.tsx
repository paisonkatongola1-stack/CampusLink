import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { addListing, uploadFile } from '../utils/firebaseUtils';
import { auth } from '../firebase';
import { fadeInUp, scaleUp } from '../utils/animations';

interface CreateListingProps {
  type: 'accommodation' | 'marketplace' | 'jobs' | 'events';
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateListing: React.FC<CreateListingProps> = ({ type, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFile(`listings/${type}/${Date.now()}_${imageFile.name}`, imageFile);
      }

      await addListing(type, {
        ...formData,
        image: imageUrl || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        postedBy: auth.currentUser?.uid,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (type) {
      case 'accommodation':
        return (
          <>
            <Input label="Property Title" name="title" placeholder="e.g. Silverest Executive Lodge" onChange={handleInputChange} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Monthly Rent (ZMW)" name="price" placeholder="e.g. K3,500" onChange={handleInputChange} required />
              <Input label="Distance from Campus" name="distance" placeholder="e.g. 500m" onChange={handleInputChange} required />
            </div>
            <Input label="Location" name="location" placeholder="e.g. Silverest, Lusaka" onChange={handleInputChange} required />
            <Input label="University" name="university" placeholder="e.g. UNZA" onChange={handleInputChange} required />
          </>
        );
      case 'marketplace':
        return (
          <>
            <Input label="Item Name" name="title" placeholder="e.g. MacBook Pro M1" onChange={handleInputChange} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Price (ZMW)" name="price" placeholder="e.g. K15,000" onChange={handleInputChange} required />
              <Input label="Category" name="category" placeholder="e.g. Electronics" onChange={handleInputChange} required />
            </div>
            <Input label="Location" name="location" placeholder="e.g. UNZA" onChange={handleInputChange} required />
          </>
        );
      case 'jobs':
        return (
          <>
            <Input label="Job Role" name="role" placeholder="e.g. Software Dev Intern" onChange={handleInputChange} required />
            <Input label="Company Name" name="company" placeholder="e.g. Zambia Tech Hub" onChange={handleInputChange} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Salary/Pay" name="salary" placeholder="e.g. K4,000/mo" onChange={handleInputChange} required />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Job Type</label>
                <select name="type" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-primary transition-all text-white" required>
                  <option value="Internship">Internship</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
            <Input label="Location" name="location" placeholder="e.g. Lusaka / Remote" onChange={handleInputChange} required />
          </>
        );
      case 'events':
        return (
          <>
            <Input label="Event Name" name="title" placeholder="e.g. Zambia Tech Expo" onChange={handleInputChange} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Date" name="date" type="date" onChange={handleInputChange} required />
              <Input label="Time" name="time" type="time" onChange={handleInputChange} required />
            </div>
            <Input label="Venue" name="venue" placeholder="e.g. UNZA Main Hall" onChange={handleInputChange} required />
            <Input label="Organizer" name="organizer" placeholder="e.g. ICT Association" onChange={handleInputChange} required />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="relative w-full max-w-xl z-10"
      >
        <Card className="p-8 lg:p-12 overflow-hidden max-h-[90vh] flex flex-col" hoverable={false}>
          <div className="flex justify-between items-center mb-8 flex-shrink-0">
            <div>
              <h2 className="text-3xl font-black tracking-tight uppercase">Post <span className="text-primary">{type}</span></h2>
              <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Create a new listing for the community</p>
            </div>
            <button onClick={onClose} className="p-3 glass rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto no-scrollbar pr-2">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold flex items-center">
                <AlertCircle size={16} className="mr-3" /> {error}
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Listing Image</label>
              <div className="relative h-48 w-full glass border border-white/10 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all overflow-hidden group">
                {imageFile ? (
                   <img src={URL.createObjectURL(imageFile)} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <>
                    <Upload size={32} className="text-gray-600 mb-3 group-hover:text-primary transition-colors" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">Upload Cover Image</p>
                  </>
                )}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
              </div>
            </div>

            {renderFields()}

            <Button
              type="submit"
              className="w-full py-5 text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20"
              isLoading={loading}
              size="lg"
            >
              <Plus size={18} strokeWidth={3} className="mr-2" /> Publish Listing
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
