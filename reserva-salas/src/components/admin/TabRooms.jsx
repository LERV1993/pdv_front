// src/components/admin/TabRooms.jsx
import React, { useState, useEffect } from 'react';
import { roomService } from '../../services/roomService';

export const TabRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const roomsData = await roomService.getAllRooms();
      setRooms(roomsData);
    } catch (err) {
      setError('Error al cargar las salas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRoom = async () => {
    const newRoom = {
      name: 'Nueva Sala',
      capacity: 10,
      description: 'Descripción de la sala',
      location: 'Ubicación'
    };

    try {
      await roomService.addRoom(newRoom);
      loadRooms(); // Recargar la lista
    } catch (err) {
      setError('Error al crear la sala');
      console.error(err);
    }
  };

  const handleUpdateRoom = async (id, updatedData) => {
    try {
      await roomService.updateRoom(id, updatedData);
      loadRooms(); // Recargar la lista
    } catch (err) {
      setError('Error al actualizar la sala');
      console.error(err);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta sala?')) {
      return;
    }

    try {
      await roomService.deleteRoom(id);
      loadRooms(); // Recargar la lista
    } catch (err) {
      setError('Error al eliminar la sala');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Gestión de Salas</h3>
        <button
          onClick={handleAddRoom}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Agregar Sala
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-bold text-gray-900">{room.name}</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateRoom(room.id, {
                    ...room,
                    name: prompt('Nuevo nombre:', room.name) || room.name
                  })}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Capacidad: {room.capacity}</p>
            <p className="text-gray-600 mb-2">Ubicación: {room.location}</p>
            <p className="text-gray-600">{room.description}</p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Estado: {room.status || 'Disponible'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};