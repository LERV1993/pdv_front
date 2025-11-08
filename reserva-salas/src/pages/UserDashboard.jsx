// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { reservationService } from '../services/reservationService';

// Importamos los componentes actualizados
import { Header } from '../components/shared/Header';
import { DayBasedBooking } from '../components/user/DayBasedBooking';
import { MyBookings } from '../components/user/MyBookings';
import { ConfirmationModal } from '../components/user/ConfirmationModal';

export const UserDashboard = () => {
  const { user } = useAuth();
  
  // Estados principales
  const [userReservations, setUserReservations] = useState([]);
  const [showNewBooking, setShowNewBooking] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar reservas del usuario
  useEffect(() => {
    if (user?.id) {
      loadUserReservations();
    }
  }, [user]);

  const loadUserReservations = async () => {
    try {
      setLoading(true);
      const reservations = await reservationService.getUserReservations(user.id);
      setUserReservations(reservations);
    } catch (error) {
      console.error('Error loading user reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Manejadores de eventos
  const handleBookingComplete = (newReservation) => {
    setLastBooking(newReservation);
    setUserReservations(prev => [...prev, newReservation]);
    setShowNewBooking(false);
    setShowConfirmation(true);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await reservationService.deleteReservation(reservationId);
      setUserReservations(prev => prev.filter(r => r.id !== reservationId));
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  return (
    <div className="min-h-full">
      <Header title="ReservaSalas" icon="🏢" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setShowNewBooking(true)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  showNewBooking
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📅 Nueva Reserva
              </button>
              <button
                onClick={() => setShowNewBooking(false)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  !showNewBooking
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📋 Mis Reservas
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {showNewBooking ? (
          <DayBasedBooking
            user={user}
            onBookingComplete={handleBookingComplete}
          />
        ) : (
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <MyBookings
                bookings={userReservations}
                onCancelBooking={handleCancelReservation}
              />
            )}
          </div>
        )}

      </main>

      {showConfirmation && (
        <ConfirmationModal
          booking={lastBooking}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};