import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { fadeInUp, scaleUp } from '../utils/animations';

const Chat = () => {
  const [mode, setMode] = useState<'Study' | 'Career' | 'Housing' | 'Marketplace'>('Study');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your CampusLink AI Assistant. I'm currently in Study mode. I can help you summarize notes, explain complex concepts, or generate practice questions. How can I assist your learning today?" }
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: input }];
    setMessages(newMsgs);
    setInput("");

    setTimeout(() => {
      let response = "";
      switch (mode) {
        case 'Study':
          response = "I've analyzed your notes. The key concepts here involve the socioeconomic impact of copper mining in Zambia. Would you like me to generate some quiz questions on this topic?";
          break;
        case 'Career':
          response = "Based on your CV, I recommend highlighting your recent project with React. Employers in the Zambian tech hub like Zambia Tech Hub are currently looking for strong frontend skills.";
          break;
        case 'Housing':
          response = "I've scanned listings near UNZA. There's a new 'Self-contained' room in Silverest at K3,200 which fits your criteria perfectly. Would you like to contact the landlord?";
          break;
        case 'Marketplace':
          response = "A fair price for a 2020 MacBook Pro M1 in Lusaka ranges between K14,000 and K16,500 depending on the battery cycle count. I suggest listing it at K15,500 to attract serious buyers.";
          break;
        default:
          response = "I've analyzed your request. Based on current trends in Zambia, here is what I recommend... (This is a simulated AI response tailored to your needs).";
      }

      setMessages(prev => [...prev, {
        role: 'bot',
        text: response
      }]);
    }, 1200);
  };

  const changeMode = (newMode: 'Study' | 'Career' | 'Housing' | 'Marketplace') => {
    setMode(newMode);
    let intro = "";
    switch (newMode) {
      case 'Study': intro = "Switched to Study mode. Send me your notes or ask a question about your course!"; break;
      case 'Career': intro = "Career mode active. Upload your CV for review or ask for interview tips!"; break;
      case 'Housing': intro = "Housing mode active. Tell me your budget and preferred university area!"; break;
      case 'Marketplace': intro = "Marketplace mode active. Ask me about fair pricing for items or how to optimize your listing!"; break;
    }
    setMessages(prev => [...prev, { role: 'bot', text: intro }]);
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
          {['Study', 'Career', 'Housing', 'Marketplace'].map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-4 py-2 glass border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center whitespace-nowrap ${
                mode === m ? 'border-primary text-primary bg-primary/5' : 'border-white/5 hover:border-primary/50'
              }`}
            >
              <Sparkles size={12} strokeWidth={2.5} className={`mr-2 ${mode === m ? 'text-primary' : 'text-gray-500'}`} /> {m}
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
