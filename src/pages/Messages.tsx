import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Phone, Video, Info, MoreVertical, Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { fadeInUp, slideInLeft, scaleUp } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { db, sendMessage } from '../utils/firebaseUtils';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { ChatMessage } from '../types';

const Messages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const contacts = [
    { id: 0, uid: "mock-1", name: "Mwaka Mutale", lastMsg: "Is the MacBook still available?", time: "12:45 PM", online: true, avatar: "MM" },
    { id: 1, uid: "mock-2", name: "John Banda (Landlord)", lastMsg: "You can come view the room at 2 PM.", time: "10:30 AM", online: false, avatar: "JB" },
    { id: 2, uid: "mock-3", name: "Zambia Tech Hub", lastMsg: "We have reviewed your application.", time: "Yesterday", online: true, avatar: "ZT" },
  ];

  useEffect(() => {
    if (!user) return;

    // Fetch messages where current user is either sender or receiver
    // Filter by the active contact in memory for the MVP
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeContactUid = contacts[activeChat].uid;
      const msgs = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage))
        .filter(msg =>
          (msg.senderId === user.uid && msg.receiverId === activeContactUid) ||
          (msg.senderId === activeContactUid && msg.receiverId === user.uid)
        );
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !user) return;
    const receiverUid = contacts[activeChat].uid;
    try {
      await sendMessage(receiverUid, inputText);
      setInputText("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
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

        <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 no-scrollbar">
           <AnimatePresence mode="wait">
             <div key={activeChat} className="space-y-6">
                {/* Mock historical messages */}
                <div className="flex justify-start">
                   <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-[70%] glass p-4 rounded-3xl rounded-tl-none text-sm font-medium border-white/10 shadow-xl">
                     Hi! Is the MacBook Pro still available? I'm interested and would like to see it.
                   </motion.div>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`max-w-[70%] p-4 rounded-3xl text-sm font-medium shadow-xl ${
                        msg.senderId === user?.uid
                        ? 'bg-primary rounded-tr-none shadow-primary/20'
                        : 'glass border-white/10 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                  </div>
                ))}
             </div>
           </AnimatePresence>
        </div>

        <div className="p-6 border-t border-white/5 bg-white/2">
           <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-medium outline-none focus:border-primary/50 transition-all shadow-inner"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
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
