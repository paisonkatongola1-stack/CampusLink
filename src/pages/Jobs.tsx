import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, X, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';

const Jobs = () => {
  const { data } = useCollection<JobListing>('jobs');
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

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
                {appliedJobs.includes(job.id) ? (
                  <div className="flex items-center space-x-2 text-green-500 font-black text-[10px] uppercase tracking-widest px-8">
                    <CheckCircle size={16} />
                    <span>Applied</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => setApplyingJob(job)}
                    className="flex-1 md:flex-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em]"
                    size="lg"
                  >
                    Apply Now
                  </Button>
                )}
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
        {applyingJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-xl glass border border-white/10 rounded-[3rem] p-10 relative shadow-2xl"
            >
              <button
                onClick={() => setApplyingJob(null)}
                className="absolute top-8 right-8 p-3 bg-white/5 rounded-full hover:bg-red-500 transition-all"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="mb-10">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                   <Briefcase size={32} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black mb-2 tracking-tight">Apply for <span className="text-primary">{applyingJob.role}</span></h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">At {applyingJob.company}</p>
              </div>

              <div className="space-y-8">
                 <div className="p-6 bg-white/2 border border-white/5 rounded-3xl">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Confirm Application CV</h4>
                    <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                       <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/20 text-primary rounded-xl">
                             <FileText size={20} />
                          </div>
                          <div>
                             <p className="text-xs font-bold">chanda_musonda_cv.pdf</p>
                             <p className="text-[9px] text-primary font-black uppercase tracking-widest">Active Resume</p>
                          </div>
                       </div>
                       <Button variant="glass" size="sm" className="text-[9px] px-4 py-2 border-white/5">Change</Button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Short Cover Note (Optional)</label>
                    <textarea
                      className="w-full bg-secondary border border-white/10 rounded-2xl py-4 px-6 focus:border-primary transition-all outline-none text-sm text-white min-h-[100px] placeholder:text-gray-600"
                      placeholder="Why are you a good fit for this role?"
                    ></textarea>
                 </div>

                 <Button
                   onClick={() => {
                     setAppliedJobs([...appliedJobs, applyingJob.id]);
                     setApplyingJob(null);
                   }}
                   className="w-full py-5 text-[11px] uppercase tracking-[0.3em]"
                   size="lg"
                 >
                    Submit Application
                 </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Jobs;
