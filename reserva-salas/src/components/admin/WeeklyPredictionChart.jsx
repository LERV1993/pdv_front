import React, { useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export default function WeeklyPredictionChart({ data }) {
  // Datos de predicción estáticos basados en los proporcionados
  const predictionData = {
    "sala1": {
      "peak_day": "tuesday",
      "low_day": "friday"
    },
    "sala2": {
      "peak_day": "monday", 
      "low_day": "thursday"
    }
  };

  const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const dayMapping = {
    'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3,
    'friday': 4, 'saturday': 5, 'sunday': 6
  };

  // Generar datos de predicción basados en picos y valles
  const generatePredictionData = (roomId, peakDay, lowDay) => {
    const peakIndex = dayMapping[peakDay];
    const lowIndex = dayMapping[lowDay];
    const basePercentage = 45; // Porcentaje base
    
    return labels.map((_, index) => {
      if (index === peakIndex) return 85; // Día pico
      if (index === lowIndex) return 15;  // Día bajo
      // Variación aleatoria para otros días
      return basePercentage + Math.random() * 30;
    });
  };

  const chartData = useMemo(() => {
    const datasets = Object.keys(predictionData).map((roomId, idx) => {
      const roomData = predictionData[roomId];
      const percentages = generatePredictionData(roomId, roomData.peak_day, roomData.low_day);
      
      return {
        label: roomId.charAt(0).toUpperCase() + roomId.slice(1),
        data: percentages,
        fill: false,
        borderColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'][idx % 5],
        backgroundColor: ['#3b82f620', '#ef444420', '#10b98120', '#f59e0b20', '#8b5cf620'][idx % 5],
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3
      };
    });

    return { labels, datasets };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 }
        }
      },
      title: { 
        display: true, 
        text: 'Predicción Semanal de Ocupación por Sala',
        font: { size: 16, weight: 'bold' },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const roomId = context.dataset.label.toLowerCase();
            const dayName = context.label.toLowerCase();
            const percentage = Math.round(context.raw);
            const roomData = predictionData[roomId];
            
            let status = '';
            if (roomData && dayMapping[roomData.peak_day] === context.dataIndex) {
              status = ' (Día Pico)';
            } else if (roomData && dayMapping[roomData.low_day] === context.dataIndex) {
              status = ' (Día Bajo)';
            }
            
            return `${context.dataset.label}: ${percentage}%${status}`;
          }
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        max: 100,
        title: {
          display: true,
          text: 'Porcentaje de Ocupación (%)'
        },
        grid: {
          color: '#f3f4f6'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Días de la Semana'
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Gráfico Principal */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div style={{ height: '400px' }}>
          <Line options={options} data={chartData} />
        </div>
      </div>

      {/* Resumen de Predicciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(predictionData).map(([roomId, data]) => (
          <div key={roomId} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-gray-900 mb-3 capitalize">{roomId}</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Día Pico:</span>
                <span className="font-medium text-green-600 capitalize">
                  {data.peak_day === 'monday' ? 'Lunes' :
                   data.peak_day === 'tuesday' ? 'Martes' :
                   data.peak_day === 'wednesday' ? 'Miércoles' :
                   data.peak_day === 'thursday' ? 'Jueves' :
                   data.peak_day === 'friday' ? 'Viernes' :
                   data.peak_day === 'saturday' ? 'Sábado' : 'Domingo'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Día Bajo:</span>
                <span className="font-medium text-red-600 capitalize">
                  {data.low_day === 'monday' ? 'Lunes' :
                   data.low_day === 'tuesday' ? 'Martes' :
                   data.low_day === 'wednesday' ? 'Miércoles' :
                   data.low_day === 'thursday' ? 'Jueves' :
                   data.low_day === 'friday' ? 'Viernes' :
                   data.low_day === 'saturday' ? 'Sábado' : 'Domingo'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda de Interpretación */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">📊 Interpretación de Datos</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Día Pico:</strong> Mayor demanda de reservas (hasta 85% de ocupación)</li>
          <li>• <strong>Día Bajo:</strong> Menor demanda de reservas (aproximadamente 15% de ocupación)</li>
          <li>• <strong>Otros días:</strong> Ocupación promedio entre 45-75%</li>
        </ul>
      </div>
    </div>
  );
}
