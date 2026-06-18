import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic, Sparkles, BookOpen, Briefcase, Home, ShoppingCart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { fadeInUp, scaleUp } from '../utils/animations';

type ChatMode = 'Study' | 'Career' | 'Housing' | 'Marketplace';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your CampusLink AI Assistant. I'm here to help you navigate campus life in Zambia. Select a mode above to get started!" }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>('Study');
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

    // Simulated AI Responses based on mode
    setTimeout(() => {
      let botResponse = "";
      switch (mode) {
        case 'Study':
          botResponse = "I can help you with that! Whether it's summarizing your UNZA lecture notes, explaining complex engineering concepts, or generating practice quiz questions, I've got you covered. What specific topic are we focusing on today?";
          break;
        case 'Career':
          botResponse = "Great! I can review your CV for local internships, help you prepare for interviews at companies like Zamtel or Liquid Intelligent Technologies, and provide career advice tailored to the Zambian job market. Send me your CV details or ask a career question!";
          break;
        case 'Housing':
          botResponse = "Finding the right place is crucial. Based on your university, I can recommend the best boarding houses in areas like Silverest, Riverside, or Marshlands. Are you looking for a self-contained room or a shared space?";
          break;
        case 'Marketplace':
          botResponse = "Selling or buying? I can suggest fair prices for electronics, books, and furniture based on what other students are listing. For example, a used MacBook Pro M1 currently goes for around K12,000 to K15,000 on CampusLink. What item are you inquiring about?";
          break;
        default:
          botResponse = "I've analyzed your request. How else can I assist you in your campus journey today?";
      }
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1200);
  };

  const modeIcons = {
    Study: <BookOpen size={14} strokeWidth={2.5} className="mr-2 text-blue-400" />,
    Career: <Briefcase size={14} strokeWidth={2.5} className="mr-2 text-green-400" />,
    Housing: <Home size={14} strokeWidth={2.5} className="mr-2 text-orange-400" />,
    Marketplace: <ShoppingCart size={14} strokeWidth={2.5} className="mr-2 text-purple-400" />
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-10 h-[88vh] flex flex-col"
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
        <div>
          <motion.div variants={fadeInUp} className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-primary/20 text-primary rounded-xl shadow-lg shadow-primary/10 border border-primary/20">
              <Bot size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase italic">Campus<span className="text-primary italic-none">AI</span></h1>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Empowering your academic and professional journey</motion.p>
        </div>

        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
          {(['Study', 'Career', 'Housing', 'Marketplace'] as ChatMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2.5 glass border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center shadow-xl ${
                mode === m ? 'border-primary/50 bg-primary/10 text-white' : 'border-white/5 text-gray-500 hover:border-white/20'
              }`}
            >
              {modeIcons[m]} {m}
            </button>
          ))}
        </motion.div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 glass border border-white/5 rounded-[2.5rem] p-8 overflow-y-auto space-y-8 mb-8 no-scrollbar shadow-inner relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] p-6 rounded-[2rem] flex items-start space-x-4 shadow-2xl relative overflow-hidden ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-none shadow-primary/20'
                  : 'bg-white/5 border border-white/10 rounded-tl-none'
              }`}>
                {msg.role === 'user' && <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full" />}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg z-10 ${
                  msg.role === 'user' ? 'bg-white/20' : 'bg-primary/20 text-primary border border-primary/20'
                }`}>
                  {msg.role === 'user' ? <User size={20} strokeWidth={2.5} /> : <Bot size={20} strokeWidth={2.5} />}
                </div>
                <p className="text-sm leading-relaxed font-medium pt-1 z-10">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div variants={fadeInUp} className="relative group">
         <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
         <div className="relative glass border border-white/10 rounded-3xl flex items-center px-6 py-3 focus-within:border-primary/50 transition-all shadow-2xl">
            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Paperclip size={20} strokeWidth={2.5} /></button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask anything about ${mode.toLowerCase()}...`}
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
