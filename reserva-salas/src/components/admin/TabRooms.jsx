// src/components/admin/TabRooms.jsx
import React from 'react';

export const TabRooms = ({ bookings, roomData }) => {

  const getRoomStats = (roomId) => {
    const roomBookings = bookings.filter(b => b.room === roomId);
    const todayBookings = roomBookings.filter(b => b.date === new Date().toISOString().split('T')[0]);
    return {
      total: roomBookings.length,
      today: todayBookings.length,
    };
  };

  return (
    <div className="fade-in">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Información de Salas</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(roomData).map(([roomId, room]) => {
          const stats = getRoomStats(roomId);
          return (
            <div key={roomId} className={`bg-gradient-to-r ${room.color} text-white p-6 rounded-lg shadow-lg`}>
              <h4 className="text-xl font-bold mb-2">{room.name}</h4>
              <p className="opacity-90 mb-2">Capacidad: {room.capacity}</p>
              <p className="opacity-90 mb-4">{room.features}</p>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm font-semibold">Total reservas: {stats.total}</p>
                <p className="text-sm font-semibold">Reservas hoy: {stats.today}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};