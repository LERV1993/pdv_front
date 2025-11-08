// src/services/roomService.js
import { apiService } from './apiService';

// Endpoints
const ROOMS_ENDPOINT = '/rooms';

// Helper para formatear la sala desde la API
const formatRoom = (room) => ({
  id: room.id,
  name: room.room_name || room.name,
  capacity: room.room_capacity || room.capacity,
  description: room.description || '',
  location: room.location || '',
  status: room.status || 'available'
});

export const roomService = {
  async getAllRooms() {
    try {
      const data = await apiService.get(ROOMS_ENDPOINT);
      return Array.isArray(data) ? data.map(formatRoom) : [];
    } catch (error) {
      console.error('Error al obtener salas:', error);
      return [];
    }
  },

  async getRoom(id) {
    try {
      const room = await apiService.get(`${ROOMS_ENDPOINT}/${id}`);
      return formatRoom(room);
    } catch (error) {
      console.error(`Error al obtener sala ${id}:`, error);
      return null;
    }
  },

  async addRoom(roomData) {
    try {
      const response = await apiService.post(ROOMS_ENDPOINT, {
        name: roomData.name,
        capacity: roomData.capacity
      });
      return formatRoom(response);
    } catch (error) {
      console.error('Error al crear sala:', error);
      throw error;
    }
  },

  async updateRoom(id, patch) {
    try {
      const response = await apiService.put(`${ROOMS_ENDPOINT}/${id}`, {
        name: patch.name,
        capacity: patch.capacity
      });
      return formatRoom(response);
    } catch (error) {
      console.error(`Error al actualizar sala ${id}:`, error);
      throw error;
    }
  },

  async deleteRoom(id) {
    try {
      await apiService.delete(`${ROOMS_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar sala ${id}:`, error);
      throw error;
    }
  },

  async checkRoomAvailability(roomId, startTime, endTime) {
    try {
      const response = await apiService.get(
        `${ROOMS_ENDPOINT}/${roomId}/availability?start=${startTime}&end=${endTime}`
      );
      return {
        isAvailable: response.isAvailable,
        conflicts: response.conflicts || [],
        nextAvailableSlot: response.nextAvailableSlot
      };
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
      throw error;
    }
  }
};
