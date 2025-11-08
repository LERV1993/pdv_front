// src/components/user/MyBookings.jsx
import React, { useState } from 'react';
import { ReservationDetailModal } from '../shared/ReservationDetailModal';

export const MyBookings = ({ bookings = [], onCancelBooking }) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [cancelling, setCancelling] = useState(null);

  const handleCancelBooking = async (reservationId) => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      return;
    }

    try {
      setCancelling(reservationId);
      await onCancelBooking(reservationId);
    } catch (err) {
      console.error('Error al cancelar reserva:', err);
    } finally {
      setCancelling(null);
    }
  };

  const handleViewDetail = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setSelectedReservation(null);
    setShowDetailModal(false);
  };

  const formatDateTime = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString('es-ES', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch (error) {
      return dateStr;
    }
  };

  // Ordenamos las reservas por fecha de inicio, de más nueva a más antigua
  const sortedReservations = [...bookings].sort((a, b) => 
    new Date(b.startTime) - new Date(a.startTime)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Mis Reservas</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">📅</div>
            <p className="text-gray-500 text-lg">No tienes reservas activas</p>
            <p className="text-gray-400 text-sm mt-2">Crea tu primera reserva en la pestaña "Nueva Reserva"</p>
          </div>
        ) : (
          sortedReservations.map(reservation => (
            <div key={reservation.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {reservation.roomName || `Sala ${reservation.roomId}`}
                </h4>
                <div className="text-gray-600 space-y-1">
                  <p>📅 {formatDateTime(reservation.startTime)}</p>
                  <p>🕐 {formatDateTime(reservation.endTime)}</p>
                </div>
                {reservation.articles && reservation.articles.length > 0 && (
                  <div className="text-sm text-gray-500 mt-2">
                    <p className="flex items-center">
                      🛠️ {reservation.articles.length} artículo{reservation.articles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                  reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {reservation.status === 'confirmed' ? 'Confirmada' :
                   reservation.status === 'pending' ? 'Pendiente' :
                   'Cancelada'}
                </span>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleViewDetail(reservation)}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                >
                  Ver Detalle
                </button>
                <button
                  onClick={() => handleCancelBooking(reservation.id)}
                  disabled={cancelling === reservation.id}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelling === reservation.id ? 'Cancelando...' : 'Cancelar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de detalle */}
      <ReservationDetailModal
        reservation={selectedReservation}
        isOpen={showDetailModal}
        onClose={handleCloseDetail}
      />
    </div>
  );
};