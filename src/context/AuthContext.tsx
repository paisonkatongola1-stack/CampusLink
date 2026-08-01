import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { db } from '../utils/firebaseUtils';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'student' | 'business' | 'landlord' | 'employer' | 'admin';
  university?: string;
  course?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    if (localStorage.getItem('mockUser') === 'true') {
      localStorage.removeItem('mockUser');
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }
    await signOut(auth);
  };

  useEffect(() => {
    if (localStorage.getItem('mockUser') === 'true') {
      setUser({
        uid: 'mock-user-id',
        email: 'chanda.musonda@unza.zm',
        displayName: 'Chanda Musonda',
      } as unknown as User);
      setProfile({
        uid: 'mock-user-id',
        email: 'chanda.musonda@unza.zm',
        displayName: 'Chanda Musonda',
        role: 'student',
        university: 'UNZA',
        course: 'Computer Science'
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            setProfile({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: 'student'
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
