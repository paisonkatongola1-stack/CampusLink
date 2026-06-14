import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Edit3, Camera, CheckCircle } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="relative mb-12">
        <div className="h-48 w-full bg-gradient-to-r from-primary to-blue-900 rounded-3xl" />
        <div className="absolute -bottom-10 left-10 flex items-end">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl border-4 border-secondary bg-surface-bright flex items-center justify-center text-4xl font-bold shadow-2xl">
               CM
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-xl shadow-lg hover:scale-110 transition-all">
              <Camera size={16} />
            </button>
          </div>
          <div className="ml-6 mb-2">
            <h1 className="text-3xl font-extrabold flex items-center">
              Chanda Musonda
              <CheckCircle size={20} className="ml-2 text-primary" />
            </h1>
            <p className="text-gray-400">@chanda_dev</p>
          </div>
        </div>
        <button className="absolute bottom-4 right-6 px-6 py-2 glass border border-white/10 rounded-xl text-sm font-bold flex items-center hover:bg-white/5 transition-all">
          <Edit3 size={16} className="mr-2" /> Edit Profile
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-10">
        <div className="md:col-span-1 space-y-6">
           <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-6">Details</h3>
              <div className="space-y-4">
                 <div className="flex items-center space-x-3 text-sm">
                   <GraduationCap size={18} className="text-primary" />
                   <span>University of Zambia</span>
                 </div>
                 <div className="flex items-center space-x-3 text-sm">
                   <Mail size={18} className="text-primary" />
                   <span>chanda@unza.zm</span>
                 </div>
                 <div className="flex items-center space-x-3 text-sm">
                   <MapPin size={18} className="text-primary" />
                   <span>Lusaka, Zambia</span>
                 </div>
              </div>
           </div>

           <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX'].map(s => (
                  <span key={s} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium border border-primary/20">{s}</span>
                ))}
              </div>
           </div>
        </div>

        <div className="md:col-span-2 space-y-8">
           <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <p className="text-gray-400 leading-relaxed">
                Computer Science student at UNZA with a passion for building products that solve real Zambian problems. Looking for internships in software engineering and UI/UX design.
              </p>
           </div>

           <div className="space-y-4">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <div className="space-y-3">
                 {[
                   "Applied for Software Intern at Zambia Tech Hub",
                   "Saved 'Silverest Executive Lodge' to favorites",
                   "Listed 'Scientific Calculator' on Marketplace"
                 ].map((act, i) => (
                   <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex items-center space-x-4">
                     <div className="w-2 h-2 bg-primary rounded-full" />
                     <p className="text-sm text-gray-300">{act}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
