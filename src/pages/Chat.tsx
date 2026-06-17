import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic, Sparkles, X, Layout, BookOpen, Briefcase, Home, ShoppingBag } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { fadeInUp, scaleUp } from '../utils/animations';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your CampusLink AI Assistant. I can help you summarize study notes, review your CV, or find the best accommodation deals. What's on your mind?" }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<'General' | 'Study' | 'Career' | 'Housing' | 'Marketplace'>('General');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let botResponse = "";
      if (mode === 'Study') {
        botResponse = "I've analyzed your study query. For your course at UNZA, I recommend focusing on these key concepts. Would you like me to generate a practice quiz?";
      } else if (mode === 'Career') {
        botResponse = "Your CV looks strong. I suggest highlighting your React projects more prominently for Zambian tech companies. Want to practice an interview?";
      } else if (mode === 'Housing') {
        botResponse = "I found 3 rooms near UNZA matching your K3,000 budget. Silverest Lodge currently has the best security rating. Should I show you details?";
      } else if (mode === 'Marketplace') {
        botResponse = "Fair price for a used MacBook Pro M1 in Lusaka is between K12,000 and K15,000. Your listing price is competitive!";
      } else {
        botResponse = "I've analyzed your request. Based on current trends at Zambian Universities and my internal database, I'm here to assist you. What specifically can I do next?";
      }

      setMessages(prev => [...prev, {
        role: 'bot',
        text: botResponse
      }]);
    }, 1200);
  };

  const modes = [
    { id: 'Study', icon: <BookOpen size={14} />, color: 'text-blue-500' },
    { id: 'Career', icon: <Briefcase size={14} />, color: 'text-green-500' },
    { id: 'Housing', icon: <Home size={14} />, color: 'text-orange-500' },
    { id: 'Marketplace', icon: <ShoppingBag size={14} />, color: 'text-purple-500' },
  ] as const;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-10 h-[88vh] flex flex-col"
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <motion.div variants={fadeInUp} className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-primary/20 text-primary rounded-xl shadow-lg shadow-primary/10">
              <Bot size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Campus<span className="text-primary">AI</span></h1>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Your personal study and career partner</motion.p>
        </div>

        <motion.div variants={fadeInUp} className="flex space-x-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-4 py-2 glass border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${mode === m.id ? 'border-primary bg-primary/10 text-white' : 'border-white/5 text-gray-500 hover:border-white/20'}`}
            >
              <span className={`mr-2 ${m.color}`}>{m.icon}</span> {m.id}
            </button>
          ))}
          {mode !== 'General' && (
            <button onClick={() => setMode('General')} className="p-2 text-gray-500 hover:text-white transition-colors">
               <X size={16} />
            </button>
          )}
        </motion.div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 glass border border-white/5 rounded-[2.5rem] p-8 overflow-y-auto space-y-8 mb-8 no-scrollbar relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] p-6 rounded-[2rem] flex items-start space-x-4 shadow-2xl relative ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-none shadow-primary/10'
                  : 'bg-white/5 border border-white/10 rounded-tl-none'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  msg.role === 'user' ? 'bg-white/20' : 'bg-primary/20 text-primary'
                }`}>
                  {msg.role === 'user' ? <User size={20} strokeWidth={2.5} /> : <Bot size={20} strokeWidth={2.5} />}
                </div>
                <p className="text-sm leading-relaxed font-medium pt-1.5">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div variants={fadeInUp} className="relative group">
         <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
         <div className="relative glass border border-white/10 rounded-3xl flex items-center px-6 py-3 focus-within:border-primary/50 transition-all shadow-2xl">
            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Paperclip size={20} strokeWidth={2.5} /></button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={mode === 'General' ? "Ask me anything..." : `Ask about ${mode.toLowerCase()}...`}
              className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-sm font-medium placeholder:text-gray-600"
            />
            <button className="hidden md:flex p-2 text-gray-500 hover:text-white transition-colors mr-3"><Mic size={20} strokeWidth={2.5} /></button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="bg-primary p-4 rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 text-white"
            >
              <Send size={20} strokeWidth={2.5} />
            </motion.button>
         </div>
      </motion.div>
    </motion.div>
  );
};

export default Chat;
