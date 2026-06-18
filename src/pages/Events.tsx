import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Share2, Bookmark, Search, Filter } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { fadeInUp, staggerContainer, hoverScale } from '../utils/animations';

const Events = () => {
  const events = [
    { id: 1, title: "Zambia Tech Expo 2026", date: "Oct 24, 2026", time: "09:00 AM", venue: "UNZA Main Hall", organizer: "ICT Association", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=800&q=80", category: "Tech" },
    { id: 2, title: "Student Entrepreneurship Summit", date: "Nov 05, 2026", time: "10:30 AM", venue: "Mulungushi Conference", organizer: "Campus Ventures", image: "https://images.unsplash.com/photo-1475721027185-404119247ba7?auto=format&fit=crop&w=800&q=80", category: "Business" },
    { id: 3, title: "Freshers Welcome Party", date: "Sep 15, 2026", time: "07:00 PM", venue: "The Hub Garden", organizer: "Student Union", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", category: "Social" },
    { id: 4, title: "Medical Research Symposium", date: "Dec 10, 2026", time: "08:30 AM", venue: "Apex Medical Campus", organizer: "Health Society", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80", category: "Education" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-6 md:space-y-0">
        <motion.div variants={fadeInUp}>
          <h1 className="text-5xl font-black mb-2 tracking-tight uppercase italic">Events <span className="text-primary italic-none">Hub</span></h1>
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Discover and participate in campus life</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex space-x-4">
           <Input
             placeholder="Search events..."
             icon={<Search size={20} strokeWidth={2.5} />}
             className="md:w-80 shadow-2xl"
           />
           <Button variant="glass" className="p-4 border-white/5">
              <Filter size={20} strokeWidth={2.5} />
           </Button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex space-x-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['All Events', 'Workshops', 'Social', 'Tech', 'Business', 'Sports'].map((cat, i) => (
          <button key={i} className={`px-8 py-3 rounded-2xl whitespace-nowrap border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'glass border-white/5 text-gray-500 hover:border-primary/40 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            variants={fadeInUp}
          >
            <Card className="flex flex-col h-full group relative overflow-hidden" hoverable={true}>
              <div className="relative h-72 overflow-hidden bg-white/5">
                 <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={event.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                 <div className="absolute top-6 right-6 flex space-x-3 z-10">
                   <motion.button {...hoverScale} className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl text-white border border-white/10 hover:bg-primary transition-all">
                      <Bookmark size={18} strokeWidth={2.5} />
                   </motion.button>
                   <motion.button {...hoverScale} className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl text-white border border-white/10 hover:bg-primary transition-all">
                      <Share2 size={18} strokeWidth={2.5} />
                   </motion.button>
                 </div>
                 <div className="absolute bottom-6 left-6 z-10">
                   <div className="bg-primary/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                      {event.category}
                   </div>
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col relative">
                 <div className="flex items-center text-primary font-black text-[10px] uppercase tracking-widest mb-4">
                   <Calendar size={14} className="mr-2" strokeWidth={2.5} /> {event.date} • {event.time}
                 </div>
                 <h3 className="text-2xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors">{event.title}</h3>
                 <div className="space-y-3 mb-10 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                   <div className="flex items-center"><MapPin size={16} strokeWidth={2.5} className="mr-3 text-primary" /> {event.venue}</div>
                   <div className="flex items-center"><Users size={16} strokeWidth={2.5} className="mr-3 text-primary" /> Organized by {event.organizer}</div>
                 </div>
                 <div className="mt-auto">
                   <Button className="w-full py-5 text-[10px] font-black uppercase tracking-[0.2em]" variant="primary" size="lg">
                      Register Now
                   </Button>
                 </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Events;
