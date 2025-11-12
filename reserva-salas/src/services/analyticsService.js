// src/services/analyticsService.js
import { apiService } from './apiService';

const PREDICTIONS_BASE = '/api/v1';

export const analyticsService = {
  // Predicción de ocupación de sala por rango de fechas
  async predictOccupancy(roomName, dateStart, dateEnd) {
    try {
      const data = await apiService.post(`${PREDICTIONS_BASE}/occupancy`, {
        room_name: roomName,
        date_hour_start: dateStart,
        date_hour_end: dateEnd
      });
      return data; // { room, occupation_probability, trend }
    } catch (error) {
      console.error('Error en predicción de ocupación:', error);
      return null;
    }
  },

  // Ranking de ocupación por día de semana
  async getOccupancyRanking() {
    try {
      const data = await apiService.get(`${PREDICTIONS_BASE}/occupancy-ranking`);
      return data.ranking || data; // Extrae el campo 'ranking' si existe
    } catch (error) {
      console.error('Error al obtener ranking de ocupación:', error);
      return null;
    }
  },

  // Patrones estacionales de uso de salas
  async getSeasonalPatterns() {
    try {
      const data = await apiService.get(`${PREDICTIONS_BASE}/seasonal-patterns`);
      return data; // { sala1: {peak_day, low_day}, sala2: {...}, ... }
    } catch (error) {
      console.error('Error al obtener patrones estacionales:', error);
      return null;
    }
  },

  // Tendencias de uso de recursos/artículos
  async getTrendingResources() {
    try {
      const data = await apiService.get(`${PREDICTIONS_BASE}/trending-resources`);
      return data; // [{ article, trend, trust }, ...]
    } catch (error) {
      console.error('Error al obtener tendencias de recursos:', error);
      return [];
    }
  }
};
