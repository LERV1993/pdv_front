import React, { useEffect, useState } from 'react';
import { roomService } from '../../services/roomService';

export const TabSalas = () => {
  const [salas, setSalas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSalas = async () => {
    try {
      setIsLoading(true);
      const rooms = await roomService.getAllRooms();
      setSalas(rooms);
      setError(null);
    } catch (err) {
      console.error('Error al cargar salas:', err);
      setError('Error al cargar las salas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSalas();
  }, []);

  const handleAdd = async () => {
    if (!nombre.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      await roomService.addRoom({
        name: nombre,
        capacity: Number(capacidad),
        status: 'available'
      });
      await loadSalas();
      setNombre('');
      setCapacidad(8);
    } catch (err) {
      console.error('Error al agregar sala:', err);
      setError('Error al agregar la sala');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta sala?')) {
      return;
    }

    try {
      setIsLoading(true);
      await roomService.deleteRoom(id);
      await loadSalas();
    } catch (err) {
      console.error('Error al eliminar sala:', err);
      setError('Error al eliminar la sala');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Gestión de Salas</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input 
          className="border p-2 rounded flex-1" 
          placeholder="Nombre de la sala" 
          value={nombre} 
          onChange={e => setNombre(e.target.value)}
        />
        <input 
          className="border p-2 rounded w-24" 
          type="number" 
          placeholder="Capacidad" 
          value={capacidad} 
          onChange={e => setCapacidad(e.target.value)}
          min="1"
        />
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          onClick={handleAdd}
        >
          Agregar
        </button>
      </div>

      <div className="space-y-2">
        {salas.map(sala => (
          <div key={sala.id} className="flex justify-between items-center border rounded p-4 hover:bg-gray-50">
            <div>
              <div className="font-medium text-gray-900">{sala.name}</div>
              <div className="text-sm text-gray-500">Capacidad: {sala.capacity}</div>
              {sala.status && (
                <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                  sala.status === 'available' ? 'bg-green-100 text-green-800' : 
                  sala.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {sala.status === 'available' ? 'Disponible' : 
                   sala.status === 'maintenance' ? 'En Mantenimiento' : 
                   'No Disponible'}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                className="text-red-600 hover:text-red-800 font-medium"
                onClick={() => handleDelete(sala.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
