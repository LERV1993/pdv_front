// src/components/user/RoomSelector.jsx
import React from 'react';

// Recibe los datos de las salas (roomData), la sala seleccionada y la función para seleccionarla
export const RoomSelector = ({ rooms, selectedRoom, onRoomSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Paso 1: Seleccionar Sala</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(rooms).map(([roomId, room]) => (
          <div
            key={roomId}
            className={`room-card bg-gradient-to-r ${room.color} text-white p-6 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-200 ${
              selectedRoom === roomId ? 'ring-4 ring-offset-2 ring-blue-500' : ''
            }`}
            onClick={() => onRoomSelect(roomId)}
          >
            <h3 className="text-xl font-bold mb-2">{room.name}</h3>
            <p className="opacity-90">Capacidad: {room.capacity}</p>
            <p className="opacity-90">{room.features}</p>
          </div>
        ))}
      </div>
    </div>
  );
};