// src/components/shared/ReservationsList.jsx
import React, { useState } from 'react';
import { ReservationDetailModal } from './ReservationDetailModal';
import { Toast } from './Toast';

export const ReservationsList = ({ 
  reservations = [], 
  onDelete,
  isAdmin = false,
  loading = false,
  title = "Reservas",
  emptyMessage = "No hay reservas"
}) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);

  const handleDelete = async (reservationId) => {
    const confirmMessage = isAdmin 
      ? '¿Estás seguro de que quieres eliminar esta reserva?'
      : '¿Estás seguro de que quieres cancelar esta reserva?';
      
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setDeleting(reservationId);
      await onDelete(reservationId);
      
      setToast({
        message: isAdmin 
          ? '✅ Reserva eliminada exitosamente'
          : '✅ Reserva cancelada exitosamente',
        type: 'success'
      });
    } catch (err) {
      console.error('Error al eliminar/cancelar reserva:', err);
      
      setToast({
        message: err.message || 'Error al procesar la reserva. Intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setDeleting(null);
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

  // Ordenar por fecha de inicio, más nuevas primero
  const sortedReservations = [...reservations].sort((a, b) => 
    new Date(b.startTime) - new Date(a.startTime)
  );

  return (
    <div className={isAdmin ? 'fade-in' : 'bg-white rounded-xl shadow-lg p-6'}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

      <div className={`space-y-3 ${!isAdmin && 'max-h-96 overflow-y-auto pr-2'}`}>
        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">📅</div>
            <p className="text-gray-500 text-lg">{emptyMessage}</p>
            {!isAdmin && (
              <p className="text-gray-400 text-sm mt-2">Crea tu primera reserva en la pestaña "Nueva Reserva"</p>
            )}
          </div>
        ) : (
          sortedReservations.map(reservation => (
            <div 
              key={reservation.id} 
              className={`flex ${isAdmin ? 'flex-col md:flex-row' : 'flex-row'} justify-between ${isAdmin ? 'md:items-center' : 'items-center'} p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors`}
            >
              <div className="flex-1">
                <div className={isAdmin ? 'flex flex-col md:flex-row md:items-center md:space-x-4' : ''}>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {reservation.roomName || `Sala ${reservation.roomId}`}
                    </h4>
                    <div className="text-gray-600 space-y-1">
                      <p>{isAdmin ? 'Inicio: ' : '📅 '}{formatDateTime(reservation.startTime)}</p>
                      <p>{isAdmin ? 'Fin: ' : '🕐 '}{formatDateTime(reservation.endTime)}</p>
                    </div>
                    {isAdmin && (
                      <div className="text-xs text-gray-500 space-y-1 mt-1">
                        {reservation.roomCapacity && (
                          <p>Capacidad: {reservation.roomCapacity} personas</p>
                        )}
                        {reservation.expectedPeople && (
                          <p>Esperadas: {reservation.expectedPeople} personas</p>
                        )}
                      </div>
                    )}
                    {reservation.articles && reservation.articles.length > 0 && (
                      <div className="text-sm text-gray-500 mt-2">
                        <p className="flex items-center">
                          🛠️ {reservation.articles.length} artículo{reservation.articles.length !== 1 ? 's' : ''}
                          {isAdmin && (
                            <span className="ml-2 text-xs">
                              ({reservation.articles.filter(a => a.available).length} disponible{reservation.articles.filter(a => a.available).length !== 1 ? 's' : ''})
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0">
                      <p className="font-medium text-gray-900">
                        {reservation.userName || `Usuario ID: ${reservation.userId}`}
                      </p>
                      {reservation.userEmail && (
                        <p className="text-sm text-gray-500">{reservation.userEmail}</p>
                      )}
                    </div>
                  )}

                  <div className={`${isAdmin ? 'border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0' : 'mt-2'}`}>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status === 'confirmed' ? 'Confirmada' :
                       reservation.status === 'pending' ? 'Pendiente' :
                       'Cancelada'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`flex ${isAdmin ? 'flex-col md:flex-row gap-2 mt-4 md:mt-0 md:ml-4' : 'flex-col gap-2 ml-4'}`}>
                <button
                  onClick={() => handleViewDetail(reservation)}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                >
                  Ver Detalle
                </button>
                <button
                  onClick={() => handleDelete(reservation.id)}
                  disabled={deleting === reservation.id || loading}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === reservation.id 
                    ? (isAdmin ? 'Eliminando...' : 'Cancelando...') 
                    : (isAdmin ? 'Eliminar' : 'Cancelar')
                  }
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
