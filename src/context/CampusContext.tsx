import React, { createContext, useContext, useState, useEffect } from 'react';

type University = 'UNZA' | 'CBU' | 'Mulungushi' | 'ZCAS' | 'Cavendish' | 'All';

interface CampusContextType {
  selectedCampus: University;
  setSelectedCampus: (campus: University) => void;
}

const CampusContext = createContext<CampusContextType>({ selectedCampus: 'All', setSelectedCampus: () => {} });

export const useCampus = () => useContext(CampusContext);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCampus, setSelectedCampus] = useState<University>('All');

  return (
    <CampusContext.Provider value={{ selectedCampus, setSelectedCampus }}>
      {children}
    </CampusContext.Provider>
  );
};
