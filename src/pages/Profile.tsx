import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Edit3, Camera, CheckCircle, FileText, Upload, Award, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';

const Profile = () => {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || 'Chanda Musonda');
  const [university, setUniversity] = useState(profile?.university || 'University of Zambia (UNZA)');
  const [course, setCourse] = useState(profile?.course || 'Bachelor of Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX']);
  const [newSkill, setNewSkill] = useState('');
  const [bio, setBio] = useState(
    "I'm a dedicated Computer Science student at UNZA with a passion for building innovative digital solutions that address the unique challenges faced by Zambian students. I specialize in frontend development with React and have a keen eye for UI/UX design. Currently seeking internship opportunities to apply my skills in real-world projects."
  );
  const [cvName, setCvName] = useState('Chanda_Musonda_CV_2026.pdf');
  const [cvUploaded, setCvUploaded] = useState(true);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvName(e.target.files[0].name);
      setCvUploaded(true);
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
            <h1 className="text-4xl font-black flex items-center tracking-tight text-white">
              {displayName}
              <div className="ml-3 p-1.5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20" title="Verified Student">
                <CheckCircle size={14} strokeWidth={4} className="text-white" />
              </div>
            </h1>
            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mt-1">
              {course} • {yearOfStudy}
            </p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 right-6 md:bottom-4 md:right-10">
          <Button onClick={() => setIsEditing(!isEditing)} variant="glass" className="px-8 py-3 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl">
            <Edit3 size={16} strokeWidth={2.5} className="mr-2" /> {isEditing ? 'Close Edit' : 'Edit Profile'}
          </Button>
        </motion.div>
      </motion.div>

      {/* Edit Profile Modal / Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 glass p-8 rounded-3xl border border-primary/20"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black tracking-tight text-white">Update Academic & Profile Details</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Input label="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <Input label="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
            <Input label="Course of Study" value={course} onChange={(e) => setCourse(e.target.value)} />
            <Input label="Year of Study" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-medium text-white outline-none focus:border-primary"
            />
          </div>
          <Button onClick={() => setIsEditing(false)} variant="primary" size="md">Save Changes</Button>
        </motion.div>
      )}

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-10 pt-10"
      >
        <motion.div variants={fadeInUp} className="md:col-span-1 space-y-8">
           <Card className="p-8 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8">Personal Details</h3>
              <div className="space-y-5">
                 {[
                   { icon: <GraduationCap size={18} strokeWidth={2.5} />, label: university },
                   { icon: <Mail size={18} strokeWidth={2.5} />, label: profile?.email || "chanda@unza.zm" },
                   { icon: <MapPin size={18} strokeWidth={2.5} />, label: "Lusaka, Zambia" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-4 text-xs font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary flex-shrink-0">{item.icon}</div>
                     <span className="truncate">{item.label}</span>
                   </div>
                 ))}
              </div>
           </Card>

           {/* Student Badges */}
           <Card className="p-8 border-white/5" hoverable={false}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">Student Badges</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-2xl">
                  <ShieldCheck size={20} className="text-primary" />
                  <div>
                    <div className="text-xs font-bold text-white">Verified Student</div>
                    <div className="text-[9px] text-gray-400">Institutional Email Confirmed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                  <Award size={20} className="text-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Top Contributor</div>
                    <div className="text-[9px] text-gray-400">Peer Academic Helper</div>
                  </div>
                </div>
              </div>
           </Card>

           {/* Skills */}
           <Card className="p-8" hoverable={false}>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20 flex items-center space-x-1.5">
                    <span>{s}</span>
                    <button onClick={() => handleRemoveSkill(s)} className="text-primary hover:text-white"><X size={12} /></button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddSkill} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-primary"
                />
                <Button type="submit" size="sm" variant="glass" className="text-[10px] uppercase font-bold px-3">Add</Button>
              </form>
           </Card>
        </motion.div>

        <motion.div variants={fadeInUp} className="md:col-span-2 space-y-10">
           <Card className="p-10 relative overflow-hidden" hoverable={false}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-white">Biography</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-medium">
                {bio}
              </p>
           </Card>

           {/* CV Upload Section */}
           <Card className="p-8 border-white/5" hoverable={false}>
              <h3 className="text-lg font-bold mb-4 tracking-tight text-white flex items-center">
                <FileText size={20} className="text-primary mr-2" /> Curriculum Vitae (CV)
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/20 text-primary rounded-xl">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{cvUploaded ? cvName : 'No CV uploaded'}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{cvUploaded ? 'PDF Document • Ready for Job Applications' : 'Upload PDF or DOCX format'}</div>
                  </div>
                </div>
                <label className="cursor-pointer">
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
                  <span className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/40 rounded-xl text-primary font-bold text-xs uppercase hover:bg-primary hover:text-white transition-all">
                    <Upload size={14} className="mr-2" /> Upload CV
                  </span>
                </label>
              </div>
           </Card>

           {/* Activity Feed */}
           <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight uppercase text-[12px] text-gray-500 ml-2">Activity Feed</h3>
              <div className="space-y-3">
                 {[
                   { text: "Applied for Software Development Intern at Zambia Tech Hub", time: "2h ago" },
                   { text: "Saved 'Silverest Executive Lodge' to Favorites", time: "1d ago" },
                   { text: "Listed 'MacBook Pro M1 2020' on Student Marketplace", time: "2d ago" },
                   { text: "Registered for Zambia Tech Expo 2026", time: "3d ago" },
                 ].map((act, i) => (
                   <motion.div key={i} whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                     <Card className="p-5 flex items-center space-x-4 border-white/5 bg-white/2" hoverable={false}>
                       <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(46,91,255,0.8)]" />
                       <p className="text-xs text-gray-300 font-bold">{act.text}</p>
                       <span className="ml-auto text-[9px] font-black text-gray-500 uppercase tracking-widest">{act.time}</span>
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
