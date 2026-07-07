import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, Upload, X, FileText } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { JOB_TYPES } from '../utils/constants';
import { uploadFile } from '../utils/firebaseUtils';

const Jobs = () => {
  const { data } = useCollection<JobListing>('jobs');
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState('All');

  const mockJobs: JobListing[] = [
    { id: '1', role: "Software Development Intern", company: "Zambia Tech Hub", location: "Remote / Lusaka", salary: "K4,000/mo", type: "Internship", tags: ["React", "Node.js"], postedAt: null },
    { id: '2', role: "Marketing Assistant", company: "Zed Media Group", location: "Lusaka", salary: "K2,500/mo", type: "Part-time", tags: ["Social Media", "Content"], postedAt: null },
    { id: '3', role: "Tutor (Mathematics)", company: "Private Client", location: "Kitwe", salary: "K150/hr", type: "Freelance", tags: ["Education"], postedAt: null },
  ];

  const jobs = data.length > 0 ? data : mockJobs;
  const filteredJobs = selectedType === 'All'
    ? jobs
    : jobs.filter(job => job.type === selectedType);

  const handleCVUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) return;

    setUploading(true);
    try {
      await uploadFile(`cvs/${Date.now()}_${cvFile.name}`, cvFile);
      setIsCVModalOpen(false);
      setCvFile(null);
      alert("CV uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload CV");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-6 py-10"
    >
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end">
        <div>
          <motion.h1 variants={fadeInUp} className="text-4xl font-black mb-2 tracking-tight">Job <span className="text-primary">Hub</span></motion.h1>
          <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Discover career opportunities and student-friendly jobs</motion.p>
        </div>
        <motion.div variants={fadeInUp}>
          <Button onClick={() => setIsCVModalOpen(true)} variant="glass" className="mt-6 md:mt-0 px-8 py-4 border-primary/20 hover:border-primary/50 text-primary">
            <Upload size={18} className="mr-2" /> Manage CV
          </Button>
        </motion.div>
      </div>

      <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {[
          { label: "Active Jobs", val: "124", icon: <Briefcase size={24} strokeWidth={2.5} />, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Companies", val: "45", icon: <CheckCircle size={24} strokeWidth={2.5} />, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "New Today", val: "12", icon: <Clock size={24} strokeWidth={2.5} />, color: "text-accent", bg: "bg-accent/10" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="p-8 flex flex-col items-center text-center space-y-4" hoverable={false}>
               <div className={`w-16 h-16 ${s.bg} ${s.color} rounded-[1.5rem] flex items-center justify-center shadow-xl`}>{s.icon}</div>
               <div>
                 <div className="text-3xl font-black tracking-tighter">{s.val}</div>
                 <div className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mt-1">{s.label}</div>
               </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-12">
         <div className="flex-1">
            <Input placeholder="Search roles or companies..." icon={<Search size={20} strokeWidth={2.5} />} className="shadow-2xl" />
         </div>
         <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
           {['All', ...JOB_TYPES].map(type => (
             <Button
               key={type}
               onClick={() => setSelectedType(type)}
               variant={selectedType === type ? "primary" : "glass"}
               size="sm"
               className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${selectedType !== type ? 'border-white/5' : ''}`}
             >
               {type}
             </Button>
           ))}
         </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-6">
        {filteredJobs.map((job, i) => (
          <motion.div key={job.id} variants={fadeInUp} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Card className="p-8 flex flex-col md:flex-row md:items-center justify-between space-y-8 md:space-y-0">
              <div className="flex items-center space-x-8">
                 <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent border border-white/5 rounded-[1.5rem] flex items-center justify-center text-3xl font-black text-primary shadow-2xl">
                   {job.company.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold mb-1 tracking-tight">{job.role}</h3>
                   <p className="text-primary font-black text-xs mb-5 uppercase tracking-[0.2em]">{job.company}</p>
                   <div className="flex flex-wrap gap-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                     <div className="flex items-center"><MapPin size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.location}</div>
                     <div className="flex items-center"><DollarSign size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.salary}</div>
                     <div className="flex items-center"><Clock size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.type}</div>
                   </div>
                 </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button className="flex-1 md:flex-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em]" size="lg">
                  Apply Now
                </Button>
                <Button variant="glass" className="p-4 border-white/5">
                  <ArrowUpRight size={22} strokeWidth={2.5} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CV Upload Modal */}
      <AnimatePresence>
        {isCVModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCVModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-md relative z-10"
            >
              <Card className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black italic">Manage <span className="text-primary italic-none">CV</span></h2>
                  <button onClick={() => setIsCVModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleCVUpload} className="space-y-6">
                   <div className="relative h-48 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center group hover:border-primary/50 transition-all overflow-hidden bg-white/5">
                      {cvFile ? (
                        <div className="text-center p-6">
                           <FileText size={48} className="text-primary mx-auto mb-4" />
                           <p className="text-sm font-bold truncate max-w-xs">{cvFile.name}</p>
                           <p className="text-[10px] text-gray-500 uppercase mt-2">Ready to upload</p>
                           <button type="button" onClick={() => setCvFile(null)} className="mt-4 text-xs text-red-500 font-bold hover:underline">Remove</button>
                        </div>
                      ) : (
                        <>
                          <Upload size={32} className="text-gray-600 mb-2 group-hover:text-primary transition-colors" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Select CV (PDF/DOCX)</p>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={e => setCvFile(e.target.files?.[0] || null)}
                          />
                        </>
                      )}
                   </div>

                   <Button type="submit" className="w-full py-5" size="lg" isLoading={uploading} disabled={!cvFile}>
                      {uploading ? "Uploading..." : "Save CV"}
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

export default Jobs;
