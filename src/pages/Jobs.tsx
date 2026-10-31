import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, Upload, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { JOB_TYPES } from '../utils/constants';

const Jobs = () => {
  const { data } = useCollection<JobListing>('jobs');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);
  const [cvFile, setCvFile] = useState<string>('Chanda_Musonda_CV.pdf');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const mockJobs: JobListing[] = [
    { id: '1', role: "Software Development Intern", company: "Zambia Tech Hub", location: "Remote / Lusaka", salary: "K4,000/mo", type: "Internship", tags: ["React", "Node.js"], postedAt: null },
    { id: '2', role: "Marketing Assistant", company: "Zed Media Group", location: "Lusaka", salary: "K2,500/mo", type: "Part-time", tags: ["Social Media", "Content"], postedAt: null },
    { id: '3', role: "Tutor (Mathematics)", company: "Private Client", location: "Kitwe", salary: "K150/hr", type: "Freelance", tags: ["Education"], postedAt: null },
    { id: '4', role: "Junior Frontend Engineer", company: "DotCom Zambia", location: "Lusaka", salary: "K7,500/mo", type: "Full-time", tags: ["TypeScript", "Next.js"], postedAt: null },
    { id: '5', role: "Graphic Design Contractor", company: "AfriPrint Media", location: "Remote", salary: "K3,000/project", type: "Freelance", tags: ["Photoshop", "Branding"], postedAt: null },
  ];

  const jobs = data.length > 0 ? data : mockJobs;

  const filteredJobs = jobs.filter(job => {
    const matchesType = selectedType === 'All Types' ||
      (selectedType === 'Remote' ? job.location.toLowerCase().includes('remote') : job.type === selectedType);
    const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setApplyingJob(null);
      setCoverLetter('');
    }, 1800);
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

      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
         <div className="flex-1">
            <Input
              placeholder="Search roles, skills, or companies..."
              icon={<Search size={20} strokeWidth={2.5} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow-2xl"
            />
         </div>
         <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
           {JOB_TYPES.map(f => (
             <Button
               key={f}
               onClick={() => setSelectedType(f)}
               variant={selectedType === f ? "primary" : "glass"}
               size="sm"
               className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
             >
               {f}
             </Button>
           ))}
         </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-6">
        {filteredJobs.map((job) => (
          <motion.div key={job.id} variants={fadeInUp} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <Card className="p-8 flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0 border-white/5" hoverable={true}>
              <div className="flex items-center space-x-6">
                 <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent border border-white/5 rounded-2xl flex items-center justify-center text-2xl font-black text-primary shadow-xl flex-shrink-0">
                   {job.company.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-xl font-bold mb-1 tracking-tight text-white">{job.role}</h3>
                   <p className="text-primary font-black text-xs mb-3 uppercase tracking-[0.15em]">{job.company}</p>
                   <div className="flex flex-wrap gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                     <div className="flex items-center"><MapPin size={13} strokeWidth={2.5} className="mr-1.5 text-primary" /> {job.location}</div>
                     <div className="flex items-center"><DollarSign size={13} strokeWidth={2.5} className="mr-1.5 text-primary" /> {job.salary}</div>
                     <div className="flex items-center"><Clock size={13} strokeWidth={2.5} className="mr-1.5 text-primary" /> {job.type}</div>
                   </div>
                 </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setApplyingJob(job)}
                  className="px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em]"
                  size="md"
                >
                  Apply Now
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Application / CV Upload Modal */}
      <AnimatePresence>
        {applyingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-3xl border border-white/10 max-w-lg w-full relative"
            >
              <button onClick={() => setApplyingJob(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                <X size={20} />
              </button>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-xs text-gray-400">Your profile and CV were sent to {applyingJob.company}.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Apply for Role</h2>
                    <p className="text-xs text-primary font-bold uppercase mt-1">{applyingJob.role} • {applyingJob.company}</p>
                  </div>

                  {/* CV Selection */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Attached Student CV</label>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-primary" />
                        <div>
                          <div className="text-xs font-bold text-white">{cvFile}</div>
                          <div className="text-[10px] text-gray-400">Default verified student resume</div>
                        </div>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && setCvFile(e.target.files[0].name)}
                        />
                        <span className="text-[10px] font-bold text-primary uppercase hover:underline">Change File</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Note / Pitch to Recruiter</label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Explain why you are the ideal candidate for this role..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-4 text-xs font-bold uppercase tracking-wider">
                    Submit Job Application
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Jobs;
