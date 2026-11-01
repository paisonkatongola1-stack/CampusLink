import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { fadeInUp, scaleUp } from '../utils/animations';

const Chat = () => {
  const [selectedMode, setSelectedMode] = useState<'Study' | 'Career' | 'Housing' | 'Marketplace'>('Study');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your CampusLink AI Assistant. I can help you summarize study notes, practice interviews, review your CV, or find the best room deals around Zambian universities. Select a mode or type your question below!" }
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const promptsByMode: Record<string, string[]> = {
    Study: [
      "Summarize lecture notes on Data Structures",
      "Explain the concept of Opportunity Cost in Economics",
      "Generate 5 quiz questions for Zambian Constitutional Law"
    ],
    Career: [
      "Review my resume summary for an internship",
      "Help me prepare for a software developer interview",
      "What are high-demand tech skills in Zambia right now?"
    ],
    Housing: [
      "Recommend rooms under K3,000 near UNZA",
      "What should I inspect when viewing a boarding house?",
      "Safe student areas near Copperbelt University (CBU)"
    ],
    Marketplace: [
      "Suggest fair price for a used MacBook Air M1 in Lusaka",
      "Best place to sell university textbooks on campus",
      "How to avoid scams when buying electronics as a student"
    ]
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: query }];
    setMessages(newMsgs);
    setInput("");

    setTimeout(() => {
      let botReply = "";
      if (selectedMode === 'Study') {
        botReply = `📚 **Study Assistant:** Here is a breakdown of "${query}":\n\n1. **Key Concept:** Focus on fundamental definitions and campus exam patterns.\n2. **Summary:** Core takeaways tailored for UNZA / CBU syllabi.\n3. **Study Tip:** Practice active recall with past exam papers from the campus library!`;
      } else if (selectedMode === 'Career') {
        botReply = `💼 **Career Guidance:** Regarding "${query}":\n\n- **Impact:** Highlight quantifiable contributions on your CV (e.g. project metrics, leadership).\n- **Interview Tip:** Prepare using the STAR method (Situation, Task, Action, Result).\n- **CampusLink Connection:** Check the Job Hub for active internship listings at Zambia Tech Hub!`;
      } else if (selectedMode === 'Housing') {
        botReply = `🏡 **Housing Recommendations:** For accommodation around campus:\n\n- Verified listings like **Silverest Executive Lodge** (UNZA area) and **Riverside Hostels** (CBU) include power and water backup.\n- Remember to verify walking distances (within 500m-1km) and confirm security gates before signing.`;
      } else {
        botReply = `🏷️ **Marketplace Price Guide:** For "${query}":\n\n- Average verified student trade range: **K2,500 - K4,500** depending on battery cycle & condition.\n- Recommendation: Always inspect hardware in person in daylight on campus (e.g., UNZA library or Student Union building).`;
      }

      setMessages(prev => [...prev, {
        role: 'bot',
        text: botReply
      }]);
    }, 900);
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
          {(['Study', 'Career', 'Housing', 'Marketplace'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center whitespace-nowrap ${
                selectedMode === mode
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'glass border border-white/5 text-gray-400 hover:border-primary/50 hover:text-white'
              }`}
            >
              <Sparkles size={12} strokeWidth={2.5} className="mr-2" /> {mode}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
        {promptsByMode[selectedMode].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-1.5 glass rounded-xl text-[10px] font-bold text-gray-300 hover:text-white hover:border-primary/40 border border-white/10 whitespace-nowrap transition-all"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 glass border border-white/5 rounded-[2.5rem] p-8 overflow-y-auto space-y-6 mb-6 no-scrollbar"
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
                <div className="text-sm leading-relaxed font-medium pt-2 whitespace-pre-wrap">{msg.text}</div>
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
              onClick={() => handleSend()}
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
