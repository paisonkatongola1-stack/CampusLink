import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer } from '../utils/animations';

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
    </motion.div>
  );
};

export default Jobs;
