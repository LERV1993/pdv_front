// src/services/itemsService.js
const ITEMS_KEY = 'articulos';

const seed = () => {
  const initial = [
    { id: 1, nombre: 'Proyector Epson EB-X05', disponible: true },
    { id: 2, nombre: 'Laptop HP EliteBook', disponible: false },
    { id: 3, nombre: 'Cámara Sony Alpha a6400', disponible: true },
  ];
  localStorage.setItem(ITEMS_KEY, JSON.stringify(initial));
  return initial;
};

const getAllItems = () => {
  const raw = localStorage.getItem(ITEMS_KEY);
  if (!raw) return seed();
  return JSON.parse(raw);
};

const saveAllItems = (arr) => localStorage.setItem(ITEMS_KEY, JSON.stringify(arr));

export const itemsService = {
  getAll: () => getAllItems(),
  add: ({ nombre, disponible }) => {
    const arr = getAllItems();
    const id = arr.length ? Math.max(...arr.map(a => a.id)) + 1 : 1;
    const item = { id, nombre, disponible: !!disponible };
    arr.push(item);
    saveAllItems(arr);
    return item;
  },
  update: (id, patch) => {
    const arr = getAllItems();
    const idx = arr.findIndex(x => x.id === id);
    if (idx === -1) return null;
    arr[idx] = { ...arr[idx], ...patch };
    saveAllItems(arr);
    return arr[idx];
  },
  delete: (id) => {
    let arr = getAllItems();
    arr = arr.filter(x => x.id !== id);
    saveAllItems(arr);
    return arr;
  }
};
