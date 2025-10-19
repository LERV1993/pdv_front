// src/components/admin/TabBookings.jsx
import React from 'react';

export const TabBookings = ({ bookings, roomData, onDeleteBooking }) => {

  const handleDelete = (bookingId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      onDeleteBooking(bookingId);
    }
  };

  // Ordenar por fecha, más nuevas primero
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="fade-in">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Todas las Reservas</h3>
      <div className="space-y-3">
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay reservas registradas</p>
        ) : (
          sortedBookings.map(booking => (
            <div key={booking.id} className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{roomData[booking.room]?.name || booking.room}</h4>
                    <p className="text-gray-600">
                      {new Date(booking.date + 'T00:00:00').toLocaleDateString('es-ES')} - {booking.time}
                    </p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0">
                    <p className="font-medium text-gray-900">{booking.name}</p>
                    <p className="text-sm text-gray-500">{booking.email}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0">
                    <p className="text-sm text-gray-600 italic">{booking.purpose || 'Sin descripción'}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(booking.id)}
                className="mt-4 md:mt-0 md:ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};