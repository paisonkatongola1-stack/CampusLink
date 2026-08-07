import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Edit3, Camera, CheckCircle, Save, X, BookOpen, Calendar, Award, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../utils/firebaseUtils';
import { UNIVERSITIES } from '../utils/constants';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';

const Profile = () => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [displayName, setDisplayName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [cvName, setCvName] = useState("");

  // Initialize values
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
      setUniversity(profile.university || "University of Zambia (UNZA)");
      setCourse(profile.course || "Bachelor of Computer Science");
      setYear(profile.year || "3rd Year");
      setSkills(profile.skills?.join(", ") || "React, TypeScript, Node.js, Python, UI/UX");
      setBio(profile.bio || "I'm a dedicated Computer Science student at UNZA with a passion for building innovative digital solutions that address the unique challenges faced by Zambian students. I specialize in frontend development with React and have a keen eye for UI/UX design. Currently seeking internship opportunities to apply my skills in real-world projects.");
    } else {
      // Default fallback mock values
      setDisplayName("Chanda Musonda");
      setUniversity("University of Zambia (UNZA)");
      setCourse("Bachelor of Computer Science");
      setYear("3rd Year");
      setSkills("React, TypeScript, Node.js, Python, UI/UX");
      setBio("I'm a dedicated Computer Science student at UNZA with a passion for building innovative digital solutions that address the unique challenges faced by Zambian students. I specialize in frontend development with React and have a keen eye for UI/UX design. Currently seeking internship opportunities to apply my skills in real-world projects.");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);

    try {
      if (user) {
        await updateUserProfile(user.uid, {
          displayName,
          university,
          course,
          year,
          skills: skillsArray,
          bio
        });
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } else {
        // Mock save if not fully authenticated
        setSuccess("Mock profile updated successfully (offline mode)!");
        setIsEditing(false);
      }
    } catch (err: any) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvName(file.name);
      setSuccess(`CV '${file.name}' uploaded successfully!`);
      setTimeout(() => setSuccess(""), 4000);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-6 py-12"
    >
      {/* Banner / Cover Photo */}
      <motion.div variants={scaleUp} className="relative mb-24">
        <div className="h-64 w-full bg-gradient-to-r from-primary via-blue-800 to-secondary rounded-[2.5rem] shadow-2xl overflow-hidden relative">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="absolute -bottom-16 left-10 flex flex-col md:flex-row md:items-end">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[2.5rem] border-[6px] border-[#0A0B14] bg-white/10 backdrop-blur-xl flex items-center justify-center text-5xl font-black shadow-2xl z-20 overflow-hidden text-white">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
               {displayName ? displayName.substring(0, 2).toUpperCase() : "CM"}
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="absolute bottom-2 right-2 p-3 bg-primary rounded-2xl shadow-2xl border-4 border-[#0A0B14] z-30">
              <Camera size={20} strokeWidth={2.5} className="text-white" />
            </motion.button>
          </div>
          <div className="mt-4 md:ml-8 md:mb-4">
            <h1 className="text-4xl font-black flex items-center tracking-tight text-white">
              {displayName || "Chanda Musonda"}
              <div className="ml-3 p-1.5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <CheckCircle size={14} strokeWidth={4} className="text-white" />
              </div>
            </h1>
            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mt-1">
              {course} • {year}
            </p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 right-6 md:bottom-4 md:right-10">
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="glass" className="px-8 py-3 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl text-white">
              <Edit3 size={16} strokeWidth={2.5} className="mr-2 text-primary" /> Edit Profile
            </Button>
          )}
        </motion.div>
      </motion.div>

      {/* Success/Error Notifications */}
      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl mb-6 text-sm font-semibold flex items-center">
          <CheckCircle size={18} className="mr-2" /> {success}
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm font-semibold">
          {error}
        </div>
      )}

      {isEditing ? (
        <motion.form onSubmit={handleSave} variants={fadeInUp} className="space-y-8">
          <Card className="p-10 space-y-8" hoverable={false}>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-2xl font-black tracking-tight text-white">Edit Profile Details</h2>
              <div className="flex space-x-3">
                <Button type="button" variant="glass" size="sm" onClick={() => setIsEditing(false)}>
                  <X size={16} className="mr-2" /> Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" isLoading={saving}>
                  <Save size={16} className="mr-2" /> Save Changes
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                id="profile-fullName"
                label="Full Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              <div className="flex flex-col space-y-2">
                <label htmlFor="profile-university" className="text-sm font-bold text-gray-400 uppercase tracking-wider">University</label>
                <select
                  id="profile-university"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="bg-[#111415] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-all"
                >
                  {UNIVERSITIES.map((univ) => (
                    <option key={univ} value={univ} className="bg-[#0A0B14]">
                      {univ}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                id="profile-course"
                label="Course of Study"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
              <Input
                id="profile-year"
                label="Year of Study (e.g., 1st Year, 2nd Year...)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <Input
              id="profile-skills"
              label="Skills (comma separated, e.g. React, Python)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-[#111415] border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all font-sans text-sm leading-relaxed"
                placeholder="Write a brief introduction about yourself..."
              />
            </div>
          </Card>
        </motion.form>
      ) : (
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-10"
        >
          {/* Left Column */}
          <motion.div variants={fadeInUp} className="md:col-span-1 space-y-8">
             <Card className="p-8 relative overflow-hidden" hoverable={false}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8">Personal Details</h3>
                <div className="space-y-6">
                   <div className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">
                       <GraduationCap size={18} strokeWidth={2.5} />
                     </div>
                     <span className="truncate">{university}</span>
                   </div>
                   <div className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">
                       <BookOpen size={18} strokeWidth={2.5} />
                     </div>
                     <span>{course}</span>
                   </div>
                   <div className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">
                       <Calendar size={18} strokeWidth={2.5} />
                     </div>
                     <span>{year}</span>
                   </div>
                   <div className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">
                       <Mail size={18} strokeWidth={2.5} />
                     </div>
                     <span>{profile?.email || "chanda@unza.zm"}</span>
                   </div>
                   <div className="flex items-center space-x-4 text-sm font-bold text-gray-300">
                     <div className="p-2 bg-primary/10 rounded-xl text-primary">
                       <MapPin size={18} strokeWidth={2.5} />
                     </div>
                     <span>Lusaka, Zambia</span>
                   </div>
                </div>
             </Card>

             <Card className="p-8" hoverable={false}>
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.split(",").map(s => s.trim()).filter(Boolean).map(s => (
                    <span key={s} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-default">{s}</span>
                  ))}
                </div>
             </Card>

             {/* CV Upload Section */}
             <Card className="p-8 relative overflow-hidden" hoverable={false}>
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center">
                  <Award size={14} className="mr-2 text-primary" /> CV Management
                </h3>
                <p className="text-gray-400 text-xs mb-6 font-medium leading-relaxed">
                  Upload your curriculum vitae to apply for jobs and internships seamlessly.
                </p>
                {cvName ? (
                  <div className="flex items-center space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-6">
                    <FileText size={24} className="text-primary flex-shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-sm font-bold truncate text-white">{cvName}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Ready to apply</div>
                    </div>
                  </div>
                ) : null}
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <Button variant="secondary" className="w-full text-xs font-black uppercase tracking-widest py-3 border-white/10">
                    {cvName ? "Replace CV" : "Upload CV File"}
                  </Button>
                </div>
             </Card>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={fadeInUp} className="md:col-span-2 space-y-10">
             <Card className="p-10 relative overflow-hidden" hoverable={false}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                <h3 className="text-2xl font-bold mb-6 tracking-tight text-white">Biography</h3>
                <p className="text-gray-400 text-base leading-relaxed font-medium">
                  {bio}
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
      )}
    </motion.div>
  );
};

export default Profile;
