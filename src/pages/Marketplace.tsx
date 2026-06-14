import { motion } from 'framer-motion';
import { Search, ShoppingCart, MapPin, Star, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCollection } from '../hooks/useData';
import { MarketplaceItem } from '../types';

const Marketplace = () => {
  // In a real app, we'd use the hook. For now, using mock data if collection is empty
  const { data, loading } = useCollection<MarketplaceItem>('marketplace');

  const mockItems: MarketplaceItem[] = [
    { id: '1', title: "MacBook Pro M1 2020", price: "K15,000", location: "UNZA", rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", sellerId: 'user1' },
    { id: '2', title: "Engineering Calculus 9th Ed", price: "K450", location: "CBU", rating: 4.5, category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80", sellerId: 'user2' },
    { id: '3', title: "Solid Wood Study Desk", price: "K1,200", location: "ZCAS", rating: 4.2, category: "Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a20a?auto=format&fit=crop&w=800&q=80", sellerId: 'user3' },
    { id: '4', title: "Scientific Calculator CASIO", price: "K350", location: "UNZA", rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80", sellerId: 'user4' },
  ];

  const items = data.length > 0 ? data : mockItems;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Student <span className="text-primary">Marketplace</span></h1>
          <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">Buy and sell items within the student community</p>
        </div>
        <div className="flex space-x-4">
           <Input
             placeholder="Search products..."
             icon={<Search size={20} />}
             className="md:w-80"
           />
           <Button variant="primary" className="p-3">
              <ShoppingCart size={20} />
           </Button>
        </div>
      </div>

      <div className="flex space-x-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All Items', 'Electronics', 'Books', 'Furniture', 'Fashion', 'Services'].map((cat, i) => (
          <button key={i} className={`px-6 py-2 rounded-full whitespace-nowrap border text-xs font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary border-primary text-white' : 'glass border-white/10 text-gray-500 hover:border-primary/50 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col group">
              <div className="relative aspect-square overflow-hidden bg-white/5">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border border-white/10">
                  {item.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm mb-1 truncate">{item.title}</h3>
                <div className="text-primary font-black text-xl mb-4">{item.price}</div>

                <div className="flex items-center justify-between text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-6">
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1 text-primary" /> {item.location}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star size={12} className="mr-1 fill-yellow-500" /> {item.rating}
                  </div>
                </div>

                <Button variant="glass" className="w-full mt-auto py-3 text-xs uppercase tracking-widest hover:bg-primary hover:border-primary">
                  View Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <button className="fixed bottom-10 right-10 w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/40 hover:scale-110 active:scale-95 transition-all z-40 text-white">
        <Plus size={32} />
      </button>
    </div>
  );
};

export default Marketplace;
