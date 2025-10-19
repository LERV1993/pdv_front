// src/services/authService.js

// Servicio de autenticación que por defecto usa localStorage pero puede configurarse
// para conectar a una API remota llamando a `authService.configure({ baseUrl })`.

let baseUrl = null; // si se configura, usamos la API remota

export const configure = ({ baseUrl: newBaseUrl }) => {
  baseUrl = newBaseUrl || null;
};

// Inicializa usuarios por defecto si no existen (solo para modo local)
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

// Ejecutamos esto apenas se importa el archivo (solo afecta modo local)
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

  register: (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'El email ya está registrado' };
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      role: 'user',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: () => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  },

  getAllUsers: () => {
     const users = localStorage.getItem('users');
     return users ? JSON.parse(users) : [];
  },

  deleteUser: (userId) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    return users;
  },

  toggleUserRole: (userId) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map(u => 
      u.id === userId 
        ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' }
        : u
    );
    localStorage.setItem('users', JSON.stringify(users));
    return users;
  }
};

// Helpers remotos (fetch)
const apiFetch = async (path, options = {}) => {
  if (!baseUrl) throw new Error('Base URL no configurada');
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // si el backend usa cookies
    ...options
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch (e) { return text; }
};

const api = {
  login: async (email, password) => {
    try {
      const data = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // se espera { success, user, token }
      if (data && data.user) {
        // guarda token si llega
        if (data.token) localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Error en login' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  register: async (userData) => {
    try {
      const data = await apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
      if (data && data.user) {
        if (data.token) localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Error en registro' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  logout: async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (e) { /* Ignorar fallos de logout remoto */ }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    try {
      const data = await apiFetch('/auth/me');
      return data && data.user ? data.user : null;
    } catch (e) {
      return null;
    }
  },

  getAllUsers: async () => {
    try {
      const data = await apiFetch('/users');
      return Array.isArray(data) ? data : (data.users || []);
    } catch (e) { return []; }
  },

  deleteUser: async (userId) => {
    try {
      await apiFetch(`/users/${userId}`, { method: 'DELETE' });
      return await api.getAllUsers();
    } catch (e) { return [] }
  },

  toggleUserRole: async (userId) => {
    try {
      await apiFetch(`/users/${userId}/toggle-role`, { method: 'POST' });
      return await api.getAllUsers();
    } catch (e) { return [] }
  }
};

// Exportamos el servicio principal. Para compatibilidad con el código existente,
// conservamos las funciones síncronas (local) y añadimos las versiones async
// que usarán la API si `configure` fue llamada.
export const authService = {
  // configuración
  configure,

  // Modo síncrono (localStorage) - conservado para compatibilidad
  login: local.login,
  register: local.register,
  logout: local.logout,
  getCurrentUser: local.getCurrentUser,
  getAllUsers: local.getAllUsers,
  deleteUser: local.deleteUser,
  toggleUserRole: local.toggleUserRole,

  // Versiones async que usan API cuando está configurada, y fallback a local
  loginAsync: async (email, password) => {
    return baseUrl ? await api.login(email, password) : local.login(email, password);
  },

  registerAsync: async (userData) => {
    return baseUrl ? await api.register(userData) : local.register(userData);
  },

  logoutAsync: async () => {
    return baseUrl ? await api.logout() : local.logout();
  },

  getCurrentUserAsync: async () => {
    return baseUrl ? await api.getCurrentUser() : local.getCurrentUser();
  },

  getAllUsersAsync: async () => {
    return baseUrl ? await api.getAllUsers() : local.getAllUsers();
  },

  deleteUserAsync: async (userId) => {
    return baseUrl ? await api.deleteUser(userId) : local.deleteUser(userId);
  },

  toggleUserRoleAsync: async (userId) => {
    return baseUrl ? await api.toggleUserRole(userId) : local.toggleUserRole(userId);
  }
};