import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic, Sparkles, Briefcase, Home, Tag, BrainCircuit } from 'lucide-react';
import { fadeInUp, scaleUp } from '../utils/animations';

type ModeType = 'Study' | 'Career' | 'Housing' | 'Marketplace';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

const Chat = () => {
  const [activeMode, setActiveMode] = useState<ModeType>('Study');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "Hello! I'm your CampusLink AI Assistant. I can help you summarize study notes, review your CV, or find the best accommodation deals. What's on your mind?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Mode configuration
  const modeConfigs = {
    Study: {
      icon: <BrainCircuit size={14} className="text-blue-400" />,
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      chips: ["Summarize Study Notes", "Explain React Concepts", "Generate Quiz Questions"],
      systemIntro: "Study mode active. Ask me to explain complex university concepts or draft mock exams."
    },
    Career: {
      icon: <Briefcase size={14} className="text-purple-400" />,
      color: "border-purple-500/20 text-purple-400 bg-purple-500/5",
      chips: ["Review my CV", "Interview Preparation", "Career Advice"],
      systemIntro: "Career mode active. Get interview preparation tips and complete CV reviews."
    },
    Housing: {
      icon: <Home size={14} className="text-green-400" />,
      color: "border-green-500/20 text-green-400 bg-green-500/5",
      chips: ["Recommend Rooms near UNZA", "Recommend Rooms near CBU", "Housing pricing trends"],
      systemIntro: "Housing mode active. Discover high-quality and student-friendly rooms near campus."
    },
    Marketplace: {
      icon: <Tag size={14} className="text-orange-400" />,
      color: "border-orange-500/20 text-orange-400 bg-orange-500/5",
      chips: ["Suggest Fair Price for Laptop", "Price guide for Calculus Book", "Marketplace safety tips"],
      systemIntro: "Marketplace assistant active. Find fair value estimates for student electronics and textbooks."
    }
  };

  const handleModeChange = (mode: ModeType) => {
    setActiveMode(mode);
    setMessages(prev => [
      ...prev,
      { role: 'bot', text: modeConfigs[mode].systemIntro }
    ]);
  };

  const getCustomResponse = (userQuery: string): string => {
    const text = userQuery.toLowerCase();

    // Study
    if (text.includes("summarize")) {
      return "Sure! To summarize your lecture notes, please upload a document (.pdf or .docx) using the clip icon, or paste a section of your text. I will generate a structured summary with core bullet points, keywords, and action items.";
    }
    if (text.includes("explain react") || text.includes("concept")) {
      return "Here is a quick breakdown of React state vs. props: \n\n• **Props** (Properties) are read-only inputs passed from a parent component down to child components. They are immutable.\n• **State** is local data storage managed entirely inside the component itself. When state changes, React automatically re-renders that component to update the UI.\n\nThink of props as the blueprint passed to a construction site (read-only), and state as the actual bricks and active status of the builders (mutable, tracking ongoing changes!).";
    }
    if (text.includes("quiz")) {
      return "Let's test your knowledge! Here is a custom React concept quiz:\n\n1. *Can a component modify its own props?* (A: Yes, B: No)\n2. *Which hook is used to handle local reactive state?* (A: useEffect, B: useState)\n\nReply with your answers and I will score you instantly!";
    }

    // Career
    if (text.includes("cv") || text.includes("resume")) {
      return "I would love to review your CV! \n\n**Quick Tips for Zambia's Job Market:**\n1. Ensure your university (e.g. UNZA, CBU) and graduation year are clear.\n2. List technical skills first (React, Python, SQL) and map them to practical projects.\n3. Mention real-world software project experience, such as contributing to CampusLink Zambia!\n\nUpload your CV file directly so I can parse and highlight potential areas of improvement.";
    }
    if (text.includes("interview") || text.includes("prep")) {
      return "Let's do a mock interview! I am a technical hiring manager at Zambia Tech Hub. \n\n**First Question:** *Can you tell me about a challenging frontend project you built, how you managed its state, and how you solved the most difficult bug in it?*\n\nTake your time to type your response, and I'll give you feedback on your communication and tech structure!";
    }
    if (text.includes("career advice") || text.includes("career")) {
      return "The tech landscape in Zambia is growing rapidly. Here is the ultimate 3-step student career path:\n\n1. **Build a Portfolio:** Host 3 solid projects on GitHub (such as marketplace apps or landing pages).\n2. **Internships:** Apply to tech houses in Lusaka or remote agencies early in your third/fourth year.\n3. **Community Networking:** Attend local events (like Zambia Tech Expo) and share your work on LinkedIn.";
    }

    // Housing
    if (text.includes("unza")) {
      return "Excellent choice. Here are the top accommodation recommendations near UNZA based on budget and distance:\n\n1. **Silverest Executive Lodge** (K3,500/mo) - premium, self-contained, 500m away, full power backup.\n2. **UNZA Premium Studio** (K4,200/mo) - premium single occupant, 100m away, ultra-fast WiFi.\n\nWould you like me to connect you with the landlords directly?";
    }
    if (text.includes("cbu") || text.includes("riverside")) {
      return "Here are the top-rated housing units near copperbelt University (CBU) in Kitwe:\n\n1. **CBU Modern Hostels** (K2,800/mo) - located in Riverside, 1km from main campus, includes reliable water and security.\n2. **Parklands Student Villa** (K2,200/mo) - budget-friendly shared lodging, includes power backup.\n\nLet me know if you would like landlord phone contacts!";
    }
    if (text.includes("pricing") || text.includes("housing")) {
      return "The average student housing price in Lusaka (around UNZA) ranges from K2,500 to K4,500 per month, depending heavily on WiFi and generator status. In Kitwe (around CBU), average rates are K1,800 to K3,200 per month. Always look for 'self-contained' listings to secure private bathrooms!";
    }

    // Marketplace
    if (text.includes("laptop")) {
      return "Based on recent transactions on the CampusLink Zambia marketplace, here is a fair pricing guide for pre-owned student laptops:\n\n• **MacBook Pro M1 (2020, 8GB/256GB):** K13,500 - K15,500 ZMW\n• **Lenovo ThinkPad i5 (8th Gen):** K4,500 - K6,000 ZMW\n• **HP EliteBook i7:** K6,500 - K8,500 ZMW\n\nEnsure you inspect the battery health and screen condition before completing the purchase!";
    }
    if (text.includes("calculus") || text.includes("book")) {
      return "For a text like *Engineering Calculus (9th Edition)*, students typically transact between K350 and K500 ZMW depending on page wear and cover quality. Services like tutor matching for this material averages K150 per hour.";
    }
    if (text.includes("safety") || text.includes("tips")) {
      return "**CampusLink Safe Trading Guide:**\n1. Always meet the buyer/seller in public, well-lit campus spaces (e.g. UNZA East Park Mall or CBU library lobby).\n2. Never send money before seeing and testing the device.\n3. Verify the student profile badge on CampusLink before initiating high-value trades.";
    }

    // General fallback
    return `I've analyzed your question: "${userQuery}". Based on current campus data in Zambia, I recommend consulting the dedicated dashboard tabs or coordinating with student groups. Can I provide more specific tips on Study, Careers, Housing, or the Marketplace?`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsgs = [...messages, { role: 'user', text } as ChatMessage];
    setMessages(newMsgs);
    if (!textToSend) setInput("");

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botReply = getCustomResponse(text);
      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    }, 1000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-10 h-[88vh] flex flex-col"
    >
      {/* Top Header */}
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

        {/* Specialized Modes Selection */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
          {(['Study', 'Career', 'Housing', 'Marketplace'] as ModeType[]).map((mode) => {
            const isActive = activeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${
                  isActive
                    ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/10'
                    : 'glass border-white/5 text-gray-500 hover:text-white'
                }`}
              >
                <div className="mr-2">
                  {modeConfigs[mode].icon}
                </div>
                {mode}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 glass border border-white/5 rounded-[2.5rem] p-8 overflow-y-auto space-y-8 mb-4 no-scrollbar relative flex flex-col justify-between"
      >
        <div className="space-y-8">
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
                  <p className="text-sm leading-relaxed font-medium pt-2 whitespace-pre-line">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Simulated Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] rounded-tl-none flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Suggestion Chips Container */}
      <div className="mb-6 flex flex-wrap gap-2 px-2">
         {modeConfigs[activeMode].chips.map((chip, idx) => (
           <button
             key={idx}
             onClick={() => handleSend(chip)}
             className="px-4 py-2.5 bg-white/3 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:border-primary/40 hover:text-white transition-all cursor-pointer shadow-lg"
           >
             {chip}
           </button>
         ))}
      </div>

      {/* Bottom Message Input Form */}
      <motion.div variants={fadeInUp} className="relative group">
         <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
         <div className="relative glass border border-white/10 rounded-3xl flex items-center px-6 py-3 focus-within:border-primary/50 transition-all shadow-2xl">
            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Paperclip size={20} strokeWidth={2.5} /></button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask CampusAI a ${activeMode.toLowerCase()} question...`}
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
