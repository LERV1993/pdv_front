// src/services/analyticsService.js
import { reservationService } from './reservationService';

// Predicción semanal simple: cuenta reservas históricas por día de la semana
// y devuelve un porcentaje estimado de ocupación por sala para los próximos 7 días.
export const analyticsService = {
  weeklyOccupancyPrediction: async () => {
    try {
      const reservations = await reservationService.getAllReservations();

      // Map: salaId -> [count for mon..sun]
      const countsByRoom = {};

      reservations.forEach(r => {
        const roomId = r.roomId || r.room; // soporta diferentes shapes
        let d;
        
        // Intentar parsear la fecha desde startTime
        if (r.startTime) {
          d = new Date(r.startTime);
        } else if (r.date) {
          d = new Date(r.date);
        } else {
          return; // Skip si no hay fecha válida
        }
        
        const weekday = d.getDay(); // 0(dom)-6
        if (!countsByRoom[roomId]) countsByRoom[roomId] = [0,0,0,0,0,0,0];
        countsByRoom[roomId][weekday] += 1;
      });

      // Normalizar a porcentaje por sala
      const result = Object.entries(countsByRoom).map(([roomId, arr]) => {
        const max = Math.max(...arr, 1);
        const percentages = arr.map(v => Math.round((v / max) * 100));
        return { roomId, percentages };
      });

      return result; // [{roomId, percentages:[..7]}]
    } catch (error) {
      console.error('Error en predicción semanal:', error);
      return [];
    }
  }
};
