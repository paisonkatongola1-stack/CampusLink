import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Phone, Video, Info, MoreVertical, Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { fadeInUp, slideInLeft } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState([
    {
      id: 0,
      name: "Mwaka Mutale",
      messages: [
        { text: "Hi! Is the MacBook Pro still available? I'm interested.", sender: 'them' },
        { text: "Yes, it is! It's in perfect condition. Are you currently on campus?", sender: 'me' },
        { text: "Yes, I'm at UNZA. Can I see it tomorrow morning?", sender: 'them' }
      ],
      online: true,
      avatar: "MM"
    },
    {
      id: 1,
      name: "John Banda (Landlord)",
      messages: [
        { text: "The room at Riverside is available for viewing.", sender: 'them' }
      ],
      online: false,
      avatar: "JB"
    },
    {
      id: 2,
      name: "Zambia Tech Hub",
      messages: [
        { text: "We have reviewed your application and would like to schedule an interview.", sender: 'them' }
      ],
      online: true,
      avatar: "ZT"
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChat]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newChats = [...chats];
    newChats[activeChat].messages.push({ text: input, sender: 'me' });
    setChats(newChats);
    setInput("");

    // Simulated reply
    setTimeout(() => {
      const updatedChats = [...chats];
      updatedChats[activeChat].messages.push({
        text: "Thanks! I'll get back to you shortly regarding that.",
        sender: 'them'
      });
      setChats(updatedChats);
    }, 2000);
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" placeholder="Search conversations..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium outline-none focus:border-primary transition-all" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {chats.map((contact, idx) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(idx)}
              className={`w-full p-6 flex items-center space-x-5 border-b border-white/5 transition-all ${activeChat === idx ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-white/5'}`}
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
                  <span className="text-[10px] font-black text-gray-500 uppercase">12:45 PM</span>
                </div>
                <p className="text-xs text-gray-400 truncate font-medium">{contact.messages[contact.messages.length - 1].text}</p>
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
                 {chats[activeChat].avatar}
              </div>
              <div>
                 <h3 className="font-bold text-base tracking-tight">{chats[activeChat].name}</h3>
                 <div className="flex items-center space-x-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${chats[activeChat].online ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                    <p className={`text-[10px] font-black uppercase tracking-widest ${chats[activeChat].online ? 'text-green-500' : 'text-gray-500'}`}>
                      {chats[activeChat].online ? 'Active Now' : 'Offline'}
                    </p>
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
           {chats[activeChat].messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   className={`max-w-[70%] p-4 rounded-3xl text-sm font-medium shadow-xl ${
                     msg.sender === 'me'
                       ? 'bg-primary text-white rounded-tr-none shadow-primary/20'
                       : 'glass border-white/10 rounded-tl-none'
                   }`}
                 >
                   {msg.text}
                 </motion.div>
              </div>
           ))}
           <div ref={chatEndRef} />
        </div>

        <div className="p-6 border-t border-white/5 bg-white/2">
           <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-medium outline-none focus:border-primary/50 transition-all shadow-inner"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-4 bg-primary rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 text-white"
              >
                 <Send size={22} strokeWidth={2.5} />
              </motion.button>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Messages;
