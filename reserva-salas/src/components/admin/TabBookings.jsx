// src/components/admin/TabBookings.jsx
import React, { useState, useEffect } from 'react';
import { reservationService } from '../../services/reservationService';
import { ReservationsList } from '../shared/ReservationsList';

export const TabBookings = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const reservationsData = await reservationService.getAllReservations();
      setReservations(reservationsData);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar las reservas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      setIsLoading(true);
      await reservationService.deleteReservation(reservationId);
      await loadData(); // Recargar datos después de eliminar
    } catch (err) {
      console.error('Error al eliminar reserva:', err);
      setError('Error al eliminar la reserva');
      throw err; // Re-lanzar para que ReservationsList maneje el toast
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && reservations.length === 0) {
    return <div className="text-center py-8">Cargando reservas...</div>;
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <ReservationsList
        reservations={reservations}
        onDelete={handleDelete}
        isAdmin={true}
        loading={isLoading}
        title="Todas las Reservas"
        emptyMessage="No hay reservas registradas"
      />
    </div>
  );
};