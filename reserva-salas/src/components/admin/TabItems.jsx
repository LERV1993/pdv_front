import React, { useState, useEffect } from 'react';
import { itemsService } from '../../services/itemsService';

export const TabItems = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    setItems(itemsService.getAll());
  }, []);

  const handleAdd = () => {
    if (!name.trim()) return;
    const newItem = itemsService.add({ name, quantity: 1 });
    setItems(items.concat(newItem));
    setName('');
  };

  const handleDelete = (id) => {
    const updated = itemsService.delete(id);
    setItems(updated);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Administración de Artículos</h3>
      <div className="flex gap-2 mb-4">
        <input value={name} onChange={e => setName(e.target.value)} className="border rounded p-2 flex-1" placeholder="Nombre del artículo" />
        <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={handleAdd}>Agregar</button>
      </div>

      <div className="space-y-2">
        {items.map(i => (
          <div key={i.id} className="flex items-center justify-between border rounded p-2">
            <div>{i.name} <span className="text-sm text-slate-500">(x{i.quantity||1})</span></div>
            <button className="text-red-600 text-sm" onClick={() => handleDelete(i.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
