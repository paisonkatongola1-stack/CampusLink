import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, X, FileText, Upload, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';
import { applyForJob } from '../utils/firebaseUtils';

const Jobs = () => {
  const { data: dbJobs } = useCollection<JobListing>('jobs');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const mockJobs: JobListing[] = [
    { id: '1', role: "Software Development Intern", company: "Zambia Tech Hub", location: "Remote / Lusaka", salary: "K4,000/mo", type: "Internship", tags: ["React", "Node.js"], postedAt: null },
    { id: '2', role: "Marketing Assistant", company: "Zed Media Group", location: "Lusaka", salary: "K2,500/mo", type: "Part-time", tags: ["Social Media", "Content"], postedAt: null },
    { id: '3', role: "Tutor (Mathematics)", company: "Private Client", location: "Kitwe", salary: "K150/hr", type: "Freelance", tags: ["Education"], postedAt: null },
    { id: '4', role: "Graduate Trainee", company: "Standard Chartered", location: "Lusaka", salary: "Competitive", type: "Full-time", tags: ["Finance", "Banking"], postedAt: null },
  ];

  const jobs = dbJobs.length > 0 ? dbJobs : mockJobs;

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = activeType === "All" || job.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, activeType]);

  const handleApply = async () => {
    if (!selectedJob) return;
    setIsApplying(true);
    try {
      await applyForJob(selectedJob.id, {
        coverLetter: "I am highly motivated to join your team as a " + selectedJob.role,
      } as any);
      setApplied(true);
      setTimeout(() => {
        setSelectedJob(null);
        setApplied(false);
      }, 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsApplying(false);
    }
  };

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
            <Input
              placeholder="Search roles or companies..."
              icon={<Search size={20} strokeWidth={2.5} />}
              className="shadow-2xl"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex space-x-2">
           {['All', 'Internship', 'Part-time', 'Freelance'].map(f => (
             <Button
               key={f}
               variant={activeType === f ? "primary" : "glass"}
               size="sm"
               className="text-[10px] font-black uppercase tracking-[0.2em] border-white/5"
               onClick={() => setActiveType(f)}
             >
               {f}
             </Button>
           ))}
         </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              variants={fadeInUp}
              layout
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
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
                    className="flex-1 md:flex-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em]"
                    size="lg"
                    onClick={() => setSelectedJob(job)}
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
        </AnimatePresence>
      </motion.div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative w-full max-w-2xl glass border border-white/10 rounded-[2.5rem] p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

              <div className="flex justify-between items-center mb-8">
                <div>
                   <h2 className="text-2xl font-black tracking-tight uppercase">Apply for <span className="text-primary italic">Role</span></h2>
                   <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">{selectedJob.role} @ {selectedJob.company}</p>
                </div>
                <button onClick={() => setSelectedJob(null)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {applied ? (
                <div className="text-center py-20">
                   <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} strokeWidth={2.5} />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Application Sent!</h3>
                   <p className="text-gray-400 font-medium">Good luck! The employer will review your profile shortly.</p>
                </div>
              ) : (
                <div className="space-y-8">
                   <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                      <div className="flex items-center space-x-4 mb-6">
                         <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            <Sparkles size={24} />
                         </div>
                         <h3 className="font-bold text-lg">AI Profile Optimization</h3>
                      </div>
                      <p className="text-sm text-gray-400 font-medium mb-6">Our AI will automatically include your latest CV and skills from your profile to help you stand out.</p>
                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                         <div className="flex items-center space-x-3">
                            <FileText className="text-gray-500" size={20} />
                            <span className="text-xs font-bold text-gray-300">Chanda_Musonda_CV.pdf</span>
                         </div>
                         <span className="text-[9px] font-black text-green-500 uppercase">Uploaded</span>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Add a brief note (Optional)</label>
                      <textarea
                        rows={3}
                        className="w-full bg-secondary border border-white/10 rounded-xl py-4 px-6 focus:border-primary outline-none text-sm text-white placeholder:text-gray-600"
                        placeholder="Why are you a good fit for this role?"
                      />
                   </div>

                   <div className="flex space-x-4">
                      <Button variant="secondary" className="flex-1 py-4 border-white/10" onClick={() => setSelectedJob(null)}>
                        Cancel
                      </Button>
                      <Button className="flex-[2] py-4" isLoading={isApplying} onClick={handleApply}>
                        Submit Application
                      </Button>
                   </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Jobs;
