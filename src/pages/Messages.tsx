import { motion } from 'framer-motion';
import { Search, Send, Phone, Video, Info, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0);

  const contacts = [
    { id: 0, name: "Mwaka Mutale", lastMsg: "Is the MacBook still available?", time: "12:45 PM", online: true, avatar: "MM" },
    { id: 1, name: "John Banda (Landlord)", lastMsg: "You can come view the room at 2 PM.", time: "10:30 AM", online: false, avatar: "JB" },
    { id: 2, name: "Zambia Tech Hub", lastMsg: "We have reviewed your application.", time: "Yesterday", online: true, avatar: "ZT" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 h-[85vh] flex space-x-6">
      {/* Sidebar / Inbox */}
      <div className="w-full lg:w-1/3 flex flex-col glass rounded-3xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5">
           <h2 className="text-xl font-bold mb-4">Messages</h2>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Search conversations..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-primary" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`w-full p-4 flex items-center space-x-4 border-b border-white/5 transition-all ${activeChat === contact.id ? 'bg-primary/10' : 'hover:bg-white/5'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-surface-bright rounded-full flex items-center justify-center font-bold text-sm">
                   {contact.avatar}
                </div>
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-secondary rounded-full" />}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm">{contact.name}</h4>
                  <span className="text-[10px] text-gray-500">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{contact.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="hidden lg:flex flex-col flex-1 glass rounded-3xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                 {contacts[activeChat].avatar}
              </div>
              <div>
                 <h3 className="font-bold text-sm">{contacts[activeChat].name}</h3>
                 <p className="text-[10px] text-green-500 font-medium">Online</p>
              </div>
           </div>
           <div className="flex items-center space-x-4 text-gray-400">
              <button className="hover:text-white transition-colors"><Phone size={20} /></button>
              <button className="hover:text-white transition-colors"><Video size={20} /></button>
              <button className="hover:text-white transition-colors"><Info size={20} /></button>
              <button className="hover:text-white transition-colors"><MoreVertical size={20} /></button>
           </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
           <div className="flex justify-start">
              <div className="max-w-[70%] glass p-3 rounded-2xl rounded-tl-none text-sm border-white/5">
                Hi! Is the MacBook Pro still available? I'm interested.
              </div>
           </div>
           <div className="flex justify-end">
              <div className="max-w-[70%] bg-primary p-3 rounded-2xl rounded-tr-none text-sm">
                Yes, it is! It's in perfect condition. Are you on campus?
              </div>
           </div>
           <div className="flex justify-start">
              <div className="max-w-[70%] glass p-3 rounded-2xl rounded-tl-none text-sm border-white/5">
                Yes, I'm at UNZA. Can I see it tomorrow morning?
              </div>
           </div>
        </div>

        <div className="p-4 border-t border-white/5">
           <div className="flex items-center space-x-3">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary" />
              <button className="p-3 bg-primary rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20">
                 <Send size={20} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
