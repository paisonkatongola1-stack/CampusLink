import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Clock, CheckCircle, ArrowUpRight, Upload, Check, AlertCircle, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { JobListing } from '../types';
import { fadeInUp, staggerContainer, scaleUp } from '../utils/animations';

interface CustomJobListing extends Omit<JobListing, 'type'> {
  type: 'Internship' | 'Part-time' | 'Full-time' | 'Freelance' | 'Remote';
  requirements: string[];
}

const Jobs = () => {
  const { data } = useCollection<CustomJobListing>('jobs');

  const mockJobs: CustomJobListing[] = [
    { id: '1', role: "Software Development Intern", company: "Zambia Tech Hub", location: "Remote / Lusaka", salary: "K4,000/mo", type: "Internship", tags: ["React", "Node.js", "Firebase"], requirements: ["Basic understanding of JavaScript and HTML/CSS", "Familiarity with React or React Native", "Passionate about building modern applications"], postedAt: null },
    { id: '2', role: "Marketing Assistant", company: "Zed Media Group", location: "Lusaka", salary: "K2,500/mo", type: "Part-time", tags: ["Social Media", "Content", "SEO"], requirements: ["Excellent communication and copywriting skills", "Familiarity with Canva or Adobe Photoshop", "Active social media presence"], postedAt: null },
    { id: '3', role: "Tutor (Mathematics)", company: "Private Client", location: "Kitwe", salary: "K150/hr", type: "Freelance", tags: ["Education", "Tutoring"], requirements: ["Excellent grades in university level algebra and calculus", "Prior tutoring experience is an added bonus", "Punctual and patient with students"], postedAt: null },
    { id: '4', role: "Junior QA Engineer", company: "Infratel Zambia", location: "Remote", salary: "K6,500/mo", type: "Remote", tags: ["Testing", "Quality Assurance", "Agile"], requirements: ["Detail-oriented analytical approach", "Familiarity with automated testing tools", "Understand Software Development Lifecycle (SDLC)"], postedAt: null },
    { id: '5', role: "Human Resources Coordinator", company: "Copperbelt Mining Co.", location: "Kitwe", salary: "K8,000/mo", type: "Full-time", tags: ["Management", "HR"], requirements: ["Currently pursuing or completed Business Admin or HR degree", "Strong organizing skills", "Based in Kitwe"], postedAt: null }
  ];

  const jobs = data.length > 0 ? (data as unknown as CustomJobListing[]) : mockJobs;

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('All');

  // CV Upload UI State
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);

  // Application Modal State
  const [applyingJob, setApplyingJob] = useState<CustomJobListing | null>(null);
  const [applyStep, setApplyStep] = useState<1 | 2>(1); // 1 = Details/Upload CV, 2 = Success
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  // Handle fake CV upload from standard CV Hub UI
  const handleCVFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(file);
      setCvUploading(true);
      setTimeout(() => {
        setCvUploading(false);
        setCvUploaded(true);
      }, 1500);
    }
  };

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTypeFilter !== 'All') {
      if (job.type.toLowerCase() !== activeTypeFilter.toLowerCase()) return false;
    }

    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvUploaded && !cvFile) {
      alert("Please upload your CV to complete the application.");
      return;
    }
    setApplyStep(2);
  };

  const closeApplyModal = () => {
    setApplyingJob(null);
    setApplyStep(1);
    setApplicantName('');
    setApplicantEmail('');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-6 py-10"
    >
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
        <div>
          <motion.h1 variants={fadeInUp} className="text-4xl font-black mb-2 tracking-tight">Job <span className="text-primary">Hub</span></motion.h1>
          <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Discover career opportunities and student-friendly jobs</motion.p>
        </div>

        {/* Global CV Upload / Status bar */}
        <motion.div variants={fadeInUp} className="glass border border-white/5 p-4 rounded-2xl flex items-center space-x-4 max-w-sm">
          <div className="p-2 bg-primary/20 text-primary rounded-xl">
            <Upload size={18} strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold tracking-tight truncate">
              {cvUploaded ? (cvFile ? cvFile.name : "CV_Resume_Chanda.pdf") : "Upload your master CV"}
            </h4>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
              {cvUploaded ? "Uploaded successfully" : "Ready for quick applications"}
            </p>
          </div>
          <div>
            <label className="cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-xl transition-all block text-center">
              {cvUploading ? "Uploading..." : cvUploaded ? "Replace" : "Browse"}
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCVFileChange} />
            </label>
          </div>
        </motion.div>
      </div>

      {/* Stats Board */}
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

      {/* Filter and Search Bar */}
      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-12">
         <div className="flex-1">
            <Input
              placeholder="Search roles, companies, or tags..."
              icon={<Search size={20} strokeWidth={2.5} />}
              className="shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex flex-wrap gap-2">
           {['All', 'Internship', 'Part-time', 'Freelance', 'Remote'].map(f => (
             <Button
               key={f}
               onClick={() => setActiveTypeFilter(f)}
               variant={activeTypeFilter === f ? 'primary' : 'glass'}
               size="sm"
               className="text-[10px] font-black uppercase tracking-[0.2em] border-white/5"
             >
               {f}
             </Button>
           ))}
         </div>
      </motion.div>

      {/* Jobs Feed */}
      <motion.div variants={staggerContainer} className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 glass border border-white/5 rounded-[2.5rem]">
             <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No job listings found matching your criteria</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <motion.div key={job.id} variants={fadeInUp} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Card className="p-8 flex flex-col md:flex-row md:items-center justify-between space-y-8 md:space-y-0 relative overflow-hidden group">
                <div className="flex items-center space-x-8">
                   <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent border border-white/5 rounded-[1.5rem] flex items-center justify-center text-3xl font-black text-primary shadow-2xl relative">
                     {job.company.charAt(0)}
                     <div className="absolute inset-0 bg-primary/5 rounded-[1.5rem] scale-90 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
                   </div>
                   <div>
                     <div className="flex items-center space-x-3 mb-1">
                       <h3 className="text-2xl font-bold tracking-tight">{job.role}</h3>
                       {job.type === 'Remote' && (
                         <span className="bg-green-500/15 border border-green-500/20 text-green-500 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                           {job.type}
                         </span>
                       )}
                     </div>
                     <p className="text-primary font-black text-xs mb-5 uppercase tracking-[0.2em]">{job.company}</p>

                     {/* Tags list */}
                     <div className="flex flex-wrap gap-2 mb-5">
                       {job.tags.map((tag, idx) => (
                         <span key={idx} className="bg-white/5 text-gray-400 text-[9px] font-bold px-3 py-1 rounded-xl border border-white/5">
                           #{tag}
                         </span>
                       ))}
                     </div>

                     <div className="flex flex-wrap gap-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                       <div className="flex items-center"><MapPin size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.location}</div>
                       <div className="flex items-center"><DollarSign size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.salary}</div>
                       <div className="flex items-center"><Clock size={14} strokeWidth={2.5} className="mr-2 text-primary" /> {job.type}</div>
                     </div>
                   </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setApplyingJob(job)}
                    className="flex-1 md:flex-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em]"
                    size="lg"
                  >
                    Apply Now
                  </Button>
                  <Button variant="glass" className="p-4 border-white/5" onClick={() => setApplyingJob(job)}>
                    <ArrowUpRight size={22} strokeWidth={2.5} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Application Dialog Modal */}
      <AnimatePresence>
        {applyingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass border border-white/10 rounded-[2.5rem] max-w-xl w-full p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Accent Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

              <button
                onClick={closeApplyModal}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              {applyStep === 1 ? (
                <div>
                  <div className="mb-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-xl border border-primary/20 inline-block">
                      Job Application
                    </span>
                    <h3 className="text-2xl font-black mt-4 tracking-tight">{applyingJob.role}</h3>
                    <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">{applyingJob.company}</p>
                  </div>

                  <div className="mb-6 space-y-3">
                    <h4 className="text-[10px] text-gray-400 uppercase font-black tracking-widest flex items-center">
                      <Sparkles size={12} strokeWidth={2.5} className="mr-2 text-primary animate-pulse" /> Requirements
                    </h4>
                    <ul className="space-y-2">
                      {applyingJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start text-xs font-medium text-gray-300">
                          <Check size={14} strokeWidth={3} className="mr-2.5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="border-white/5 my-6" />

                  <form onSubmit={handleApplySubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Full Name</label>
                        <Input
                          placeholder="Your name"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Email Address</label>
                        <Input
                          type="email"
                          placeholder="your.email@university.edu"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">CV / Resume</label>

                      {cvUploaded ? (
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-green-500">
                            <CheckCircle size={18} strokeWidth={2.5} />
                            <span className="text-xs font-bold truncate">{cvFile ? cvFile.name : "CV_Resume_Chanda.pdf"}</span>
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-2.5 py-1 rounded-lg">Ready</span>
                        </div>
                      ) : (
                        <div className="border border-dashed border-white/25 hover:border-primary/50 transition-colors rounded-2xl p-6 text-center relative group">
                          <input type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCVFileChange} />
                          <Upload size={28} strokeWidth={2.5} className="mx-auto text-gray-500 group-hover:text-primary transition-colors mb-2" />
                          <p className="text-xs font-bold text-gray-300">Click to upload your CV (PDF, DOCX)</p>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Files up to 5MB</p>
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                      Submit Job Application
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-green-500/15 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                    <CheckCircle size={40} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-2xl font-black tracking-tight">Application Submitted!</h4>
                  <p className="text-gray-400 text-sm font-medium mt-3 max-w-sm mx-auto">
                    Awesome, {applicantName || "Chanda"}! Your application for <strong>{applyingJob.role}</strong> at <strong>{applyingJob.company}</strong> was delivered successfully.
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-6">
                    Check your profile dashboard or notifications for updates
                  </p>
                  <Button onClick={closeApplyModal} variant="glass" className="mt-8 px-8 py-3.5 text-[10px] font-black uppercase tracking-widest border-white/10 hover:bg-white/5">
                    Close Window
                  </Button>
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
