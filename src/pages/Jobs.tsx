import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';

const Jobs = () => {
  const jobs = [
    { id: 1, role: "Software Development Intern", company: "Zambia Tech Hub", location: "Remote / Lusaka", salary: "K4,000/mo", type: "Internship", tags: ["React", "Node.js"] },
    { id: 2, role: "Marketing Assistant", company: "Zed Media Group", location: "Lusaka", salary: "K2,500/mo", type: "Part-time", tags: ["Social Media", "Content"] },
    { id: 3, role: "Tutor (Mathematics)", company: "Private Client", location: "Kitwe", salary: "K150/hr", type: "Freelance", tags: ["Education"] },
    { id: 4, role: "Customer Service Rep", company: "FinTech Solutions", location: "Lusaka", salary: "K5,500/mo", type: "Full-time", tags: ["Support"] },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Job Hub</h1>
        <p className="text-gray-400">Discover career opportunities and student-friendly jobs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="glass p-6 rounded-3xl border border-white/10 flex items-center space-x-4">
           <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center"><Briefcase /></div>
           <div><div className="text-2xl font-bold">124</div><div className="text-xs text-gray-500">Active Jobs</div></div>
        </div>
        <div className="glass p-6 rounded-3xl border border-white/10 flex items-center space-x-4">
           <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center"><CheckCircle /></div>
           <div><div className="text-2xl font-bold">45</div><div className="text-xs text-gray-500">Companies Hiring</div></div>
        </div>
        <div className="glass p-6 rounded-3xl border border-white/10 flex items-center space-x-4">
           <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center"><Clock /></div>
           <div><div className="text-2xl font-bold">12</div><div className="text-xs text-gray-500">New Today</div></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-10">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input type="text" placeholder="Search roles or companies..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all" />
         </div>
         <div className="flex space-x-2">
           {['Internship', 'Part-time', 'Remote'].map(f => (
             <button key={f} className="px-5 py-2 glass border border-white/10 rounded-2xl text-sm hover:border-primary/50 transition-all">{f}</button>
           ))}
         </div>
      </div>

      <div className="space-y-6">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0"
          >
            <div className="flex items-center space-x-6">
               <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">
                 {job.company.charAt(0)}
               </div>
               <div>
                 <h3 className="text-xl font-bold mb-1">{job.role}</h3>
                 <p className="text-primary font-medium mb-3">{job.company}</p>
                 <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                   <div className="flex items-center"><MapPin size={14} className="mr-1" /> {job.location}</div>
                   <div className="flex items-center"><DollarSign size={14} className="mr-1" /> {job.salary}</div>
                   <div className="flex items-center"><Clock size={14} className="mr-1" /> {job.type}</div>
                 </div>
               </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex-1 md:flex-none px-8 py-3 bg-primary rounded-xl font-bold hover:bg-primary-dark transition-all">
                Apply Now
              </button>
              <button className="p-3 glass border border-white/10 rounded-xl hover:bg-white/5 transition-all text-gray-400">
                <ArrowUpRight size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
