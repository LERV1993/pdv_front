// src/components/user/ConfirmationModal.jsx
import React, { useEffect } from 'react';

export const ConfirmationModal = ({ booking, onClose }) => {
  // Cierra el modal automáticamente después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    // Limpia el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!booking) return null;

  const formatDateTime = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString('es-ES', {
        dateStyle: 'full',
        timeStyle: 'short'
      });
    } catch (error) {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl animate-pulse">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-4xl">✓</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">¡Reserva Confirmada!</h3>
          <p className="text-gray-600 mb-4">Tu reserva ha sido registrada exitosamente.</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left mb-6 text-sm space-y-2">
            <p><strong>Sala:</strong> {booking.roomName || `Sala ${booking.roomId}`}</p>
            <p><strong>Inicio:</strong> {formatDateTime(booking.startTime)}</p>
            <p><strong>Fin:</strong> {formatDateTime(booking.endTime)}</p>
            <p><strong>Usuario:</strong> {booking.userName}</p>
            {booking.articles && booking.articles.length > 0 && (
              <p><strong>Artículos:</strong> {booking.articles.length} seleccionados</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};