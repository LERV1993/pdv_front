// src/components/user/MyBookings.jsx
import React from 'react';
import { ReservationsList } from '../shared/ReservationsList';

export const MyBookings = ({ bookings = [], onCancelBooking }) => {
  return (
    <ReservationsList
      reservations={bookings}
      onDelete={onCancelBooking}
      isAdmin={false}
      title="Mis Reservas"
      emptyMessage="No tienes reservas activas"
    />
  );
};