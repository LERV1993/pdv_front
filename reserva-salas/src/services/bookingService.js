// src/services/bookingService.js

// Helper para obtener todas las reservas
const getBookings = () => {
  const bookings = localStorage.getItem('roomBookings');
  return bookings ? JSON.parse(bookings) : [];
};

// Helper para guardar las reservas
const saveBookings = (bookings) => {
  localStorage.setItem('roomBookings', JSON.stringify(bookings));
};

export const bookingService = {
  
  getAllBookings: () => {
    return getBookings();
  },

  getBookingsByEmail: (email) => {
    const allBookings = getBookings();
    return allBookings.filter(b => b.email === email);
  },

  addBooking: (newBooking) => {
    const allBookings = getBookings();
    // Asignamos un ID único basado en el timestamp
    const bookingWithId = { ...newBooking, id: Date.now() }; 
    allBookings.push(bookingWithId);
    saveBookings(allBookings);
    return bookingWithId;
  },

  deleteBooking: (bookingId) => {
    let allBookings = getBookings();
    allBookings = allBookings.filter(b => b.id !== bookingId);
    saveBookings(allBookings);
    return allBookings; // Devuelve la nueva lista
  }
};