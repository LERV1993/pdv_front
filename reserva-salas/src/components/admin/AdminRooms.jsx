import React, { useState, useEffect } from 'react';
import { roomService } from '../../services/roomService';
import { RoomForm } from './RoomForm';

export const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const roomsData = await roomService.getAllRooms();
      setRooms(roomsData);
      setError(null);
    } catch (err) {
      setError('Error al cargar las salas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenForm = (room = null) => {
    setSelectedRoom(room);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedRoom(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      if (selectedRoom) {
        await roomService.updateRoom(selectedRoom.id, formData);
      } else {
        await roomService.addRoom(formData);
      }
      handleCloseForm();
      await loadRooms();
    } catch (err) {
      setError(`Error al ${selectedRoom ? 'actualizar' : 'crear'} la sala`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta sala?')) {
      return;
    }

    try {
      setIsLoading(true);
      await roomService.deleteRoom(id);
      await loadRooms();
    } catch (err) {
      setError('Error al eliminar la sala');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      available: 'bg-green-100 text-green-800',
      unavailable: 'bg-red-100 text-red-800',
      maintenance: 'bg-yellow-100 text-yellow-800'
    };
    return classes[status] || classes.available;
  };

  if (isLoading && !isFormOpen) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Salas</h2>
        <button
          onClick={() => handleOpenForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nueva Sala
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {selectedRoom ? 'Editar Sala' : 'Nueva Sala'}
          </h3>
          <RoomForm
            room={selectedRoom}
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(room.status)}`}>
                    {room.status === 'available' ? 'Disponible' : 
                     room.status === 'maintenance' ? 'En Mantenimiento' : 'No Disponible'}
                  </span>
                </div>
                <dl className="mt-4 space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Capacidad</dt>
                    <dd className="text-sm text-gray-900">{room.capacity} personas</dd>
                  </div>
                  {room.location && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Ubicación</dt>
                      <dd className="text-sm text-gray-900">{room.location}</dd>
                    </div>
                  )}
                  {room.description && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Descripción</dt>
                      <dd className="text-sm text-gray-900">{room.description}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                <button
                  onClick={() => handleOpenForm(room)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
