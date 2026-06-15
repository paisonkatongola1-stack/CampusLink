import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, ShoppingBag, Briefcase, Calendar, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer, float, hoverScale } from '../utils/animations';

const Landing = () => {
  const features = [
    { icon: <ShoppingBag size={24} strokeWidth={2.5} />, title: "Student Marketplace", desc: "Buy and sell laptops, books, furniture and more." },
    { icon: <Building2 size={24} strokeWidth={2.5} />, title: "Accommodation Finder", desc: "Find trusted rooms and boarding houses near campus." },
    { icon: <Briefcase size={24} strokeWidth={2.5} />, title: "Job Hub", desc: "Discover internships and student jobs across Zambia." },
    { icon: <Building2 size={24} strokeWidth={2.5} />, title: "Business Directory", desc: "Connect with student-friendly businesses." },
    { icon: <Calendar size={24} strokeWidth={2.5} />, title: "Events Hub", desc: "Discover campus events and networking opportunities." },
    { icon: <Cpu size={24} strokeWidth={2.5} />, title: "AI Assistant", desc: "Study support, career guidance and recommendations." },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center"
    >
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

        <div className="lg:w-1/2 text-center lg:text-left z-10">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/10 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-8"
          >
            <Sparkles size={14} strokeWidth={2.5} className="mr-2" />
            Empowering Zambia's Future
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter"
          >
            Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Students</span>, Businesses & Accommodation Across Zambia
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-400 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Find accommodation, jobs, internships, services, events and opportunities all in one platform.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <Link to="/signup">
              <motion.button {...hoverScale} className="px-10 py-5 bg-accent rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center shadow-2xl shadow-accent/20">
                Get Started <ArrowRight size={18} strokeWidth={2.5} className="ml-2" />
              </motion.button>
            </Link>
            <Link to="/accommodation">
              <motion.button {...hoverScale} className="px-10 py-5 glass rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center border border-white/10 hover:bg-white/5">
                Explore Opportunities
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2 mt-20 lg:mt-0 relative"
        >
          {/* Floating Cards Mockup */}
          <div className="relative z-10 grid grid-cols-2 gap-6 p-4">
             <motion.div {...float} className="glass p-5 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl mb-4 flex items-center justify-center text-primary"><ShoppingBag size={24} strokeWidth={2.5} /></div>
                <div className="h-2 w-20 bg-white/20 rounded-full mb-2" />
                <div className="h-2 w-12 bg-white/10 rounded-full" />
             </motion.div>
             <motion.div
               animate={{ y: [0, 15, 0] }}
               transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: "easeInOut" }}
               className="glass p-5 rounded-[2rem] border border-white/10 shadow-2xl mt-16"
             >
                <div className="w-12 h-12 bg-accent/20 rounded-2xl mb-4 flex items-center justify-center text-accent"><Briefcase size={24} strokeWidth={2.5} /></div>
                <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded-full" />
             </motion.div>
             <motion.div
               animate={{ y: [0, -15, 0] }}
               transition={{ repeat: Infinity, duration: 5, delay: 1, ease: "easeInOut" }}
               className="glass p-5 rounded-[2rem] border border-white/10 shadow-2xl -mt-8"
             >
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl mb-4 flex items-center justify-center text-blue-500"><Building2 size={24} strokeWidth={2.5} /></div>
                <div className="h-2 w-20 bg-white/20 rounded-full mb-2" />
                <div className="h-2 w-12 bg-white/10 rounded-full" />
             </motion.div>
             <motion.div
               animate={{ y: [0, 20, 0] }}
               transition={{ repeat: Infinity, duration: 3.5, delay: 0.2, ease: "easeInOut" }}
               className="glass p-5 rounded-[2rem] border border-white/10 shadow-2xl mt-8"
             >
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl mb-4 flex items-center justify-center text-purple-500"><Calendar size={24} strokeWidth={2.5} /></div>
                <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded-full" />
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-[#05060B] py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 text-center">
          {[
            { label: "Verified Students", value: "5000+" },
            { label: "Active Businesses", value: "500+" },
            { label: "Room Listings", value: "2000+" },
            { label: "Jobs Posted", value: "1000+" },
            { label: "Events Monthly", value: "50+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter"
          >
            Everything a Student Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-400 font-medium uppercase tracking-widest text-xs"
          >
            All the tools and opportunities to excel in your campus life.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10, borderColor: 'rgba(46, 91, 255, 0.4)' }}
              className="glass p-10 rounded-[2.5rem] border border-white/5 transition-colors group cursor-default"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-16 px-6 bg-[#05060B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-black mb-6 md:mb-0 tracking-tighter italic">
            Campus<span className="text-primary italic-none">Link</span>
          </div>
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © 2026 CampusLink Zambia • Built for the next generation
          </div>
          <div className="flex space-x-8 mt-6 md:mt-0">
            {['Terms', 'Privacy', 'Contact'].map(link => (
              <Link key={link} to="#" className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">{link}</Link>
            ))}
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Landing;
