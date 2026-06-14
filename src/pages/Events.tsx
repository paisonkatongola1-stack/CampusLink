import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Share2, Bookmark } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Events = () => {
  const events = [
    { id: 1, title: "Zambia Tech Expo 2026", date: "Oct 24, 2026", time: "09:00 AM", venue: "UNZA Main Hall", organizer: "ICT Association", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Student Entrepreneurship Summit", date: "Nov 05, 2026", time: "10:30 AM", venue: "Mulungushi Conference", organizer: "Campus Ventures", image: "https://images.unsplash.com/photo-1475721027185-404119247ba7?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Freshers Welcome Party", date: "Sep 15, 2026", time: "07:00 PM", venue: "The Hub Garden", organizer: "Student Union", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tighter italic">Events <span className="text-primary italic-none">Hub</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium uppercase tracking-widest text-[10px]">Discover and participate in the biggest campus events, workshops, and networking sessions across Zambia.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="flex flex-col h-full group" hoverable={false}>
              <div className="relative h-72 overflow-hidden bg-white/5">
                 <img src={event.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={event.title} />
                 <div className="absolute top-6 right-6 flex space-x-2">
                   <button className="p-3 bg-black/40 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-primary transition-all">
                      <Bookmark size={18} strokeWidth={2.5} />
                   </button>
                   <button className="p-3 bg-black/40 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-primary transition-all">
                      <Share2 size={18} strokeWidth={2.5} />
                   </button>
                 </div>
                 <div className="absolute bottom-6 left-6">
                   <div className="bg-primary/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                      Featured Event
                   </div>
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                 <div className="flex items-center text-primary font-black text-[10px] uppercase tracking-widest mb-4">
                   <Calendar size={14} className="mr-2" /> {event.date} • {event.time}
                 </div>
                 <h3 className="text-2xl font-bold mb-4 tracking-tight">{event.title}</h3>
                 <div className="space-y-3 mb-10 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                   <div className="flex items-center"><MapPin size={16} className="mr-3 text-primary" /> {event.venue}</div>
                   <div className="flex items-center"><Users size={16} className="mr-3 text-primary" /> Organized by {event.organizer}</div>
                 </div>
                 <div className="mt-auto">
                   <Button className="w-full py-4" variant="primary" size="lg">
                      Register Now
                   </Button>
                 </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
