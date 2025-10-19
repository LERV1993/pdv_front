import React, { useEffect, useState } from 'react';
import { salasService } from '../../services/salasService';

export const TabSalas = () => {
  const [salas, setSalas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState(8);

  useEffect(() => {
    setSalas(salasService.getAll());
  }, []);

  const handleAdd = () => {
    if (!nombre) return;
    const s = salasService.add({ nombre, capacidad: Number(capacidad) });
    setSalas([...salas, s]);
    setNombre(''); setCapacidad(8);
  };

  const handleDelete = (id) => {
    if (!confirm('Eliminar sala?')) return;
    const updated = salasService.delete(id);
    setSalas(updated);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Gestión de Salas</h3>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input className="border p-2 rounded w-24" placeholder="Cap" value={capacidad} onChange={e=>setCapacidad(e.target.value)} />
        <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={handleAdd}>Agregar</button>
      </div>
      <div className="space-y-2">
        {salas.map(s => (
          <div key={s.id} className="flex justify-between items-center border rounded p-2">
            <div>
              <div className="font-medium">{s.nombre}</div>
              <div className="text-sm text-slate-500">Capacidad: {s.capacidad}</div>
            </div>
            <button className="text-red-600" onClick={()=>handleDelete(s.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
