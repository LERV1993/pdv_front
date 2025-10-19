// src/components/user/MyBookings.jsx
import React from 'react';

export const MyBookings = ({ bookings, roomData, onCancelBooking }) => {

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      onCancelBooking(bookingId);
    }
  };

  // Ordenamos las reservas por fecha, de más nueva a más antigua
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Mis Reservas</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {sortedBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tienes reservas activas</p>
        ) : (
          sortedBookings.map(booking => (
            <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg fade-in">
              <div>
                <h4 className="font-semibold text-gray-900">{roomData[booking.room].name}</h4>
                <p className="text-gray-600">
                  {new Date(booking.date + 'T00:00:00').toLocaleDateString('es-ES')} - {booking.time}
                </p>
                <p className="text-sm text-gray-500 italic">{booking.purpose || 'Sin descripción'}</p>
              </div>
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};