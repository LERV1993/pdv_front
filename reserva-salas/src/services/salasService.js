import api from './apiService';

const formatRoomFromApi = (room) => ({
  id: room.id,
  nombre: room.name,
  capacidad: room.capacity
});

const formatRoomToApi = (room) => ({
  id: room.id || null,
  name: room.nombre || room.name,
  capacity: room.capacidad || room.capacity
});

export const salasService = {
  async getAll() {
    try {
      const data = await api.get('/rooms');
      return Array.isArray(data) ? data.map(formatRoomFromApi) : [];
    } catch (error) {
      console.error('Error al obtener salas:', error);
      return [];
    }
  },

  async add(roomData) {
    try {
      const payload = formatRoomToApi(roomData);
      const response = await api.post('/rooms', payload);
      return formatRoomFromApi(response);
    } catch (error) {
      console.error('Error al agregar sala:', error);
      throw error;
    }
  },

  async update(id, roomData) {
    try {
      const payload = formatRoomToApi({ ...roomData, id });
      const response = await api.put('/rooms', payload);
      return formatRoomFromApi(response);
    } catch (error) {
      console.error(`Error al actualizar sala ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/rooms/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar sala ${id}:`, error);
      throw error;
    }
  }
};
