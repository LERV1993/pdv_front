import api from './apiService';

const formatRoom = (room) => ({
  id: room.id,
  name: room.name,
  capacity: room.capacity
});

const formatRoomToApi = (room) => ({
  id: room.id || null,
  name: room.name,
  capacity: room.capacity
});

export const roomService = {
  async getAllRooms() {
    try {
      const data = await api.get('/rooms');
      return Array.isArray(data) ? data.map(formatRoom) : [];
    } catch (error) {
      console.error('Error al obtener salas:', error);
      return [];
    }
  },

  async getRoom(id) {
    try {
      const rooms = await this.getAllRooms();
      return rooms.find(room => room.id === parseInt(id)) || null;
    } catch (error) {
      console.error(`Error al obtener sala ${id}:`, error);
      return null;
    }
  },

  async addRoom(roomData) {
    try {
      const payload = formatRoomToApi(roomData);
      const response = await api.post('/rooms', payload);
      return formatRoom(response);
    } catch (error) {
      console.error('Error al crear sala:', error);
      throw error;
    }
  },

  async updateRoom(id, roomData) {
    try {
      const payload = formatRoomToApi({ ...roomData, id });
      const response = await api.put('/rooms', payload);
      return formatRoom(response);
    } catch (error) {
      console.error(`Error al actualizar sala ${id}:`, error);
      throw error;
    }
  },

  async deleteRoom(id) {
    try {
      await api.delete(`/rooms/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar sala ${id}:`, error);
      throw error;
    }
  }
};
