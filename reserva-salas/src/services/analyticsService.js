// src/services/analyticsService.js
import { bookingService } from './bookingService';

// Predicción semanal simple: cuenta reservas históricas por día de la semana
// y devuelve un porcentaje estimado de ocupación por sala para los próximos 7 días.
export const analyticsService = {
  weeklyOccupancyPrediction: () => {
    const bookings = bookingService.getAllBookings();

    // Map: salaId -> [count for mon..sun]
    const countsByRoom = {};

    bookings.forEach(b => {
      const roomId = b.roomId || b.room; // soporta diferentes shapes
      const d = new Date(b.date);
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
  }
};
