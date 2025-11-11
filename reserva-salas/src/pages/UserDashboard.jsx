// src/pages/UserDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { reservationService } from '../services/reservationService';
import { AuthContext } from '../context/AuthContext';

// Importamos los componentes actualizados
import { Header } from '../components/shared/Header';
import { DayBasedBooking } from '../components/user/DayBasedBooking';
import { MyBookings } from '../components/user/MyBookings';
import { ConfirmationModal } from '../components/user/ConfirmationModal';
import { Toast } from '../components/shared/Toast';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { logout } = useContext(AuthContext);
  
  // Estados principales
  const [userReservations, setUserReservations] = useState([]);
  const [showNewBooking, setShowNewBooking] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Cargar reservas del usuario al montar el componente
  useEffect(() => {
    if (user?.email) {
      loadUserReservations();
    }
  }, [user]);

  // Recargar reservas cuando cambie al tab "Mis Reservas"
  useEffect(() => {
    if (user?.email && !showNewBooking) {
      loadUserReservations();
    }
  }, [showNewBooking]);

  const loadUserReservations = async () => {
    if (!user?.email) return;
    
    try {
      setLoading(true);
      // Usar email en lugar de ID para buscar reservas
      const reservations = await reservationService.getUserReservationsByEmail(user.email);
      setUserReservations(reservations);
    } catch (error) {
      console.error('Error loading user reservations:', error);
      
      // Si es error 401, cerrar sesión
      if (error.status === 401) {
        setToast({
          message: 'Sesión expirada. Redirigiendo al login...',
          type: 'error'
        });
        setTimeout(() => logout(), 2000);
      } else {
        setToast({
          message: 'Error al cargar tus reservas. Intenta nuevamente.',
          type: 'error'
        });
      }
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
      
      // Si es error 401, cerrar sesión
      if (error.status === 401) {
        setToast({
          message: 'Sesión expirada. Redirigiendo al login...',
          type: 'error'
        });
        setTimeout(() => logout(), 2000);
      }
      
      throw error; // Re-lanzar para que MyBookings maneje el error
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

      {/* Toast de notificaciones */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};