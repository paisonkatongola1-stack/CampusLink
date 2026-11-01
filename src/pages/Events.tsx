import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Share2, Bookmark, CheckCircle, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Events = () => {
  const [savedEvents, setSavedEvents] = useState<number[]>([1]);
  const [registeringEvent, setRegisteringEvent] = useState<any | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const events = [
    { id: 1, title: "Zambia Tech Expo 2026", date: "Oct 24, 2026", time: "09:00 AM", venue: "UNZA Main Hall", organizer: "ICT Association", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=800&q=80", attendees: "450+ registered" },
    { id: 2, title: "Student Entrepreneurship Summit", date: "Nov 05, 2026", time: "10:30 AM", venue: "Mulungushi Conference", organizer: "Campus Ventures", image: "https://images.unsplash.com/photo-1475721027185-404119247ba7?auto=format&fit=crop&w=800&q=80", attendees: "300+ registered" },
    { id: 3, title: "Freshers Welcome & Career Fest", date: "Sep 15, 2026", time: "07:00 PM", venue: "CBU Amphitheatre, Kitwe", organizer: "Student Union", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", attendees: "800+ registered" },
  ];

  const toggleSave = (id: number) => {
    setSavedEvents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleShare = (id: number) => {
    setCopiedId(id);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegisterConfirm = () => {
    if (registeringEvent) {
      setRegisteredEvents(prev => [...prev, registeringEvent.id]);
      setRegisteringEvent(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tighter italic">Events <span className="text-primary not-italic">Hub</span></h1>
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
                   <button
                     onClick={() => toggleSave(event.id)}
                     className={`p-3 backdrop-blur-xl rounded-full border border-white/10 transition-all ${
                       savedEvents.includes(event.id) ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-primary'
                     }`}
                     title="Save Event"
                   >
                      <Bookmark size={18} strokeWidth={2.5} fill={savedEvents.includes(event.id) ? "currentColor" : "none"} />
                   </button>
                   <button
                     onClick={() => handleShare(event.id)}
                     className="p-3 bg-black/50 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-primary transition-all relative"
                     title="Share Event Link"
                   >
                      <Share2 size={18} strokeWidth={2.5} />
                      {copiedId === event.id && (
                        <span className="absolute -bottom-8 right-0 bg-black px-2 py-1 rounded text-[9px] font-bold text-white whitespace-nowrap">Copied!</span>
                      )}
                   </button>
                 </div>
                 <div className="absolute bottom-6 left-6">
                   <div className="bg-primary/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10 text-white">
                      Featured Event
                   </div>
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                 <div className="flex items-center text-primary font-black text-[10px] uppercase tracking-widest mb-3">
                   <Calendar size={14} className="mr-2" /> {event.date} • {event.time}
                 </div>
                 <h3 className="text-xl font-bold mb-3 tracking-tight text-white">{event.title}</h3>
                 <div className="space-y-2 mb-8 text-gray-400 text-xs font-medium">
                   <div className="flex items-center"><MapPin size={14} className="mr-2 text-primary" /> {event.venue}</div>
                   <div className="flex items-center"><Users size={14} className="mr-2 text-primary" /> Organized by {event.organizer}</div>
                 </div>
                 <div className="mt-auto">
                   {registeredEvents.includes(event.id) ? (
                     <div className="w-full py-3.5 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center font-bold text-xs uppercase tracking-wider border border-green-500/30">
                       <CheckCircle size={16} className="mr-2" /> Ticket Confirmed
                     </div>
                   ) : (
                     <Button
                       onClick={() => setRegisteringEvent(event)}
                       className="w-full py-4 text-xs font-bold uppercase tracking-wider"
                       variant="primary"
                       size="lg"
                     >
                        Register Now
                     </Button>
                   )}
                 </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {registeringEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-3xl border border-white/10 max-w-md w-full relative"
            >
              <button onClick={() => setRegisteringEvent(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-black text-white mb-1">Confirm Registration</h3>
              <p className="text-xs text-primary font-bold uppercase mb-4">{registeringEvent.title}</p>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 mb-6 text-xs text-gray-300">
                <p><strong>Venue:</strong> {registeringEvent.venue}</p>
                <p><strong>Date & Time:</strong> {registeringEvent.date} at {registeringEvent.time}</p>
                <p><strong>Cost:</strong> Free Student Admission (with student ID)</p>
              </div>

              <Button onClick={handleRegisterConfirm} className="w-full py-4 text-xs font-bold uppercase tracking-wider">
                Claim Student Ticket
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
