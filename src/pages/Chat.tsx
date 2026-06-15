import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { fadeInUp, scaleUp } from '../utils/animations';

const Chat = () => {
  const [mode, setMode] = useState<'General' | 'Study' | 'Career' | 'Housing' | 'Marketplace'>('General');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your CampusLink AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getSimulatedResponse = (userInput: string, currentMode: string) => {
    switch (currentMode) {
      case 'Study':
        return "I've analyzed your study notes. I can help you generate quiz questions or explain complex concepts. Based on Zambian curriculum standards, I recommend focusing on the core modules first.";
      case 'Career':
        return "Your CV looks promising! I recommend highlighting your local projects and internships. Would you like to practice a mock interview for a Zambian tech firm?";
      case 'Housing':
        return "Based on your preferences, I recommend looking at areas within 1km of UNZA or CBU. Prices in Silverest currently average K3,000 to K4,500.";
      case 'Marketplace':
        return "For that item, a fair price in the current student market would be around K500 - K800. I recommend listing it on Friday when student activity is highest.";
      default:
        return "I've analyzed your request. Based on current trends in Zambia, here is what I recommend for your student journey.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: input }];
    setMessages(newMsgs);
    const userInput = input;
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: getSimulatedResponse(userInput, mode)
      }]);
    }, 1200);
  };

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

        <motion.div variants={fadeInUp} className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {['General', 'Study', 'Career', 'Housing', 'Marketplace'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center whitespace-nowrap border ${
                mode === m
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                : 'glass border-white/5 text-gray-500 hover:border-primary/50'
              }`}
            >
              <Sparkles size={12} strokeWidth={2.5} className={`mr-2 ${mode === m ? 'text-white' : 'text-primary'}`} /> {m}
            </button>
          ))}
        </motion.div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 glass border border-white/5 rounded-[2.5rem] p-8 overflow-y-auto space-y-8 mb-8 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] p-5 rounded-[2rem] flex items-start space-x-4 shadow-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-none shadow-primary/10'
                  : 'bg-white/5 border border-white/10 rounded-tl-none'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  msg.role === 'user' ? 'bg-white/20' : 'bg-primary/20 text-primary'
                }`}>
                  {msg.role === 'user' ? <User size={20} strokeWidth={2.5} /> : <Bot size={20} strokeWidth={2.5} />}
                </div>
                <p className="text-sm leading-relaxed font-medium pt-2">{msg.text}</p>
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
              placeholder="Ask me anything..."
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
