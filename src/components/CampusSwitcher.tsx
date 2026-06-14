import React from 'react';
import { useCampus } from '../context/CampusContext';
import { MapPin } from 'lucide-react';

export const CampusSwitcher = () => {
  const { selectedCampus, setSelectedCampus } = useCampus();
  const campuses = ['All', 'UNZA', 'CBU', 'Mulungushi', 'ZCAS', 'Apex'] as const;

  return (
    <div className="flex items-center space-x-2 glass px-4 py-2 rounded-xl border-white/5 shadow-lg">
      <MapPin size={14} className="text-primary" strokeWidth={2.5} />
      <select
        value={selectedCampus}
        onChange={(e) => setSelectedCampus(e.target.value as any)}
        className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-gray-300"
      >
        {campuses.map(c => (
          <option key={c} value={c} className="bg-secondary text-white">{c} CAMPUS</option>
        ))}
      </select>
    </div>
  );
};
