// src/components/user/RoomSelector.jsx
import React, { useState, useEffect } from 'react';
import { roomService } from '../../services/roomService';

export const RoomSelector = ({ selectedRoom, onRoomSelect }) => {
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
      setError('Error al cargar las salas disponibles');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="text-center">Cargando salas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Paso 1: Seleccionar Sala</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-card bg-white border-2 p-6 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-200 ${
              selectedRoom === room.id 
                ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' 
                : 'border-gray-200 hover:border-blue-200'
            }`}
            onClick={() => onRoomSelect(room.id)}
          >
            <h3 className="text-xl font-bold mb-2 text-gray-900">{room.name}</h3>
            <p className="text-gray-600 mb-2">Capacidad: {room.capacity}</p>
            {room.location && (
              <p className="text-gray-600 mb-2">Ubicación: {room.location}</p>
            )}
            {room.description && (
              <p className="text-gray-500 text-sm">{room.description}</p>
            )}
            <div className="mt-3">
              <span className={`inline-block px-2 py-1 text-sm rounded ${
                room.status === 'available' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {room.status === 'available' ? 'Disponible' : 'No disponible'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};