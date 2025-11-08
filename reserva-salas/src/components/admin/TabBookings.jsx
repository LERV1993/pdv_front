// src/components/admin/TabBookings.jsx
import React, { useState, useEffect } from 'react';
import { reservationService } from '../../services/reservationService';
import { roomService } from '../../services/roomService';
import { ReservationDetailModal } from '../shared/ReservationDetailModal';

export const TabBookings = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [reservationsData, roomsData] = await Promise.all([
        reservationService.getAllReservations(),
        roomService.getAllRooms()
      ]);

      // Convertir la lista de salas a un objeto para fácil acceso
      const roomsMap = roomsData.reduce((acc, room) => {
        acc[room.id] = room;
        return acc;
      }, {});

      setReservations(reservationsData);
      setRooms(roomsMap);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar las reservas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reservationId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      return;
    }

    try {
      setIsLoading(true);
      await reservationService.deleteReservation(reservationId);
      await loadData(); // Recargar datos después de eliminar
    } catch (err) {
      console.error('Error al eliminar reserva:', err);
      setError('Error al eliminar la reserva');
    } finally {
      setIsLoading(false);
    }
  };

  // Formatear fecha y hora
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

  const handleViewDetail = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setSelectedReservation(null);
    setShowDetailModal(false);
  };

  // Ordenar por fecha de inicio, más nuevas primero
  const sortedReservations = [...reservations].sort((a, b) => 
    new Date(b.startTime) - new Date(a.startTime)
  );

  if (isLoading && reservations.length === 0) {
    return <div className="text-center py-8">Cargando reservas...</div>;
  }

  return (
    <div className="fade-in">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Todas las Reservas</h3>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {reservations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay reservas registradas</p>
        ) : (
          sortedReservations.map(reservation => (
            <div key={reservation.id} className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {reservation.roomName || rooms[reservation.roomId]?.name || `Sala ${reservation.roomId}`}
                    </h4>
                    <div className="text-gray-600">
                      <p>Inicio: {formatDateTime(reservation.startTime)}</p>
                      <p>Fin: {formatDateTime(reservation.endTime)}</p>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      {reservation.roomCapacity && (
                        <p>Capacidad: {reservation.roomCapacity} personas</p>
                      )}
                      {reservation.expectedPeople && (
                        <p>Esperadas: {reservation.expectedPeople} personas</p>
                      )}
                    </div>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0">
                    <p className="font-medium text-gray-900">
                      {reservation.userName || `Usuario ID: ${reservation.userId}`}
                    </p>
                    {reservation.userEmail && (
                      <p className="text-sm text-gray-500">{reservation.userEmail}</p>
                    )}
                    {reservation.articles && reservation.articles.length > 0 && (
                      <div className="text-sm text-gray-500 mt-1">
                        <p className="flex items-center">
                          🛠️ {reservation.articles.length} artículo{reservation.articles.length !== 1 ? 's' : ''}
                          <span className="ml-2 text-xs">
                            ({reservation.articles.filter(a => a.available).length} disponible{reservation.articles.filter(a => a.available).length !== 1 ? 's' : ''})
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0">
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
              <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 md:ml-4">
                <button
                  onClick={() => handleViewDetail(reservation)}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                >
                  Ver Detalle
                </button>
                <button
                  onClick={() => handleDelete(reservation.id)}
                  disabled={isLoading}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {isLoading ? 'Eliminando...' : 'Eliminar'}
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