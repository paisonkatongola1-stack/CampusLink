import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Phone, Video, Info, MoreVertical, Plus } from 'lucide-react';
import { useState } from 'react';
import { fadeInUp, slideInLeft, scaleUp } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [inputMsg, setInputMsg] = useState('');
  const [conversations, setConversations] = useState<Record<number, Array<{ sender: 'me' | 'them'; text: string; time: string }>>>({
    0: [
      { sender: 'them', text: "Hi! Is the MacBook Pro still available? I'm interested and would like to see it.", time: "12:40 PM" },
      { sender: 'me', text: "Yes, it is! It's in perfect condition. Are you currently on campus?", time: "12:42 PM" },
      { sender: 'them', text: "Yes, I'm at UNZA. Can I see it tomorrow morning?", time: "12:45 PM" }
    ],
    1: [
      { sender: 'them', text: "Hello! Thank you for inquiring about Silverest Executive Lodge.", time: "10:15 AM" },
      { sender: 'me', text: "Hi Mr. Banda, is the room self-contained and does rent include power and water?", time: "10:20 AM" },
      { sender: 'them', text: "You can come view the room at 2 PM. Yes, utilities are covered.", time: "10:30 AM" }
    ],
    2: [
      { sender: 'them', text: "We have reviewed your application for Software Development Intern.", time: "Yesterday" },
      { sender: 'me', text: "Thank you for the update! When can we schedule the technical assessment?", time: "Yesterday" }
    ]
  });

  const contacts = [
    { id: 0, name: "Mwaka Mutale", role: "Student Seller", lastMsg: "Yes, I'm at UNZA. Can I see it tomorrow morning?", time: "12:45 PM", online: true, avatar: "MM" },
    { id: 1, name: "John Banda (Landlord)", role: "Silverest Hostels", lastMsg: "You can come view the room at 2 PM. Yes, utilities are covered.", time: "10:30 AM", online: false, avatar: "JB" },
    { id: 2, name: "Zambia Tech Hub", role: "Employer Recruiter", lastMsg: "We have reviewed your application.", time: "Yesterday", online: true, avatar: "ZT" },
  ];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMessage = {
      sender: 'me' as const,
      text: inputMsg.trim(),
      time: 'Just now'
    };

    setConversations(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    setInputMsg('');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-6 h-[88vh] flex space-x-6"
    >
      {/* Sidebar / Inbox */}
      <motion.div variants={slideInLeft} className="w-full lg:w-1/3 flex flex-col glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black tracking-tight">Messages</h2>
              <button className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                <Plus size={20} strokeWidth={2.5} />
              </button>
           </div>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} strokeWidth={2.5} />
              <input type="text" placeholder="Search conversations..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium outline-none focus:border-primary transition-all" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`w-full p-6 flex items-center space-x-5 border-b border-white/5 transition-all ${activeChat === contact.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-white/5'}`}
            >
              <div className="relative">
                <div className="w-14 h-14 bg-surface-bright rounded-2xl flex items-center justify-center font-black text-sm border border-white/10 shadow-lg">
                   {contact.avatar}
                </div>
                {contact.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0A0B14] rounded-full shadow-lg" />}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm tracking-tight">{contact.name}</h4>
                  <span className="text-[10px] font-black text-gray-500 uppercase">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-400 truncate font-medium">{contact.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chat View */}
      <motion.div variants={fadeInUp} className="hidden lg:flex flex-col flex-1 glass rounded-[2.5rem] border border-white/5 overflow-hidden relative">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
           <div className="flex items-center space-x-5">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-black border border-primary/20 shadow-lg">
                 {contacts[activeChat].avatar}
              </div>
              <div>
                 <h3 className="font-bold text-base tracking-tight">{contacts[activeChat].name}</h3>
                 <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Active Now</p>
                 </div>
              </div>
           </div>
           <div className="flex items-center space-x-3">
              {[Phone, Video, Info, MoreVertical].map((Icon, idx) => (
                <button key={idx} className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <Icon size={20} strokeWidth={2.5} />
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto space-y-6 no-scrollbar">
           <AnimatePresence mode="wait">
             <div key={activeChat} className="space-y-4">
                {(conversations[activeChat] || []).map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-4 rounded-3xl text-sm font-medium shadow-xl ${
                      msg.sender === 'me'
                        ? 'bg-primary text-white rounded-tr-none shadow-primary/20'
                        : 'glass border-white/10 text-gray-200 rounded-tl-none'
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`block text-[9px] mt-1 text-right uppercase tracking-wider ${
                        msg.sender === 'me' ? 'text-white/60' : 'text-gray-400'
                      }`}>{msg.time}</span>
                    </div>
                  </div>
                ))}
             </div>
           </AnimatePresence>
        </div>

        <form onSubmit={handleSendMessage} className="p-6 border-t border-white/5 bg-white/2">
           <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-medium outline-none focus:border-primary/50 transition-all text-white"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-primary rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 text-white"
              >
                 <Send size={22} strokeWidth={2.5} />
              </motion.button>
           </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Messages;
