import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, ShoppingBag, Briefcase, Calendar, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const features = [
    { icon: <ShoppingBag className="text-primary" />, title: "Student Marketplace", desc: "Buy and sell laptops, books, furniture and more." },
    { icon: <Building2 className="text-primary" />, title: "Accommodation Finder", desc: "Find trusted rooms and boarding houses near campus." },
    { icon: <Briefcase className="text-primary" />, title: "Job Hub", desc: "Discover internships and student jobs across Zambia." },
    { icon: <Building2 className="text-primary" />, title: "Business Directory", desc: "Connect with student-friendly businesses." },
    { icon: <Calendar className="text-primary" />, title: "Events Hub", desc: "Discover campus events and networking opportunities." },
    { icon: <Cpu className="text-primary" />, title: "AI Assistant", desc: "Study support, career guidance and recommendations." },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/10 text-primary font-medium text-sm mb-6"
          >
            <Sparkles size={16} className="mr-2" />
            Empowering Zambia's Future
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Students</span>, Businesses & Accommodations
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">
            Find accommodation, jobs, internships, services, events and opportunities all in one platform designed for the modern Zambian student.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <Link to="/signup" className="px-8 py-4 bg-accent rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center">
              Get Started <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link to="/accommodation" className="px-8 py-4 glass rounded-xl font-bold hover:bg-white/5 transition-all flex items-center justify-center border border-white/10">
              Explore Opportunities
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 mt-20 lg:mt-0 relative"
        >
          {/* Floating Cards Mockup */}
          <div className="relative z-10 grid grid-cols-2 gap-4">
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="glass p-4 rounded-2xl border border-white/10 shadow-2xl">
                <div className="w-10 h-10 bg-primary rounded-lg mb-3 flex items-center justify-center text-white font-bold">K</div>
                <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                <div className="h-2 w-12 bg-white/10 rounded" />
             </motion.div>
             <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0.5 }} className="glass p-4 rounded-2xl border border-white/10 shadow-2xl mt-12">
                <div className="w-10 h-10 bg-accent rounded-lg mb-3 flex items-center justify-center"><Briefcase size={20} /></div>
                <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded" />
             </motion.div>
             <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="glass p-4 rounded-2xl border border-white/10 shadow-2xl -mt-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg mb-3 flex items-center justify-center"><Building2 size={20} /></div>
                <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                <div className="h-2 w-12 bg-white/10 rounded" />
             </motion.div>
             <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.2 }} className="glass p-4 rounded-2xl border border-white/10 shadow-2xl mt-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg mb-3 flex items-center justify-center"><ShoppingBag size={20} /></div>
                <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded" />
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-surface py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            { label: "Students", value: "5000+" },
            { label: "Businesses", value: "500+" },
            { label: "Accommodations", value: "2000+" },
            { label: "Jobs Posted", value: "1000+" },
            { label: "Campus Events", value: "50+" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
              <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Everything a Student Needs</h2>
          <p className="text-gray-400">All the tools and opportunities to excel in your campus life.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all hover:translate-y-[-5px]"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full glass border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-extrabold mb-4 md:mb-0">
            Campus<span className="text-primary">Link</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2026 CampusLink Zambia. Connecting the next generation.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
