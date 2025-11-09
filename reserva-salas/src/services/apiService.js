import config from '../config';

const API_BASE_URL = config.apiBaseUrl;

const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    const bufferTime = 5 * 60 * 1000;
    return (expirationTime - currentTime) < bufferTime;
  } catch (error) {
    console.error('Error verificando expiración del token:', error);
    return true;
  }
};

const handleTokenExpiration = () => {
  console.warn('Token expirado, limpiando sesión...');
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = '/';
};

const getAuthHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = localStorage.getItem('token');
    
    if (isTokenExpired()) {
      handleTokenExpiration();
      throw new Error('Token expirado');
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

export const apiService = {
  async get(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getAuthHeaders(options.includeAuth !== false),
      });
      
      if (response.status === 401) {
        handleTokenExpiration();
        throw new Error('Token expirado o inválido');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en GET:', error);
      throw error;
    }
  },

  async post(endpoint, data, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(options.includeAuth !== false),
        body: JSON.stringify(data),
      });
      
      if (response.status === 401 && options.includeAuth !== false) {
        handleTokenExpiration();
        throw new Error('Token expirado o inválido');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en POST:', error);
      throw error;
    }
  },

  async put(endpoint, data, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(options.includeAuth !== false),
        body: JSON.stringify(data),
      });
      
      if (response.status === 401) {
        handleTokenExpiration();
        throw new Error('Token expirado o inválido');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en PUT:', error);
      throw error;
    }
  },

  async delete(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getAuthHeaders(options.includeAuth !== false),
      });
      
      if (response.status === 401) {
        handleTokenExpiration();
        throw new Error('Token expirado o inválido');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en DELETE:', error);
      throw error;
    }
  },
};