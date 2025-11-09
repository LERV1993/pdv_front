// src/services/authService.js
import { apiService } from './apiService';

const AUTH_LOGIN_ENDPOINT = '/auth/login';

const initUsers = () => {
  const savedUsers = localStorage.getItem('users');
  if (!savedUsers) {
    const defaultUsers = [
      { id: 1, name: 'Administrador', email: 'admin@reservas.com', password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
      { id: 2, name: 'Usuario Test', email: 'usuario@test.com', password: 'user123', role: 'user', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};

initUsers();

// Helpers locales
const local = {
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, error: 'Credenciales incorrectas' };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: () => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }
};

const api = {
  login: async (email, password) => {
    try {
      const data = await apiService.post(AUTH_LOGIN_ENDPOINT, { email, password });
      if (data && data.jwt) {
        // Guardar el token JWT
        localStorage.setItem('token', data.jwt);
        
        // Extraer información del usuario
        const user = {
          email: data.username,
          name: data.username.split('@')[0], // Usar la parte antes del @ como nombre
          role: data.jwt.includes('ADMIN') ? 'admin' : 'user', // Detectar rol del JWT
          token: data.jwt
        };
        
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
  }
};