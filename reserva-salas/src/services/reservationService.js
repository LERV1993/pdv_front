import { apiService } from './apiService';

const RESERVATIONS_ENDPOINT = '/reservation';
const RESERVATIONS_DETAILS_ENDPOINT = '/reservation/get-all-reservation-details';
const RESERVATION_BY_PERSON_ENDPOINT = '/reservation/reservation-details-by-person';
const RESERVATION_DETAIL_ENDPOINT = '/reservation/reservation-details';
const formatReservationFromApi = (reservation) => ({
  id: reservation.id,
  roomId: reservation.room?.id || reservation.roomId || reservation.room_id,
  userId: reservation.people?.id || reservation.userId || reservation.user_id,
  startTime: reservation.date_hour_start || reservation.startTime || reservation.start_time,
  endTime: reservation.date_hour_end || reservation.endTime || reservation.end_time,
  articles: reservation.articles || [],
  status: reservation.status || 'confirmed',
  createdAt: reservation.createdAt || reservation.created_at,
  // Datos completos de la sala (desde el endpoint con detalles)
  roomName: reservation.room?.name || reservation.roomName || reservation.room_name,
  roomCapacity: reservation.room?.capacity || reservation.roomCapacity,
  roomDetails: reservation.room || reservation.roomDetails || reservation.room_details,
  // Datos completos del usuario (desde el endpoint con detalles)
  userName: reservation.people?.name || reservation.userName || reservation.user_name,
  userEmail: reservation.people?.email || reservation.userEmail || reservation.user_email,
  userDetails: reservation.people || reservation.userDetails || reservation.user_details,
  expectedPeople: reservation.expected_people || reservation.expectedPeople
});

const formatReservationToApi = (reservationData) => ({
  id: null,
  id_room: reservationData.roomId,
  id_people: reservationData.userId,
  date_hour_start: reservationData.startTime,
  date_hour_end: reservationData.endTime,
  ids_articles: reservationData.articles || []
});

export const reservationService = {
  async getAllReservations() {
    try {
      const data = await apiService.get(RESERVATIONS_DETAILS_ENDPOINT);
      
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map(formatReservationFromApi);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      try {
        const basicData = await apiService.get(RESERVATIONS_ENDPOINT);
        if (Array.isArray(basicData)) {
          return basicData.map(formatReservationFromApi);
        }
      } catch (fallbackError) {
        console.error('Error en fallback:', fallbackError);
      }
      return [];
    }
  },

  async getReservation(id) {
    try {
      // Usar el endpoint con detalles completos
      const reservation = await apiService.get(`${RESERVATION_DETAIL_ENDPOINT}/${id}`);
      return formatReservationFromApi(reservation);
    } catch (error) {
      console.error(`Error al obtener reserva ${id}:`, error);
      return null;
    }
  },

  async createReservation(reservationData) {
    try {
      const formattedData = formatReservationToApi(reservationData);
      const response = await apiService.post(RESERVATIONS_ENDPOINT, formattedData);
      return formatReservationFromApi(response);
    } catch (error) {
      console.error('Error al crear reserva:', error);
      throw error;
    }
  },

  async deleteReservation(id) {
    try {
      await apiService.delete(`${RESERVATIONS_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar reserva ${id}:`, error);
      throw error;
    }
  },

  async getUserReservations(userId) {
    try {
      // Usar el endpoint específico para obtener reservas por persona
      const reservations = await apiService.get(`${RESERVATION_BY_PERSON_ENDPOINT}/${userId}`);
      
      if (!Array.isArray(reservations)) {
        return [];
      }
      
      return reservations.map(formatReservationFromApi);
    } catch (error) {
      console.error(`Error al obtener reservas del usuario ${userId}:`, error);
      return [];
    }
  },

  async getUserReservationsByEmail(email) {
    try {
      // Obtener todas las reservas con detalles y filtrar por email
      const allReservations = await apiService.get(RESERVATIONS_DETAILS_ENDPOINT);
      
      if (!Array.isArray(allReservations)) {
        return [];
      }
      
      // Filtrar por email del usuario
      const userReservations = allReservations.filter(
        reservation => reservation.people?.email === email
      );
      
      return userReservations.map(formatReservationFromApi);
    } catch (error) {
      console.error(`Error al obtener reservas del usuario por email ${email}:`, error);
      return [];
    }
  },

  async getRoomReservations(roomId) {
    try {
      // Obtener todas las reservas y filtrar por sala en el cliente
      const allReservations = await this.getAllReservations();
      return allReservations.filter(reservation => reservation.roomId === parseInt(roomId));
    } catch (error) {
      console.error(`Error al obtener reservas de la sala ${roomId}:`, error);
      return [];
    }
  },

  // Verificar disponibilidad de sala en un rango de fechas
  async checkRoomAvailability(roomId, startTime, endTime) {
    try {
      const roomReservations = await this.getRoomReservations(roomId);
      
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      // Verificar si hay conflictos
      const hasConflict = roomReservations.some(reservation => {
        const reservationStart = new Date(reservation.startTime);
        const reservationEnd = new Date(reservation.endTime);
        
        return (
          (start >= reservationStart && start < reservationEnd) ||
          (end > reservationStart && end <= reservationEnd) ||
          (start <= reservationStart && end >= reservationEnd)
        );
      });
      
      return !hasConflict;
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
      return false;
    }
  },

  // Verificar conflictos de horario (manejado en el cliente)
  async getConflictingReservations(startTime, endTime, roomId) {
    try {
      const roomReservations = await this.getRoomReservations(roomId);
      
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      return roomReservations.filter(reservation => {
        const reservationStart = new Date(reservation.startTime);
        const reservationEnd = new Date(reservation.endTime);
        
        return (start >= reservationStart && start < reservationEnd) ||
               (end > reservationStart && end <= reservationEnd) ||
               (start <= reservationStart && end >= reservationEnd);
      });
    } catch (error) {
      console.error('Error al verificar conflictos:', error);
      return [];
    }
  },

  // Buscar reservas por rango de fechas (manejado en el cliente)
  async getReservationsByDateRange(startDate, endDate) {
    try {
      const allReservations = await this.getAllReservations();
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      return allReservations.filter(reservation => {
        const reservationStart = new Date(reservation.startTime);
        return reservationStart >= start && reservationStart <= end;
      });
    } catch (error) {
      console.error('Error al buscar reservas por rango de fecha:', error);
      return [];
    }
  }
};