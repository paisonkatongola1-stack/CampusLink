import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Lock, User, Shield, HelpCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Settings = () => {
  const sections = [
    { icon: <User size={20} />, title: "Account Settings", desc: "Update your personal information and profile picture." },
    { icon: <Bell size={20} />, title: "Notifications", desc: "Manage your email and push notification preferences." },
    { icon: <Lock size={20} />, title: "Security", desc: "Change your password and enable two-factor authentication." },
    { icon: <Shield size={20} />, title: "Privacy", desc: "Control who can see your profile and activity." },
    { icon: <HelpCircle size={20} />, title: "Support", desc: "Get help with your account or report a problem." },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-10"
    >
      <div className="mb-12">
        <motion.h1 variants={fadeInUp} className="text-4xl font-black mb-2 tracking-tight">Settings</motion.h1>
        <motion.p variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Manage your account preferences and security</motion.p>
      </div>

      <motion.div variants={staggerContainer} className="space-y-6">
        {sections.map((section, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="p-8 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{section.title}</h3>
                  <p className="text-gray-500 text-xs font-medium">{section.desc}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest font-black">Manage</Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 pt-10 border-t border-white/5 flex justify-end">
        <Button variant="accent" className="px-10 py-4 text-[10px] uppercase tracking-widest font-black">Delete Account</Button>
      </div>
    </motion.div>
  );
};

export default Settings;
