import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, X, Upload, FileText } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { uploadFile, applyForJob } from '../utils/firebaseUtils';

const Jobs = () => {
  const { data } = useCollection<JobListing>('jobs');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const mockJobs: JobListing[] = [
    { id: '1', role: "Software Development Intern", company: "Zambia Tech Hub", location: "Remote / Lusaka", salary: "K4,000/mo", type: "Internship", tags: ["React", "Node.js"], postedAt: null },
    { id: '2', role: "Marketing Assistant", company: "Zed Media Group", location: "Lusaka", salary: "K2,500/mo", type: "Part-time", tags: ["Social Media", "Content"], postedAt: null },
    { id: '3', role: "Tutor (Mathematics)", company: "Private Client", location: "Kitwe", salary: "K150/hr", type: "Freelance", tags: ["Education"], postedAt: null },
  ];

  const jobs = data.length > 0 ? data : mockJobs;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-6 py-10"
    >
      <div className="mb-16">
        <motion.h1 variants={fadeInUp} className="text-4xl font-black mb-2 tracking-tight">Job <span className="text-primary">Hub</span></motion.h1>
        <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Discover career opportunities and student-friendly jobs</motion.p>
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
         <div className="flex space-x-2">
           {['Internship', 'Part-time', 'Remote'].map(f => (
             <Button key={f} variant="glass" size="sm" className="text-[10px] font-black uppercase tracking-[0.2em] border-white/5">{f}</Button>
           ))}
         </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-6">
        {jobs.map((job, i) => (
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
                <Button
                  onClick={() => setSelectedJob(job)}
                  className="flex-1 md:flex-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em]"
                  size="lg"
                >
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

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-lg glass border border-white/10 rounded-[2.5rem] p-10 relative shadow-2xl"
            >
              <button
                onClick={() => { setSelectedJob(null); setCvFile(null); }}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={2.5} />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-black tracking-tight italic mb-2">Apply <span className="text-primary italic-none">Now</span></h2>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedJob.role} @ {selectedJob.company}</p>
              </div>

              <form className="space-y-8" onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  let cvUrl = '';
                  if (cvFile) {
                    cvUrl = await uploadFile('cvs', cvFile);
                  }
                  await applyForJob(selectedJob.id, { cvUrl });
                  setSelectedJob(null);
                  setCvFile(null);
                } catch (err) {
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              }}>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Upload CV / Resume</label>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:border-primary/40 hover:bg-white/5 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={28} strokeWidth={2.5} />
                      </div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-center px-6">
                        {cvFile ? cvFile.name : 'Drop your CV here or click to browse'}
                      </p>
                      <p className="text-[9px] text-gray-600 font-bold mt-2 uppercase tracking-tighter">PDF, DOCX (Max 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
                  </label>
                </div>

                <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    By applying, you agree to share your CampusLink profile and uploaded CV with <span className="text-white font-black">{selectedJob.company}</span>.
                  </p>
                </div>

                <Button type="submit" className="w-full py-5 text-[10px] uppercase tracking-[0.2em]" isLoading={loading}>
                  Submit Application
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Jobs;
