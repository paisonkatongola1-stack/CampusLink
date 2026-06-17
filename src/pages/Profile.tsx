import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Edit3, Camera, CheckCircle, Save, X, Briefcase, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../utils/firebaseUtils';

const Profile = () => {
  const { profile, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || "",
    university: profile?.university || "",
    course: profile?.course || "",
    bio: profile?.bio || "I'm a dedicated student looking for opportunities to grow and contribute to the Zambian ecosystem.",
  });

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.uid, formData);
      setIsEditing(false);
      window.location.reload(); // Refresh to show changes from context
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-6 py-12"
    >
      <motion.div variants={scaleUp} className="relative mb-24">
        <div className="h-72 w-full bg-gradient-to-r from-primary via-blue-800 to-accent rounded-[3rem] shadow-2xl overflow-hidden relative">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48 rounded-full" />
        </div>

        <div className="absolute -bottom-16 left-10 flex flex-col md:flex-row md:items-end">
          <div className="relative group">
            <div className="w-44 h-44 rounded-[3rem] border-[8px] border-[#0A0B14] bg-surface-bright flex items-center justify-center text-6xl font-black shadow-2xl z-20 overflow-hidden text-white">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
               {formData.displayName?.substring(0, 2).toUpperCase() || "ST"}
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="absolute bottom-2 right-2 p-3 bg-primary rounded-2xl shadow-2xl border-4 border-[#0A0B14] z-30 text-white">
              <Camera size={22} strokeWidth={2.5} />
            </motion.button>
          </div>

          <div className="mt-6 md:ml-10 md:mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-black tracking-tight text-white">
                {formData.displayName || 'CampusLink User'}
              </h1>
              <div className="p-1.5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <CheckCircle size={16} strokeWidth={4} className="text-white" />
              </div>
            </div>
            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mt-2">
              {profile?.role || 'Student'} • {formData.university || 'University of Zambia'}
            </p>
          </div>
        </div>

        <div className="absolute -bottom-8 right-6 md:bottom-4 md:right-10 flex space-x-3">
          {isEditing ? (
            <>
              <Button variant="glass" className="px-6 py-3 border-red-500/20 text-red-400 hover:bg-red-500/10" onClick={() => setIsEditing(false)}>
                <X size={18} className="mr-2" /> Cancel
              </Button>
              <Button variant="primary" className="px-8 py-3 shadow-2xl" onClick={handleSave} isLoading={loading}>
                <Save size={18} className="mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <Button variant="glass" className="px-8 py-3 border-white/10 shadow-2xl backdrop-blur-2xl" onClick={() => setIsEditing(true)}>
              <Edit3 size={18} className="mr-2" /> Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-12 pt-10"
      >
        <motion.div variants={fadeInUp} className="md:col-span-1 space-y-10">
           <Card className="p-10 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-10">Identity Details</h3>

              <div className="space-y-8">
                 {isEditing ? (
                   <div className="space-y-6">
                      <Input
                        label="Full Name"
                        value={formData.displayName}
                        onChange={e => setFormData({...formData, displayName: e.target.value})}
                      />
                      <Input
                        label="University"
                        value={formData.university}
                        onChange={e => setFormData({...formData, university: e.target.value})}
                      />
                      <Input
                        label="Course of Study"
                        value={formData.course}
                        onChange={e => setFormData({...formData, course: e.target.value})}
                      />
                   </div>
                 ) : (
                   <>
                    {[
                      { icon: <GraduationCap size={20} />, label: formData.university || "University of Zambia", sub: "Institution" },
                      { icon: <BookOpen size={20} />, label: formData.course || "Computer Science", sub: "Academic Course" },
                      { icon: <Mail size={20} />, label: user?.email || "user@university.zm", sub: "Official Email" },
                      { icon: <MapPin size={20} />, label: "Lusaka, Zambia", sub: "Current Base" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-5 group">
                        <div className="p-3 bg-white/5 rounded-2xl text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-white/5">
                           {item.icon}
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{item.sub}</p>
                           <p className="text-sm font-bold text-gray-200 mt-0.5">{item.label}</p>
                        </div>
                      </div>
                    ))}
                   </>
                 )}
              </div>
           </Card>

           <Card className="p-10" hoverable={false}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">Skill Ecosystem</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX'].map(s => (
                  <span key={s} className="px-4 py-2 bg-primary/10 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-default">{s}</span>
                ))}
              </div>
              <button className="w-full mt-8 py-3 border border-dashed border-white/10 rounded-2xl text-[9px] font-black uppercase text-gray-600 hover:border-primary/40 hover:text-primary transition-all">
                + Add Skills
              </button>
           </Card>
        </motion.div>

        <motion.div variants={fadeInUp} className="md:col-span-2 space-y-12">
           <Card className="p-12 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
              <h3 className="text-2xl font-black mb-8 tracking-tight uppercase">Professional <span className="text-primary italic">Bio</span></h3>

              {isEditing ? (
                <textarea
                  rows={6}
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-secondary border border-white/10 rounded-2xl py-4 px-6 focus:border-primary outline-none text-sm text-gray-300 font-medium leading-relaxed"
                />
              ) : (
                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                  {formData.bio}
                </p>
              )}
           </Card>

           <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 flex items-center">
                  <Briefcase size={16} className="mr-3 text-primary" /> Recent Activity
                </h3>
                <button className="text-[10px] font-black uppercase text-primary hover:underline tracking-widest">Full History</button>
              </div>

              <div className="space-y-4">
                 {[
                   { act: "Applied for Software Intern at Zambia Tech Hub", date: "2d ago", icon: "🚀" },
                   { act: "Saved 'Silverest Executive Lodge' to favorites", date: "3d ago", icon: "⭐" },
                   { act: "Listed 'Scientific Calculator' on Marketplace", date: "1w ago", icon: "🛒" }
                 ].map((item, i) => (
                   <motion.div key={i} whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                     <Card className="p-8 flex items-center space-x-8 border-white/5 bg-white/2 hover:bg-white/4 transition-colors" hoverable={false}>
                       <div className="text-2xl">{item.icon}</div>
                       <div className="flex-1">
                         <p className="text-base text-gray-200 font-bold tracking-tight">{item.act}</p>
                         <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mt-1 block">{item.date}</span>
                       </div>
                       <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(46,91,255,0.8)]" />
                     </Card>
                   </motion.div>
                 ))}
              </div>
           </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
