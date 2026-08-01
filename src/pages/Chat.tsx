import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic, Sparkles, MessageSquare } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { fadeInUp, scaleUp } from '../utils/animations';

type ChatMode = 'Study' | 'Career' | 'Housing' | 'Marketplace';

const Chat = () => {
  const [activeMode, setActiveMode] = useState<ChatMode>('Study');

  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hello! I'm your CampusLink AI Assistant. I can help you summarize study notes, review your CV, or find the best accommodation deals. What's on your mind?"
    }
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : input;
    if (!text.trim()) return;

    const newMsgs = [...messages, { role: 'user', text }];
    setMessages(newMsgs);
    if (textToSend === undefined) setInput("");

    // Generate specialized replies based on the active mode
    setTimeout(() => {
      let reply = "";
      if (activeMode === 'Study') {
        reply = `[CampusLink AI - Study Assistant Mode] I've analyzed your academic question. I can summarize complex concepts, explain math equations, and generate practice quiz questions for UNZA or CBU exams. Let me know which topic or course code (e.g., MAT110, PHY110, CSC210) you're studying!`;
      } else if (activeMode === 'Career') {
        reply = `[CampusLink AI - Career Assistant Mode] Looking for feedback on your CV, resume format, or preparing for an interview? I can guide you through mock questions, highlight top skills requested by employers in Zambia, and offer custom advice for internships and full-time entry-level positions.`;
      } else if (activeMode === 'Housing') {
        reply = `[CampusLink AI - Housing Assistant Mode] Based on current listings near your campus, the average price ranges from K2,000 to K4,000 per month. Let me know your preferred university (UNZA, CBU, Mulungushi, ZCAS), maximum budget, and whether you prefer self-contained single rooms or shared boarding houses.`;
      } else {
        reply = `[CampusLink AI - Marketplace Assistant Mode] Let's analyze the resale value for items you want to buy or sell. Currently, a decent condition MacBook ranges from K10,000 to K18,000, and a standard calculus textbook sells for K300-K500. Tell me what item you're posting, and I'll recommend a competitive student-friendly price!`;
      }

      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 1000);
  };

  const handleModeChange = (mode: ChatMode) => {
    setActiveMode(mode);
    let promptMsg = "";
    if (mode === 'Study') {
      promptMsg = "I have switched to Study Assistant mode! Send me your lecture notes, ask me to explain a tough scientific concept, or type a topic to generate study flashcards.";
    } else if (mode === 'Career') {
      promptMsg = "I'm now in Career Assistant mode. Ask me to review your resume, suggest key resume sections, or give you advice on how to pass an interview in Zambia.";
    } else if (mode === 'Housing') {
      promptMsg = "I've loaded the Housing Assistant mode. Tell me your university area and budget, and I will recommend some top accommodation choices or point out safety indicators.";
    } else {
      promptMsg = "Marketplace Assistant mode is ready. Ask me to estimate fair market value for electronics, books, or furniture on CampusLink, or request selling tactics.";
    }

    setMessages(prev => [
      ...prev,
      { role: 'bot', text: promptMsg }
    ]);
  };

  // Pre-configured suggestions chips for each mode
  const suggestions: Record<ChatMode, string[]> = {
    Study: [
      "Summarize MAT110 Calculus notes",
      "Explain photosynthesis simply",
      "Generate a 5-question science quiz"
    ],
    Career: [
      "Review my engineering CV",
      "Mock interview questions for Software Developer",
      "What skills do I need for digital marketing?"
    ],
    Housing: [
      "Recommend rooms under K3,000 near UNZA",
      "Is Riverside kitwe safe for students?",
      "Boarding houses vs. Private apartments cost"
    ],
    Marketplace: [
      "What is a fair price for a used iPhone 12?",
      "How much should I sell calculus textbooks for?",
      "Tips to write a catchy listing description"
    ]
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-10 h-[88vh] flex flex-col"
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <motion.div variants={fadeInUp} className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-primary/20 text-primary rounded-xl shadow-lg shadow-primary/10">
              <Bot size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Campus<span className="text-primary">AI</span></h1>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Your personal study and career partner</motion.p>
        </div>

        {/* Filter modes */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
          {(['Study', 'Career', 'Housing', 'Marketplace'] as ChatMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center border ${
                activeMode === mode
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'glass border-white/5 text-gray-500 hover:text-white hover:border-primary/50'
              }`}
            >
              <Sparkles size={12} strokeWidth={2.5} className="mr-2 text-primary" /> {mode}
            </button>
          ))}
        </motion.div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 glass border border-white/5 rounded-[2.5rem] p-8 overflow-y-auto space-y-8 mb-4 no-scrollbar"
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

      {/* Suggestion Chips */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
        {suggestions[activeMode].map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(suggestion)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-medium text-gray-300 hover:text-white transition-all whitespace-nowrap"
          >
            <MessageSquare size={12} className="text-primary" />
            <span>{suggestion}</span>
          </button>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} className="relative group">
         <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
         <div className="relative glass border border-white/10 rounded-3xl flex items-center px-6 py-3 focus-within:border-primary/50 transition-all shadow-2xl">
            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Paperclip size={20} strokeWidth={2.5} /></button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask the CampusLink ${activeMode} AI anything...`}
              className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-sm font-medium placeholder:text-gray-600 text-white"
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
