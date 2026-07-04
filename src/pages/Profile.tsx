import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Edit3, Camera, CheckCircle, Award, ShieldCheck, BookOpen, Clock, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { uploadFile, createUserProfile } from '../utils/firebaseUtils';

const Profile = () => {
  const { profile } = useAuth();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file && profile) {
        try {
           const url = await uploadFile(`profiles/${profile.uid}/avatar`, file);
           // Update Firestore document with new photoURL/avatar
           await createUserProfile(profile.uid, {
              ...profile,
              photoURL: url
           } as any);
           alert("Avatar updated!");
        } catch (error) {
           console.error(error);
           alert("Failed to update avatar");
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
               {profile?.photoURL ? (
                 <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 profile?.displayName?.substring(0, 2).toUpperCase() || 'CM'
               )}
            </div>
            <motion.label whileHover={{ scale: 1.1 }} className="absolute bottom-2 right-2 p-3 bg-primary rounded-2xl shadow-2xl border-4 border-[#0A0B14] z-30 cursor-pointer">
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              <Camera size={20} strokeWidth={2.5} className="text-white" />
            </motion.label>
          </div>
          <div className="mt-4 md:ml-8 md:mb-4">
            <h1 className="text-4xl font-black flex items-center tracking-tight">
              {profile?.displayName || 'Chanda Musonda'}
              <div className="ml-3 flex space-x-2">
                <div className="p-1.5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                  <CheckCircle size={14} strokeWidth={4} className="text-white" />
                </div>
                <div className="p-1.5 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                  <Award size={14} strokeWidth={4} className="text-white" />
                </div>
              </div>
            </h1>
            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mt-1">
              @{profile?.displayName?.toLowerCase().replace(' ', '_') || 'student'} • {profile?.role?.toUpperCase()}
            </p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 right-6 md:bottom-4 md:right-10">
          <Button variant="glass" className="px-8 py-3 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl">
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
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8">Academic Status</h3>
              <div className="space-y-6">
                 {[
                   { icon: <GraduationCap size={18} strokeWidth={2.5} />, label: profile?.university || "University of Zambia" },
                   { icon: <BookOpen size={18} strokeWidth={2.5} />, label: profile?.course || "Computer Science" },
                   { icon: <Clock size={18} strokeWidth={2.5} />, label: `Year ${profile?.year || '3'}` },
                   { icon: <Mail size={18} strokeWidth={2.5} />, label: profile?.email || "chanda@unza.zm" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">{item.icon}</div>
                     <span>{item.label}</span>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-8" hoverable={false}>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500">Skills & Tech</h3>
                 <ShieldCheck size={16} className="text-primary" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile?.skills || ['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX']).map(s => (
                  <span key={s} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-default">{s}</span>
                ))}
              </div>
           </Card>

           <Card className="p-8 border-accent/20 bg-accent/5" hoverable={false}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-accent mb-4">Verification Badge</h3>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed mb-6">Your profile is verified as a legitimate student of your institution.</p>
              <div className="flex items-center text-accent">
                 <ShieldCheck size={24} strokeWidth={2.5} className="mr-3" />
                 <span className="font-black text-xs uppercase tracking-widest">Verified Student</span>
              </div>
           </Card>
        </motion.div>

        <motion.div variants={fadeInUp} className="md:col-span-2 space-y-10">
           <Card className="p-10 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <h3 className="text-2xl font-bold mb-6 tracking-tight">Biography</h3>
              <p className="text-gray-400 text-base leading-relaxed font-medium">
                {profile?.bio || "I'm a dedicated student at UNZA with a passion for building innovative digital solutions that address the unique challenges faced by Zambian students. I specialize in frontend development with React and have a keen eye for UI/UX design. Currently seeking internship opportunities to apply my skills in real-world projects."}
              </p>
           </Card>

           <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-white/5 bg-white/2" hoverable={false}>
                 <h3 className="text-lg font-bold mb-6 flex items-center">
                    <FileText size={20} className="mr-3 text-primary" /> My Curriculum Vitae
                 </h3>
                 <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between mb-6">
                    <div className="flex items-center">
                       <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mr-4">
                          <FileText size={18} />
                       </div>
                       <div>
                          <div className="text-xs font-black uppercase tracking-widest text-white">CV_Chanda.pdf</div>
                          <div className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">Updated 2 days ago</div>
                       </div>
                    </div>
                    <button className="text-[10px] text-primary font-black uppercase tracking-widest hover:text-white transition-colors">Replace</button>
                 </div>
                 <Button className="w-full py-3 text-[10px] font-black uppercase tracking-widest" variant="glass">Download CV</Button>
              </Card>

              <Card className="p-8 border-white/5 bg-white/2" hoverable={false}>
                 <h3 className="text-lg font-bold mb-6 flex items-center">
                    <Award size={20} className="mr-3 text-accent" /> Certifications
                 </h3>
                 <div className="space-y-4">
                    {["Google UX Design Professional", "Meta Front-End Developer"].map((cert, i) => (
                       <div key={i} className="flex items-center text-xs font-bold text-gray-300">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                          {cert}
                       </div>
                    ))}
                 </div>
              </Card>
           </div>

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
    </motion.div>
  );
};

export default Profile;
