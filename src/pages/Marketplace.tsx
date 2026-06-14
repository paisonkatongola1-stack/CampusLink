import { motion } from 'framer-motion';
import { Search, ShoppingCart, Tag, MapPin, Star, Plus } from 'lucide-react';

const Marketplace = () => {
  const items = [
    { id: 1, title: "MacBook Pro M1 2020", price: "K15,000", location: "UNZA", rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Engineering Calculus 9th Ed", price: "K450", location: "CBU", rating: 4.5, category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Solid Wood Study Desk", price: "K1,200", location: "ZCAS", rating: 4.2, category: "Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a20a?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Scientific Calculator CASIO", price: "K350", location: "UNZA", rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Student Marketplace</h1>
          <p className="text-gray-400">Buy and sell items within the student community</p>
        </div>
        <div className="flex space-x-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all w-full md:w-80"
              />
           </div>
           <button className="p-3 bg-primary rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              <ShoppingCart size={20} />
           </button>
        </div>
      </div>

      <div className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All Items', 'Electronics', 'Books', 'Furniture', 'Fashion', 'Services'].map((cat, i) => (
          <button key={i} className={`px-6 py-2 rounded-full whitespace-nowrap border ${i === 0 ? 'bg-primary border-primary' : 'glass border-white/10 text-gray-400 hover:border-primary/50'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl overflow-hidden border border-white/10 group hover:border-primary/30 transition-all"
          >
            <div className="relative aspect-square overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
                {item.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1 truncate">{item.title}</h3>
              <div className="text-primary font-bold text-xl mb-4">{item.price}</div>

              <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" /> {item.location}
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star size={12} className="mr-1 fill-yellow-500" /> {item.rating}
                </div>
              </div>

              <button className="w-full py-3 glass border border-white/10 rounded-xl text-sm font-bold hover:bg-primary hover:border-primary transition-all">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/20 hover:scale-110 transition-all z-40">
        <Plus size={32} />
      </button>
    </div>
  );
};

export default Marketplace;
