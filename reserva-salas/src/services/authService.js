// src/services/authService.js
import { apiService } from './apiService';

const AUTH_LOGIN_ENDPOINT = '/auth/login';






const api = {
  login: async (email, password) => {
    try {
      const data = await apiService.post(
        AUTH_LOGIN_ENDPOINT, 
        { username: email, password }, 
        { includeAuth: false }
      );
      
      if (data && data.jwt) {
        localStorage.setItem('token', data.jwt);
        
        const payload = JSON.parse(atob(data.jwt.split('.')[1]));
        console.log('JWT Payload:', payload);
        
        const user = {
          email: data.username,
          name: data.username.split('@')[0],
          role: payload.authorities === 'ADMIN' ? 'admin' : 'user',
          token: data.jwt
        };
        
        console.log('Usuario procesado:', { ...user, token: '***' });
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      }
      return { success: false, error: 'Credenciales incorrectas' };
    } catch (error) {
      console.error('Error en login API:', error);
      return local.login(email, password);
    }
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }
};

export const authService = {
  login: async (email, password) => {
    return await api.login(email, password);
  },

  logout: () => {
    return api.logout();
  },

  getCurrentUser: () => {
    return api.getCurrentUser();
  },

  getTokenInfo: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;
      
      return {
        expiresAt: new Date(expirationTime),
        timeRemaining: timeRemaining,
        isExpired: timeRemaining <= 0,
        expiresInMinutes: Math.floor(timeRemaining / (1000 * 60))
      };
    } catch (error) {
      console.error('Error obteniendo info del token:', error);
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');
    
    if (!token || !user) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() < expirationTime;
    } catch (error) {
      return false;
    }
  }
};