// src/services/personasService.js
const PERSONAS_KEY = 'personas';

const seed = () => {
  const initial = [
    { id: 1, nombre: 'Ana Pérez', email: 'ana.perez@organizacion.com' },
    { id: 2, nombre: 'Juan Gómez', email: 'juan.gomez@organizacion.com' },
    { id: 3, nombre: 'María López', email: 'maria.lopez@organizacion.com' },
  ];
  localStorage.setItem(PERSONAS_KEY, JSON.stringify(initial));
  return initial;
};

const getAll = () => {
  const raw = localStorage.getItem(PERSONAS_KEY);
  if (!raw) return seed();
  return JSON.parse(raw);
};

const saveAll = (arr) => localStorage.setItem(PERSONAS_KEY, JSON.stringify(arr));

export const personasService = {
  getAll,
  add: ({ nombre, email }) => {
    const arr = getAll();
    const id = arr.length ? Math.max(...arr.map(a => a.id)) + 1 : 1;
    const p = { id, nombre, email };
    arr.push(p);
    saveAll(arr);
    return p;
  },
  update: (id, patch) => {
    const arr = getAll();
    const idx = arr.findIndex(x => x.id === id);
    if (idx === -1) return null;
    arr[idx] = { ...arr[idx], ...patch };
    saveAll(arr);
    return arr[idx];
  },
  delete: (id) => {
    let arr = getAll();
    arr = arr.filter(x => x.id !== id);
    saveAll(arr);
    return arr;
  }
};
