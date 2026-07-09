import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Phone, Video, Info, MoreVertical, Plus, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fadeInUp, slideInLeft } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot, orderBy, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseUtils';

const Messages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const contacts = [
    { id: 'mock1', name: "Mwaka Mutale", lastMsg: "Is the MacBook still available?", time: "12:45 PM", online: true, avatar: "MM" },
    { id: 'mock2', name: "John Banda (Landlord)", lastMsg: "You can come view the room at 2 PM.", time: "10:30 AM", online: false, avatar: "JB" },
    { id: 'mock3', name: "Zambia Tech Hub", lastMsg: "We have reviewed your application.", time: "Yesterday", online: true, avatar: "ZT" },
  ];

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "conversations"),
      where("participantIds", "array-contains", user.uid),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConversations(convs);
      if (convs.length > 0 && !activeChat) {
        setActiveChat(convs[0]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!activeChat || activeChat.id.startsWith('mock')) {
      setMessages([]);
      return;
    };

    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", activeChat.id),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [activeChat]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !user) return;

    try {
      const now = Timestamp.now();
      await addDoc(collection(db, "messages"), {
        conversationId: activeChat.id,
        senderId: user.uid,
        text: newMessage,
        createdAt: now
      });

      // Update conversation last message and timestamp
      const convRef = doc(db, "conversations", activeChat.id);
      await updateDoc(convRef, {
        lastMessage: newMessage,
        updatedAt: now
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
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
          {conversations.length > 0 ? (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`w-full p-6 flex items-center space-x-5 border-b border-white/5 transition-all ${activeChat?.id === conv.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-white/5'}`}
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center font-black text-sm border border-white/10 shadow-lg text-primary">
                     {conv.otherParticipantName?.substring(0, 2).toUpperCase() || '??'}
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm tracking-tight">{conv.otherParticipantName || 'Unknown'}</h4>
                    <span className="text-[10px] font-black text-gray-500 uppercase">Just now</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate font-medium">{conv.lastMessage || 'Start a conversation'}</p>
                </div>
              </button>
            ))
          ) : (
            contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveChat(contact)}
                className={`w-full p-6 flex items-center space-x-5 border-b border-white/5 transition-all ${activeChat?.id === contact.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-white/5'}`}
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
            ))
          )}
        </div>
      </motion.div>

      {/* Chat View */}
      <motion.div variants={fadeInUp} className="hidden lg:flex flex-col flex-1 glass rounded-[2.5rem] border border-white/5 overflow-hidden relative">
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <MessageSquare size={40} strokeWidth={2} />
             </div>
             <h3 className="text-2xl font-black mb-2 tracking-tight">Your Inbox</h3>
             <p className="text-gray-500 max-w-xs text-[10px] font-black uppercase tracking-widest">Select a conversation to start messaging with students and businesses.</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-black border border-primary/20 shadow-lg">
                    {activeChat.avatar || activeChat.otherParticipantName?.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight">{activeChat.name || activeChat.otherParticipantName}</h3>
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
                <div key={activeChat.id} className="space-y-6">
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
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
                      ))
                    ) : (
                      <>
                        <div className="flex justify-start">
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-[70%] glass p-4 rounded-3xl rounded-tl-none text-sm font-medium border-white/10 shadow-xl">
                            Hi! Is the MacBook Pro still available? I'm interested and would like to see it.
                          </motion.div>
                        </div>
                        <div className="flex justify-end">
                          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="max-w-[70%] bg-primary p-4 rounded-3xl rounded-tr-none text-sm font-medium shadow-2xl shadow-primary/20">
                            Yes, it is! It's in perfect condition. Are you currently on campus?
                          </motion.div>
                        </div>
                        <div className="flex justify-start">
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="max-w-[70%] glass p-4 rounded-3xl rounded-tl-none text-sm font-medium border-white/10 shadow-xl">
                            Yes, I'm at UNZA. Can I see it tomorrow morning?
                          </motion.div>
                        </div>
                      </>
                    )}
                </div>
              </AnimatePresence>
            </div>

            <div className="p-6 border-t border-white/5 bg-white/2">
              <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
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
