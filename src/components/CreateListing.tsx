import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Home, ShoppingBag, Briefcase, Calendar, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, uploadFile } from '../utils/firebaseUtils';
import { useAuth } from '../context/AuthContext';

interface CreateListingProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'accommodation' | 'marketplace' | 'jobs' | 'events';
}

const CreateListing = ({ isOpen, onClose, defaultType = 'marketplace' }: CreateListingProps) => {
  const { user } = useAuth();
  const [type, setType] = useState(defaultType);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    category: '',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    // Accommodation specific
    distance: '',
    university: '',
    amenities: [] as string[],
    // Job specific
    role: '',
    company: '',
    jobType: 'Internship',
    salary: '',
    // Event specific
    date: '',
    time: '',
    venue: '',
    organizer: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadFile(`listings/${type}/${Date.now()}_${imageFile.name}`, imageFile);
      }

      const collectionName = type;
      const data: any = {
        ...formData,
        image: imageUrl,
        userId: user?.uid,
        status: 'pending',
        createdAt: Timestamp.now()
      };

      // Ensure correct ID fields for specific types
      if (type === 'accommodation') {
        data.landlordId = user?.uid;
      } else if (type === 'marketplace') {
        data.sellerId = user?.uid;
        data.rating = 5.0; // Default rating for new items
      }

      // Clean up data based on type
      if (type === 'jobs') {
        data.role = formData.title || formData.role;
      }

      await addDoc(collection(db, collectionName), data);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
        className="relative w-full max-w-2xl z-10"
      >
        <Card className="p-8 md:p-12 max-h-[90vh] overflow-y-auto no-scrollbar border-white/10 shadow-2xl" hoverable={false}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          {success ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black mb-4">Submitted for Review</h2>
              <p className="text-gray-400 font-medium">Your listing has been sent to our moderators.</p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-black mb-3 italic tracking-tight">Create <span className="text-primary italic-none">Listing</span></h2>
                <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Reach the CampusLink Zambia community</p>
              </div>

              <div className="flex space-x-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { id: 'marketplace', label: 'Item', icon: <ShoppingBag size={14} /> },
                  { id: 'accommodation', label: 'Housing', icon: <Home size={14} /> },
                  { id: 'jobs', label: 'Job/Intern', icon: <Briefcase size={14} /> },
                  { id: 'events', label: 'Event', icon: <Calendar size={14} /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id as any)}
                    className={`px-6 py-3 rounded-xl flex items-center space-x-2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all border ${
                      type === t.id
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                    }`}
                  >
                    {t.icon} <span>{t.label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={type === 'jobs' ? "Job Role" : "Title / Name"}
                    name="title"
                    placeholder={type === 'marketplace' ? "e.g. MacBook Pro M1" : "e.g. Silverest Room"}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label={type === 'jobs' ? "Salary / Stipend" : "Price / Monthly Rent"}
                    name={type === 'jobs' ? "salary" : "price"}
                    placeholder="e.g. K3,500"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Location"
                    name="location"
                    placeholder="e.g. UNZA East Park"
                    onChange={handleChange}
                    required
                  />
                  {type === 'accommodation' ? (
                    <Input
                      label="University"
                      name="university"
                      placeholder="e.g. UNZA"
                      onChange={handleChange}
                    />
                  ) : (
                    <Input
                      label="Category"
                      name="category"
                      placeholder="e.g. Electronics"
                      onChange={handleChange}
                    />
                  )}
                </div>

                {type === 'accommodation' && (
                  <Input
                    label="Distance from Campus"
                    name="distance"
                    placeholder="e.g. 500m"
                    onChange={handleChange}
                  />
                )}

                {type === 'jobs' && (
                  <Input
                    label="Company Name"
                    name="company"
                    placeholder="e.g. Zambia Tech Hub"
                    onChange={handleChange}
                  />
                )}

                {(type === 'events') && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Date"
                      name="date"
                      type="date"
                      onChange={handleChange}
                    />
                    <Input
                      label="Time"
                      name="time"
                      type="time"
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-primary transition-all placeholder:text-gray-600"
                    placeholder="Provide details about your listing..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-400">Upload Image</label>
                  <label className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors cursor-pointer bg-white/2 relative overflow-hidden group">
                    {imagePreview ? (
                      <div className="absolute inset-0">
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Upload size={24} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-primary/10 text-primary rounded-2xl mb-4">
                          <Upload size={24} strokeWidth={2.5} />
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Click to upload or drag and drop</p>
                        <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-tighter">PNG, JPG or WEBP (Max 5MB)</p>
                      </>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full py-5 text-[10px] font-black uppercase tracking-[0.2em]"
                  isLoading={loading}
                >
                  Post Listing
                </Button>
              </form>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateListing;
