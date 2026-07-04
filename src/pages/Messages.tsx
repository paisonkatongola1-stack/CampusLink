import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Phone, Video, Info, MoreVertical, Plus, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { fadeInUp, slideInLeft, scaleUp } from '../utils/animations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { onMessagesUpdate, sendMessage } from '../utils/firebaseUtils';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const contacts = [
    { id: "conv_1", name: "Mwaka Mutale", lastMsg: "Is the MacBook still available?", time: "12:45 PM", online: true, avatar: "MM" },
    { id: "conv_2", name: "John Banda (Landlord)", lastMsg: "You can come view the room at 2 PM.", time: "10:30 AM", online: false, avatar: "JB" },
    { id: "conv_3", name: "Zambia Tech Hub", lastMsg: "We have reviewed your application.", time: "Yesterday", online: true, avatar: "ZT" },
  ];

  useEffect(() => {
    if (activeChat) {
      setLoading(true);
      const unsubscribe = onMessagesUpdate(activeChat, (msgs) => {
        setMessages(msgs);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [activeChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!activeChat || !inputText.trim()) return;
    const text = inputText;
    setInputText("");
    await sendMessage(activeChat, text);
  };

  const activeContact = contacts.find(c => c.id === activeChat) || contacts[0];

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
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
             <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                <Send size={40} />
             </div>
             <h3 className="text-2xl font-black mb-2">Select a Conversation</h3>
             <p className="text-gray-500 text-sm font-medium max-w-xs">Choose a contact from the left to start messaging in real-time.</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-black border border-primary/20 shadow-lg">
                    {activeContact.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight">{activeContact.name}</h3>
                    <div className="flex items-center space-x-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${activeContact.online ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                        <p className={`text-[10px] font-black uppercase tracking-widest ${activeContact.online ? 'text-green-500' : 'text-gray-500'}`}>
                          {activeContact.online ? 'Active Now' : 'Offline'}
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

            <div className="flex-1 p-8 overflow-y-auto space-y-6 no-scrollbar bg-black/20">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                   <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30">
                   <p className="text-sm font-black uppercase tracking-widest">No messages yet</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`max-w-[70%] p-4 rounded-3xl text-sm font-medium shadow-xl ${
                        msg.senderId === user?.uid
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'glass border-white/10 text-white rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                      <div className={`text-[8px] mt-2 font-black uppercase tracking-tighter opacity-50 ${msg.senderId === user?.uid ? 'text-right' : 'text-left'}`}>
                        {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </div>
                    </motion.div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-white/5 bg-white/2">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-medium outline-none focus:border-primary/50 transition-all shadow-inner"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputText.trim()}
                    className="p-4 bg-primary rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={22} strokeWidth={2.5} />
                  </motion.button>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Messages;
