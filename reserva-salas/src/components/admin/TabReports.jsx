import React, { useState, useEffect } from 'react';
import WeeklyPredictionChart from './WeeklyPredictionChart';
import { analyticsService } from '../../services/analyticsService';

export const TabReports = ({ rooms }) => {
  const [selectedRooms, setSelectedRooms] = useState(rooms.map(r => r.id || r.key || r));
  const [data, setData] = useState([]);

  useEffect(() => {
    // Obtener datos de predicción y filtrar por salas seleccionadas
    const pred = analyticsService.weeklyOccupancyPrediction();
    const filtered = pred.filter(p => selectedRooms.includes(p.roomId));
    setData(filtered);
  }, [selectedRooms]);

  const toggleRoom = (roomId) => {
    setSelectedRooms(prev => prev.includes(roomId) ? prev.filter(r=>r!==roomId) : prev.concat(roomId));
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="text-sm text-gray-600">Filtrar salas:</div>
        <div className="flex gap-2">
          {rooms.map(r => (
            <button key={r.id||r.key||r} onClick={() => toggleRoom(r.id||r.key||r)} className={`px-3 py-1 rounded border ${selectedRooms.includes(r.id||r.key||r) ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
              {r.name || r}
            </button>
          ))}
        </div>
      </div>

      <WeeklyPredictionChart data={data} />
    </div>
  );
};
