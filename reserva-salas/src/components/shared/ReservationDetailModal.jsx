// src/components/shared/ReservationDetailModal.jsx
import React from 'react';

export const ReservationDetailModal = ({ reservation, isOpen, onClose }) => {
  if (!isOpen || !reservation) return null;

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Sin estado';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Detalle de Reserva</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Estado</h3>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(reservation.status)}`}>
              {getStatusText(reservation.status)}
            </span>
          </div>

          {/* Room Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">📍 Información de la Sala</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-600 font-medium">Nombre</p>
                <p className="text-blue-900 font-semibold">{reservation.roomName}</p>
              </div>
              {reservation.roomCapacity && (
                <div>
                  <p className="text-sm text-blue-600 font-medium">Capacidad</p>
                  <p className="text-blue-900">{reservation.roomCapacity} personas</p>
                </div>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-3">👤 Información del Usuario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-600 font-medium">Nombre</p>
                <p className="text-green-900 font-semibold">{reservation.userName}</p>
              </div>
              {reservation.userEmail && (
                <div>
                  <p className="text-sm text-green-600 font-medium">Email</p>
                  <p className="text-green-900">{reservation.userEmail}</p>
                </div>
              )}
            </div>
          </div>

          {/* Date and Time Information */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">🕒 Horario</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-purple-600 font-medium">Inicio</p>
                <p className="text-purple-900 font-semibold">{formatDateTime(reservation.startTime)}</p>
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Fin</p>
                <p className="text-purple-900 font-semibold">{formatDateTime(reservation.endTime)}</p>
              </div>
            </div>
          </div>

          {/* Articles Information */}
          {reservation.articles && reservation.articles.length > 0 && (
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">🛠️ Artículos Reservados</h3>
              <div className="space-y-3">
                {reservation.articles.map((article, index) => (
                  <div key={article.id || index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      
                      <div>
                        <p className="font-medium text-gray-900">{article.name}</p>
                       
                      </div>
                    </div>
                   
                  </div>
                ))}
              </div>
                       
            </div>
          )}

          {/* No Articles */}
          {(!reservation.articles || reservation.articles.length === 0) && (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-500">📋 No hay artículos asociados a esta reserva</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};