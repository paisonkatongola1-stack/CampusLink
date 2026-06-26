import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Phone, Video, Info, MoreVertical, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fadeInUp, slideInLeft, scaleUp } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import { useCollection } from '../hooks/useData';
import { where, orderBy } from 'firebase/firestore';
import { sendMessage } from '../utils/firebaseUtils';

const Messages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<any>(null);
  const [input, setInput] = useState("");

  const { data: conversations } = useCollection('conversations', [
    where('participants', 'array-contains', user?.uid),
    orderBy('updatedAt', 'desc')
  ]);

  const { data: messages } = useCollection('messages', activeChat ? [
    where('conversationId', '==', activeChat.id),
    orderBy('timestamp', 'asc')
  ] : []);

  const handleSendMessage = async () => {
    if (!input.trim() || !activeChat) return;
    await sendMessage(activeChat.id, input);
    setInput("");
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
          {conversations.map((conv: any) => {
            const otherParticipantId = conv.participants.find((p: string) => p !== user?.uid);
            const otherParticipant = conv.participantData?.[otherParticipantId] || {};

            return (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`w-full p-6 flex items-center space-x-5 border-b border-white/5 transition-all ${activeChat?.id === conv.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-white/5'}`}
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-surface-bright rounded-2xl flex items-center justify-center font-black text-sm border border-white/10 shadow-lg overflow-hidden">
                    {otherParticipant.photoURL ? (
                      <img src={otherParticipant.photoURL} className="w-full h-full object-cover" alt="Avatar" />
                    ) : (
                      (otherParticipant.name || "CH").substring(0, 2).toUpperCase()
                    )}
                  </div>
                  {conv.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0A0B14] rounded-full shadow-lg" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm tracking-tight">{otherParticipant.name || "Conversation"}</h4>
                    <span className="text-[10px] font-black text-gray-500 uppercase">
                      {conv.updatedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate font-medium">{conv.lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Chat View */}
      <motion.div variants={fadeInUp} className="hidden lg:flex flex-col flex-1 glass rounded-[2.5rem] border border-white/5 overflow-hidden relative">
        {!activeChat ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 font-black uppercase tracking-[0.2em] text-xs">
            Select a conversation to start chatting
          </div>
        ) : (
          <>
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
           <div className="flex items-center space-x-5">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-black border border-primary/20 shadow-lg overflow-hidden">
                 {(() => {
                   const otherId = activeChat.participants.find((p: string) => p !== user?.uid);
                   const other = activeChat.participantData?.[otherId] || {};
                   return other.photoURL ? (
                     <img src={other.photoURL} className="w-full h-full object-cover" alt="Avatar" />
                   ) : (
                     (other.name || "CH").substring(0, 2).toUpperCase()
                   );
                 })()}
              </div>
              <div>
                 <h3 className="font-bold text-base tracking-tight">
                   {(() => {
                     const otherId = activeChat.participants.find((p: string) => p !== user?.uid);
                     return activeChat.participantData?.[otherId]?.name || "Conversation";
                   })()}
                 </h3>
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
           <AnimatePresence initial={false}>
             <div key={activeChat.id} className="space-y-6">
                {messages.map((msg: any, i: number) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-[70%] p-4 rounded-3xl text-sm font-medium shadow-xl ${
                        msg.senderId === user?.uid
                        ? 'bg-primary rounded-tr-none shadow-primary/20'
                        : 'glass rounded-tl-none border-white/10'
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
        </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Messages;
