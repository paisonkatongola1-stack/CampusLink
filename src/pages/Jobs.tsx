import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';

const Jobs = () => {
  const { data, loading } = useCollection<JobListing>('jobs');

  const mockJobs: JobListing[] = [
    { id: '1', role: "Software Development Intern", company: "Zambia Tech Hub", location: "Remote / Lusaka", salary: "K4,000/mo", type: "Internship", tags: ["React", "Node.js"], postedAt: null },
    { id: '2', role: "Marketing Assistant", company: "Zed Media Group", location: "Lusaka", salary: "K2,500/mo", type: "Part-time", tags: ["Social Media", "Content"], postedAt: null },
    { id: '3', role: "Tutor (Mathematics)", company: "Private Client", location: "Kitwe", salary: "K150/hr", type: "Freelance", tags: ["Education"], postedAt: null },
  ];

  const jobs = data.length > 0 ? data : mockJobs;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Job <span className="text-primary">Hub</span></h1>
        <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">Discover career opportunities and student-friendly jobs</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Active Jobs", val: "124", icon: <Briefcase size={20} />, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Companies", val: "45", icon: <CheckCircle size={20} />, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "New Today", val: "12", icon: <Clock size={20} />, color: "text-accent", bg: "bg-accent/10" },
        ].map((s, i) => (
          <Card key={i} className="p-6 flex items-center space-x-4" hoverable={false}>
             <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}>{s.icon}</div>
             <div><div className="text-2xl font-black">{s.val}</div><div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{s.label}</div></div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-10">
         <div className="flex-1">
            <Input placeholder="Search roles or companies..." icon={<Search size={20} />} />
         </div>
         <div className="flex space-x-2">
           {['Internship', 'Part-time', 'Remote'].map(f => (
             <Button key={f} variant="glass" size="sm" className="text-[10px] uppercase tracking-widest">{f}</Button>
           ))}
         </div>
      </div>

      <div className="space-y-6">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0">
              <div className="flex items-center space-x-6">
                 <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent border border-white/5 rounded-2xl flex items-center justify-center text-2xl font-black text-primary">
                   {job.company.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-xl font-bold mb-1 tracking-tight">{job.role}</h3>
                   <p className="text-primary font-bold text-sm mb-3 uppercase tracking-tighter">{job.company}</p>
                   <div className="flex flex-wrap gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                     <div className="flex items-center"><MapPin size={14} className="mr-1.5 text-primary" /> {job.location}</div>
                     <div className="flex items-center"><DollarSign size={14} className="mr-1.5 text-primary" /> {job.salary}</div>
                     <div className="flex items-center"><Clock size={14} className="mr-1.5 text-primary" /> {job.type}</div>
                   </div>
                 </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button className="flex-1 md:flex-none" size="lg">
                  Apply Now
                </Button>
                <Button variant="glass" className="p-3">
                  <ArrowUpRight size={20} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
