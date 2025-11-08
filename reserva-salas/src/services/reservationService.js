import { apiService } from './apiService';
import { roomService } from './roomService';

const RESERVATIONS_ENDPOINT = '/reservation';
const RESERVATIONS_DETAILS_ENDPOINT = '/reservation/get-all-reservation-details';
const formatReservationFromApi = (reservation) => ({
  id: reservation.id,
  roomId: reservation.room?.id || reservation.roomId || reservation.room_id,
  userId: reservation.people?.id || reservation.userId || reservation.user_id,
  startTime: reservation.date_hour_start || reservation.startTime || reservation.start_time,
  endTime: reservation.date_hour_end || reservation.endTime || reservation.end_time,
  articles: reservation.articles || [],
  status: reservation.status || 'confirmed',
  createdAt: reservation.createdAt || reservation.created_at,
  roomName: reservation.room?.name || reservation.roomName || reservation.room_name,
  roomCapacity: reservation.room?.capacity || reservation.roomCapacity,
  roomDetails: reservation.room || reservation.roomDetails || reservation.room_details,
  userName: reservation.people?.name || reservation.userName || reservation.user_name,
  userEmail: reservation.people?.email || reservation.userEmail || reservation.user_email,
  userDetails: reservation.people || reservation.userDetails || reservation.user_details,
  expectedPeople: reservation.expected_people || reservation.expectedPeople
});

const enrichReservationData = async (reservation) => {
  try {
    if (reservation.roomName && reservation.userName) {
      return reservation;
    }

    if (!reservation.roomName && reservation.roomId) {
      try {
        const room = await roomService.getRoom(reservation.roomId);
        return {
          ...reservation,
          roomName: room?.name || `Sala ${reservation.roomId}`,
          roomCapacity: room?.capacity || reservation.roomCapacity,
          roomDetails: room || reservation.roomDetails
        };
      } catch (error) {
        console.warn('No se pudo obtener detalles de la sala:', error);
      }
    }

    return reservation;
  } catch (error) {
    console.error('Error al enriquecer datos de reserva:', error);
    return reservation;
  }
};

const formatReservationToApi = (reservationData) => ({
  roomId: reservationData.roomId,
  userId: reservationData.userId,
  startTime: reservationData.startTime,
  endTime: reservationData.endTime,
  articles: reservationData.articles || []
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
      const reservation = await apiService.get(`${RESERVATIONS_ENDPOINT}/${id}`);
      const formattedReservation = formatReservationFromApi(reservation);
      return await enrichReservationData(formattedReservation);
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
      const allReservations = await this.getAllReservations();
      return allReservations.filter(reservation => reservation.userId === parseInt(userId));
    } catch (error) {
      console.error(`Error al obtener reservas del usuario ${userId}:`, error);
      try {
        const response = await apiService.get(`${RESERVATIONS_ENDPOINT}/user/${userId}`);
        if (Array.isArray(response)) {
          return response.map(formatReservationFromApi);
        }
      } catch (fallbackError) {
        console.error('Error en fallback de reservas por usuario:', fallbackError);
      }
      return [];
    }
  },

  async getRoomReservations(roomId) {
    try {
      const allReservations = await this.getAllReservations();
      return allReservations.filter(reservation => reservation.roomId === parseInt(roomId));
    } catch (error) {
      console.error(`Error al obtener reservas de la sala ${roomId}:`, error);
      try {
        const response = await apiService.get(`${RESERVATIONS_ENDPOINT}/room/${roomId}`);
        if (Array.isArray(response)) {
          return response.map(formatReservationFromApi);
        }
      } catch (fallbackError) {
        console.error('Error en fallback de reservas por sala:', fallbackError);
      }
      return [];
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