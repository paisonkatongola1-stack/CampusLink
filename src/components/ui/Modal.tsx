import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isSuccess?: boolean;
  successMessage?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isSuccess, successMessage }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg z-10"
          >
            <Card className="p-10 border-white/10 shadow-2xl" hoverable={false}>
              {!isSuccess ? (
                <>
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-black tracking-tight uppercase italic">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                      <X size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                  {children}
                </>
              ) : (
                <div className="text-center py-6 flex flex-col items-center">
                   <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-green-500/10">
                      <CheckCircle size={40} strokeWidth={2.5} />
                   </div>
                   <h2 className="text-3xl font-black mb-4 tracking-tight uppercase italic">Success!</h2>
                   <p className="text-gray-400 font-medium mb-10">{successMessage || "Action completed successfully."}</p>
                   <Button onClick={onClose} className="w-full py-4 text-[10px] uppercase tracking-widest">Close</Button>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
