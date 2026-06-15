import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, MapPin, DollarSign, Clock, Tag } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { postJob } from '../utils/firebaseUtils';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    salary: '',
    type: 'Internship' as any,
    tags: ''
  });

  const jobTypes = ['Internship', 'Part-time', 'Full-time', 'Freelance'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postJob({
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()),
        status: 'pending'
      });
      onClose();
    } catch (error) {
      console.error("Error posting job:", error);
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
              <h2 className="text-2xl font-black tracking-tight uppercase italic">Post <span className="text-primary italic-none">Job</span></h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              <Input
                label="Job Role"
                placeholder="e.g. Software Development Intern"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                required
              />

              <Input
                label="Company Name"
                placeholder="e.g. Zambia Tech Hub"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Salary / Stipend"
                  placeholder="e.g. K4,000/mo"
                  icon={<DollarSign size={18} />}
                  value={formData.salary}
                  onChange={e => setFormData({...formData, salary: e.target.value})}
                  required
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Job Type</label>
                  <select
                    className="w-full bg-secondary border border-white/10 rounded-xl py-3 px-4 focus:border-primary transition-all outline-none text-sm text-white"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    {jobTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <Input
                label="Location"
                placeholder="e.g. Lusaka / Remote"
                icon={<MapPin size={18} />}
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                required
              />

              <Input
                label="Skills/Tags (comma separated)"
                placeholder="e.g. React, Node.js, Python"
                icon={<Tag size={18} />}
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />

              <Button type="submit" className="w-full py-5 text-[10px] uppercase tracking-[0.2em]" isLoading={loading}>
                Post Opportunity
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostJobModal;
