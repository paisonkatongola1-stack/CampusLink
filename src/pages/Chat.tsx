import { motion } from 'framer-motion';
import { Send, User, Bot, Paperclip, Mic } from 'lucide-react';
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your CampusLink AI Assistant. How can I help you today? I can help with study notes, career advice, or finding a room." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: input }];
    setMessages(newMsgs);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "That's a great question! I'm analyzing your request regarding '" + input + "'... (Simulated Response)"
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 h-[85vh] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold flex items-center">
          <Bot className="mr-3 text-primary" size={32} /> CampusLink AI
        </h1>
        <p className="text-gray-400">Study support, career coaching and housing advice.</p>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {['Study Assistant', 'Career Coach', 'Housing Guide', 'Fair Price Checker'].map((mode) => (
          <button key={mode} className="px-4 py-2 glass border border-white/10 rounded-xl text-xs whitespace-nowrap hover:border-primary/50 transition-all">
            {mode}
          </button>
        ))}
      </div>

      <div className="flex-1 glass border border-white/10 rounded-3xl p-6 overflow-y-auto space-y-6 mb-6 no-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl flex items-start space-x-3 ${
              msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'glass border-white/10 rounded-tl-none'
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-white/20' : 'bg-primary/20 text-primary'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative">
         <div className="glass border border-white/10 rounded-2xl flex items-center px-4 py-2 focus-within:border-primary transition-all">
            <button className="p-2 text-gray-500 hover:text-white"><Paperclip size={20} /></button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm"
            />
            <button className="p-2 text-gray-500 hover:text-white mr-2"><Mic size={20} /></button>
            <button
              onClick={handleSend}
              className="bg-primary p-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
              <Send size={20} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Chat;
