// src/components/user/TimeSlots.jsx
import React from 'react';

export const TimeSlots = ({ selectedRoom, selectedDate, selectedTime, bookings, roomData, onTimeSelect }) => {
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  if (!selectedRoom || !selectedDate) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Paso 3: Horarios Disponibles</h3>
        <p className="text-gray-500 text-center py-8">Selecciona una sala y fecha primero</p>
      </div>
    );
  }

  // Creamos un Set con los horarios reservados para búsquedas rápidas
  const reservedSlots = new Set(
    bookings
      .filter(b => b.room === selectedRoom && b.date === selectedDate)
      .map(b => b.time)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Paso 3: Horarios Disponibles</h3>
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 font-medium">Sala: {roomData[selectedRoom].name}</p>
        <p className="text-blue-800">Fecha: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES')}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {timeSlots.map(time => {
          const isBooked = reservedSlots.has(time);
          const isSelected = selectedTime === time;

          return (
            <div
              key={time}
              className={`time-slot p-3 rounded-lg text-center font-medium text-white ${
                isBooked
                  ? 'reserved cursor-not-allowed opacity-70'
                  : isSelected
                    ? 'selected ring-4 ring-offset-2 ring-blue-500'
                    : 'available hover:opacity-90'
              } ${!isBooked ? 'cursor-pointer' : ''}`}
              onClick={() => !isBooked && onTimeSelect(time)}
              title={isBooked ? 'Horario no disponible' : `Reservar a las ${time}`}
            >
              {time}
            </div>
          );
        })}
      </div>
    </div>
  );
};