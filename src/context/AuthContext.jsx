import React, { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('ecommerce-auth-user', null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Mimicking network baseline latency
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: 101, name: 'John Doe', email, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' };
        setUser(mockUser);
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};