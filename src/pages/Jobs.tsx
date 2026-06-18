import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, Filter } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';

const Jobs = () => {
  const { data } = useCollection<JobListing>('jobs');

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
        <motion.h1 variants={fadeInUp} className="text-5xl font-black mb-2 tracking-tight uppercase italic">Job <span className="text-primary italic-none">Hub</span></motion.h1>
        <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Discover career opportunities and student-friendly jobs</motion.p>
      </div>

      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { label: "Active Jobs", val: "124", icon: <Briefcase size={24} strokeWidth={2.5} />, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Companies", val: "45", icon: <CheckCircle size={24} strokeWidth={2.5} />, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "New Today", val: "12", icon: <Clock size={24} strokeWidth={2.5} />, color: "text-accent", bg: "bg-accent/10" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="p-10 flex flex-col items-center text-center space-y-6 relative overflow-hidden" hoverable={true}>
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 blur-2xl rounded-full" />
               <div className={`w-16 h-16 ${s.bg} ${s.color} rounded-[1.5rem] flex items-center justify-center shadow-xl border border-white/5`}>{s.icon}</div>
               <div>
                 <div className="text-4xl font-black tracking-tighter mb-1">{s.val}</div>
                 <div className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">{s.label}</div>
               </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-16">
         <div className="flex-1">
            <Input placeholder="Search roles or companies..." icon={<Search size={20} strokeWidth={2.5} />} className="shadow-2xl" />
         </div>
         <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
           {['Internship', 'Part-time', 'Remote', 'Freelance'].map(f => (
             <Button key={f} variant="glass" size="sm" className="text-[9px] font-black uppercase tracking-[0.2em] border-white/5 whitespace-nowrap px-6">{f}</Button>
           ))}
         </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-8">
        {jobs.map((job, i) => (
          <motion.div key={job.id} variants={fadeInUp}>
            <Card className="p-10 flex flex-col md:flex-row md:items-center justify-between space-y-10 md:space-y-0 group relative overflow-hidden" hoverable={true}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex items-center space-x-10 z-10">
                 <div className="w-24 h-24 bg-surface-bright border border-white/5 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-primary shadow-2xl group-hover:scale-105 transition-transform">
                   {job.company.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">{job.role}</h3>
                   <p className="text-primary font-black text-xs mb-6 uppercase tracking-[0.2em]">{job.company}</p>
                   <div className="flex flex-wrap gap-8 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                     <div className="flex items-center"><MapPin size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.location}</div>
                     <div className="flex items-center"><DollarSign size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.salary}</div>
                     <div className="flex items-center"><Clock size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.type}</div>
                   </div>
                 </div>
              </div>
              <div className="flex items-center space-x-4 z-10">
                <motion.button {...hoverScale} className="flex-1 md:flex-none px-12 py-5 bg-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20">
                  Apply Now
                </motion.button>
                <motion.button {...hoverScale} className="p-5 glass border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                  <ArrowUpRight size={22} strokeWidth={2.5} />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Jobs;
