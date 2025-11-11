// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useTokenExpiration } from '../hooks/useTokenExpiration';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = authService.getCurrentUser();
      const isAuthenticated = authService.isAuthenticated();
      
      if (savedUser && isAuthenticated) {
        setUser(savedUser);
      } else if (savedUser && !isAuthenticated) {
        authService.logout();
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result && result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      <TokenExpirationMonitor />
      {children}
    </AuthContext.Provider>
  );
};

const TokenExpirationMonitor = () => {
  useTokenExpiration();
  return null;
};