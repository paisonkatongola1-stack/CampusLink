import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Edit3, Camera, CheckCircle, Upload, X, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, uploadFile } from '../utils/firebaseUtils';

const Profile = () => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || "",
    university: profile?.university || "",
    course: profile?.course || "",
    bio: profile?.bio || "",
    skills: profile?.skills?.join(", ") || ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      await updateUserProfile(user.uid, {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()).filter(s => s)
      });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && user) {
      setLoading(true);
      try {
        const url = await uploadFile(`cvs/${user.uid}/${e.target.files[0].name}`, e.target.files[0]);
        await updateUserProfile(user.uid, { cvUrl: url });
      } catch (err: any) {
        setError("Failed to upload CV");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-6 py-12"
    >
      <motion.div variants={scaleUp} className="relative mb-20">
        <div className="h-64 w-full bg-gradient-to-r from-primary via-blue-800 to-secondary rounded-[2.5rem] shadow-2xl overflow-hidden relative">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="absolute -bottom-12 left-10 flex flex-col md:flex-row md:items-end">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[2.5rem] border-[6px] border-[#0A0B14] bg-surface-bright flex items-center justify-center text-5xl font-black shadow-2xl z-20 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
               CM
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="absolute bottom-2 right-2 p-3 bg-primary rounded-2xl shadow-2xl border-4 border-[#0A0B14] z-30">
              <Camera size={20} strokeWidth={2.5} className="text-white" />
            </motion.button>
          </div>
          <div className="mt-4 md:ml-8 md:mb-4">
            <h1 className="text-4xl font-black flex items-center tracking-tight">
              {profile?.displayName || 'Set Name'}
              <div className="ml-3 p-1.5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <CheckCircle size={14} strokeWidth={4} className="text-white" />
              </div>
            </h1>
            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mt-1">@{profile?.role || 'student'} • {profile?.course || 'Education'}</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 right-6 md:bottom-4 md:right-10">
          <Button onClick={() => setIsEditing(true)} variant="glass" className="px-8 py-3 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl">
            <Edit3 size={16} strokeWidth={2.5} className="mr-2" /> Edit Profile
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-10 pt-10"
      >
        <motion.div variants={fadeInUp} className="md:col-span-1 space-y-8">
           <Card className="p-8 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8">Personal Details</h3>
              <div className="space-y-6">
                 {[
                   { icon: <GraduationCap size={18} strokeWidth={2.5} />, label: profile?.university || "Add University" },
                   { icon: <Mail size={18} strokeWidth={2.5} />, label: profile?.email || "Add Email" },
                   { icon: <MapPin size={18} strokeWidth={2.5} />, label: "Zambia" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">{item.icon}</div>
                     <span>{item.label}</span>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-8" hoverable={false}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {(profile?.skills || ['React', 'TypeScript', 'Node.js']).map(s => (
                  <span key={s} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-default">{s}</span>
                ))}
              </div>
           </Card>

           <Card className="p-8 text-center" hoverable={false}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">Career Documents</h3>
              <div className="relative group">
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleCVUpload} accept=".pdf,.doc,.docx" />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="glass"
                  className="w-full py-4 text-[10px] uppercase tracking-widest"
                  isLoading={loading}
                >
                  <Upload size={16} className="mr-2" /> {profile?.cvUrl ? 'Update CV' : 'Upload CV'}
                </Button>
                {profile?.cvUrl && (
                  <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[9px] font-black text-primary uppercase tracking-widest hover:underline">View Current CV</a>
                )}
              </div>
           </Card>
        </motion.div>

        <motion.div variants={fadeInUp} className="md:col-span-2 space-y-10">
           <Card className="p-10 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <h3 className="text-2xl font-bold mb-6 tracking-tight">Biography</h3>
              <p className="text-gray-400 text-base leading-relaxed font-medium">
                {profile?.bio || "No biography added yet. Click edit profile to add one!"}
              </p>
           </Card>

           <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 ml-2">Recent Activity</h3>
              <div className="space-y-4">
                 {[
                   "Applied for Software Intern at Zambia Tech Hub",
                   "Saved 'Silverest Executive Lodge' to favorites",
                   "Listed 'Scientific Calculator' on Marketplace"
                 ].map((act, i) => (
                   <motion.div key={i} whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                     <Card className="p-6 flex items-center space-x-6 border-white/5 bg-white/2" hoverable={false}>
                       <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(46,91,255,0.8)]" />
                       <p className="text-sm text-gray-300 font-bold">{act}</p>
                       <span className="ml-auto text-[9px] font-black text-gray-600 uppercase tracking-widest">2d ago</span>
                     </Card>
                   </motion.div>
                 ))}
              </div>
           </div>
        </motion.div>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsEditing(false)}
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
                    <h2 className="text-3xl font-black tracking-tight uppercase">Edit <span className="text-primary">Profile</span></h2>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="p-3 glass rounded-xl border border-white/10">
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6 overflow-y-auto no-scrollbar pr-2">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold flex items-center">
                      <AlertCircle size={16} className="mr-3" /> {error}
                    </div>
                  )}

                  <Input label="Display Name" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} required />
                  <Input label="University" value={formData.university} onChange={(e) => setFormData({...formData, university: e.target.value})} />
                  <Input label="Course" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Biography</label>
                    <textarea
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-primary transition-all min-h-[120px]"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                  </div>
                  <Input label="Skills (comma separated)" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} placeholder="e.g. React, Python, UI Design" />

                  <Button type="submit" className="w-full py-5 text-[10px] uppercase tracking-widest" isLoading={loading}>
                    Save Changes
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;
