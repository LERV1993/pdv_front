// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Comprobamos si hay un usuario (soporta modo API o local)
    let mounted = true;
    (async () => {
      try {
        const savedUser = await authService.getCurrentUserAsync();
        if (mounted && savedUser) setUser(savedUser);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const login = async (email, password) => {
    const result = await authService.loginAsync(email, password);
    if (result && result.success) setUser(result.user);
    return result;
  };

  const register = async (userData) => {
    const result = await authService.registerAsync(userData);
    if (result && result.success) setUser(result.user);
    return result;
  };

  const logout = async () => {
    await authService.logoutAsync();
    setUser(null);
  };

  // Si está cargando, no mostramos nada (o un loader)
  if (loading) {
    // Puedes poner un loader global aquí si quieres
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};