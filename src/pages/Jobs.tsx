import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, Upload, X, FileText } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Jobs = () => {
  const { data } = useCollection<JobListing>('jobs');
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

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
         <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
           {['All', 'Internship', 'Part-time', 'Remote'].map(f => (
             <Button
               key={f}
               variant={activeFilter === f ? 'primary' : 'glass'}
               onClick={() => setActiveFilter(f)}
               size="sm"
               className={`text-[10px] font-black uppercase tracking-[0.2em] border-white/5 whitespace-nowrap ${activeFilter === f ? 'shadow-lg shadow-primary/20' : ''}`}
             >
               {f}
             </Button>
           ))}
         </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mb-12">
         <Card className="p-8 bg-gradient-to-r from-primary/10 to-transparent border-primary/20 flex flex-col md:flex-row items-center justify-between" hoverable={false}>
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
               <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                  <FileText size={28} strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-xl font-bold tracking-tight">Land your dream job faster</h3>
                  <p className="text-gray-500 text-xs font-medium">Upload your CV to get noticed by top employers in Zambia.</p>
               </div>
            </div>
            <Button onClick={() => setIsCVModalOpen(true)} className="w-full md:w-auto px-10">
               <Upload size={18} strokeWidth={2.5} className="mr-2" /> Upload CV
            </Button>
         </Card>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-6">
        {jobs.filter(j => activeFilter === 'All' || j.type === activeFilter || (activeFilter === 'Remote' && j.location.includes('Remote'))).map((job, i) => (
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
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-lg"
             >
                <Card className="p-10 border-white/10 shadow-2xl text-center" hoverable={false}>
                   <button onClick={() => setIsCVModalOpen(false)} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors">
                      <X size={20} strokeWidth={2.5} />
                   </button>

                   <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-8 shadow-xl">
                      <Upload size={32} strokeWidth={2.5} />
                   </div>

                   <h2 className="text-2xl font-black mb-2 tracking-tight">Upload your CV</h2>
                   <p className="text-gray-500 text-sm font-medium mb-10 leading-relaxed px-4">Make yourself visible to recruiters. We support PDF, DOC, and DOCX formats up to 10MB.</p>

                   <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-12 mb-8 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
                      <FileText size={40} strokeWidth={2.5} className="mx-auto text-gray-600 mb-4 group-hover:text-primary transition-colors" />
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Drop your file here</p>
                      <p className="text-[10px] text-gray-700 mt-2 font-bold uppercase tracking-widest">or browse files</p>
                   </div>

                   <Button onClick={() => setIsCVModalOpen(false)} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                      Confirm Upload
                   </Button>
                </Card>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Jobs;
