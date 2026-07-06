import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Edit3, Camera, CheckCircle, Award, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { profile } = useAuth();

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
            <div className="w-40 h-40 rounded-[2.5rem] border-[6px] border-[#0A0B14] bg-surface-bright flex items-center justify-center text-5xl font-black shadow-2xl z-20 overflow-hidden uppercase">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
               {profile?.displayName?.substring(0, 2) || 'CM'}
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="absolute bottom-2 right-2 p-3 bg-primary rounded-2xl shadow-2xl border-4 border-[#0A0B14] z-30">
              <Camera size={20} strokeWidth={2.5} className="text-white" />
            </motion.button>
          </div>
          <div className="mt-4 md:ml-8 md:mb-4">
            <h1 className="text-4xl font-black flex items-center tracking-tight">
              {profile?.displayName || 'Chanda Musonda'}
              <div className="ml-3 p-1.5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <CheckCircle size={14} strokeWidth={4} className="text-white" />
              </div>
              <div className="ml-2 p-1.5 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                <Award size={14} strokeWidth={2.5} className="text-white" />
              </div>
            </h1>
            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mt-1">
              @{profile?.displayName?.toLowerCase().replace(' ', '_') || 'chanda_dev'} • {profile?.role.toUpperCase()}
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
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500">Personal Details</h3>
                <ShieldCheck size={16} className="text-green-500" />
              </div>
              <div className="space-y-6">
                 {[
                   { icon: <GraduationCap size={18} strokeWidth={2.5} />, label: profile?.university || "University of Zambia" },
                   { icon: <Mail size={18} strokeWidth={2.5} />, label: profile?.email || "chanda@unza.zm" },
                   { icon: <MapPin size={18} strokeWidth={2.5} />, label: "Lusaka, Zambia" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">{item.icon}</div>
                     <span className="truncate">{item.label}</span>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-8" hoverable={false}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {(profile?.skills || ['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX']).map(s => (
                  <span key={s} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-default">{s}</span>
                ))}
              </div>
           </Card>
        </motion.div>

        <motion.div variants={fadeInUp} className="md:col-span-2 space-y-10">
           <Card className="p-10 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <h3 className="text-2xl font-bold mb-6 tracking-tight">Biography</h3>
              <p className="text-gray-400 text-base leading-relaxed font-medium">
                {profile?.bio || "I'm a dedicated Computer Science student at UNZA with a passion for building innovative digital solutions that address the unique challenges faced by Zambian students. I specialize in frontend development with React and have a keen eye for UI/UX design. Currently seeking internship opportunities to apply my skills in real-world projects."}
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
    </motion.div>
  );
};

export default Profile;
