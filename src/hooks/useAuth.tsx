import { createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';
import { useLocalStorage } from './useLocalStorage';
import { safeSetStorage } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('habitTracker_currentUser', null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    // Also update the users array to keep records synchronized
    const usersStr = localStorage.getItem('habitTracker_users');
    if (usersStr) {
      try {
        const users: User[] = JSON.parse(usersStr);
        const updatedUsers = users.map(u => u.id === userData.id ? userData : u);
        safeSetStorage('habitTracker_users', JSON.stringify(updatedUsers));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
