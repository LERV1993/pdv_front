// src/services/salasService.js
const SALAS_KEY = 'salas';

const seed = () => {
  const initial = [
    { id: 1, nombre: 'Sala de Reuniones 1A', capacidad: 8 },
    { id: 2, nombre: 'Sala de Conferencias B2', capacidad: 20 },
    { id: 3, nombre: 'Aula de Capacitación C3', capacidad: 15 },
  ];
  localStorage.setItem(SALAS_KEY, JSON.stringify(initial));
  return initial;
};

const getAll = () => {
  const raw = localStorage.getItem(SALAS_KEY);
  if (!raw) return seed();
  return JSON.parse(raw);
};

const saveAll = (arr) => localStorage.setItem(SALAS_KEY, JSON.stringify(arr));

export const salasService = {
  getAll,
  add: ({ nombre, capacidad }) => {
    const arr = getAll();
    const id = arr.length ? Math.max(...arr.map(a=>a.id))+1 : 1;
    const sala = { id, nombre, capacidad };
    arr.push(sala);
    saveAll(arr);
    return sala;
  },
  update: (id, patch) => {
    const arr = getAll();
    const idx = arr.findIndex(x=>x.id===id);
    if (idx===-1) return null;
    arr[idx] = { ...arr[idx], ...patch };
    saveAll(arr);
    return arr[idx];
  },
  delete: (id) => {
    let arr = getAll();
    arr = arr.filter(x=>x.id!==id);
    saveAll(arr);
    return arr;
  }
};
