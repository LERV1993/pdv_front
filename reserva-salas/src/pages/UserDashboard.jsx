// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { bookingService } from '../services/bookingService';

// Importamos todos los componentes que creamos
import { Header } from '../components/shared/Header';
import { RoomSelector } from '../components/user/RoomSelector';
import { Calendar } from '../components/user/Calendar';
import { TimeSlots } from '../components/user/TimeSlots';
import { BookingForm } from '../components/user/BookingForm';
import { MyBookings } from '../components/user/MyBookings';
import { ConfirmationModal } from '../components/user/ConfirmationModal';

// Datos estáticos de las salas
const roomData = {
  'sala-a': { name: 'Sala A - Ejecutiva', capacity: '8 personas', features: 'Proyector, WiFi, AC', color: 'from-purple-500 to-pink-500' },
  'sala-b': { name: 'Sala B - Conferencias', capacity: '20 personas', features: 'Pantalla LED, Audio, WiFi', color: 'from-green-500 to-teal-500' },
  'sala-c': { name: 'Sala C - Creativa', capacity: '12 personas', features: 'Pizarra, Sofás, WiFi', color: 'from-orange-500 to-red-500' }
};

export const UserDashboard = () => {
  const { user } = useAuth();
  
  // --- Estados Principales ---
  const [allBookings, setAllBookings] = useState([]); // Todas las reservas (para TimeSlots)
  const [userBookings, setUserBookings] = useState([]); // Solo las del usuario (para MyBookings)

  // --- Estados del Proceso de Reserva ---
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  // --- Estados del Calendario ---
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // --- Estados de UI (Modales/Formularios) ---
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  // Cargar TODAS las reservas al iniciar (para ver disponibilidad)
  useEffect(() => {
    setAllBookings(bookingService.getAllBookings());
  }, []);

  // Cargar solo las reservas del USUARIO al iniciar
  useEffect(() => {
    setUserBookings(bookingService.getBookingsByEmail(user.email));
  }, [user.email]);

  // --- Manejadores de Eventos ---

  // Cuando se selecciona una sala
  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
    setSelectedDate(null); // Resetea fecha y hora
    setSelectedTime(null);
    setShowBookingForm(false);
  };

  // Cuando se selecciona una fecha
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Resetea hora
    setShowBookingForm(false);
  };

  // Cuando se selecciona una hora
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowBookingForm(true); // Muestra el formulario de confirmación
  };

  // Cuando se envía el formulario de reserva
  const handleBookingSubmit = (formData) => {
    const newBookingData = {
      ...formData, // purpose
      room: selectedRoom,
      date: selectedDate,
      time: selectedTime,
      name: user.name,
      email: user.email,
    };

    // 1. Llama al servicio para guardar
    const newBooking = bookingService.addBooking(newBookingData);

    // 2. Actualiza los estados locales (importante!)
    setAllBookings(prev => [...prev, newBooking]);
    setUserBookings(prev => [...prev, newBooking]);

    // 3. Resetea la UI
    setLastBooking(newBooking);
    setShowBookingForm(false);
    setSelectedTime(null);
    setShowConfirmation(true); // Muestra el modal de éxito
  };

  // Cuando se cancela una reserva desde "Mis Reservas"
  const handleCancelBooking = (bookingId) => {
    // 1. Llama al servicio para borrar
    const updatedBookings = bookingService.deleteBooking(bookingId);

    // 2. Actualiza AMBOS estados
    setAllBookings(updatedBookings);
    setUserBookings(updatedBookings.filter(b => b.email === user.email));
  };

  return (
    <div className="min-h-full">
      <Header title="ReservaSalas" icon="🏢" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <RoomSelector
          rooms={roomData}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Calendar
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={(month, year) => {
              setCurrentMonth(month);
              setCurrentYear(year);
              setSelectedDate(null); // Resetea la fecha al cambiar de mes
              setSelectedTime(null);
            }}
          />
          
          <TimeSlots
            selectedRoom={selectedRoom}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            bookings={allBookings} // Usa todas las reservas para la disponibilidad
            roomData={roomData}
            onTimeSelect={handleTimeSelect}
          />
        </div>

        {showBookingForm && (
          <BookingForm
            user={user}
            onSubmit={handleBookingSubmit}
            onCancel={() => {
              setShowBookingForm(false);
              setSelectedTime(null);
            }}
          />
        )}

        <MyBookings
          bookings={userBookings} // Muestra solo las reservas del usuario
          roomData={roomData}
          onCancelBooking={handleCancelBooking}
        />

      </main>

      {showConfirmation && (
        <ConfirmationModal
          booking={lastBooking}
          roomData={roomData}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};