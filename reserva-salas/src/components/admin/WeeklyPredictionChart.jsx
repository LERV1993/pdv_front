import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeeklyPredictionChart({ data }) {
  // data: [{roomId, percentages:[7]}]
  const labels = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  const chartData = useMemo(() => ({
    labels,
    datasets: data.map((d, idx) => ({
      label: d.roomId,
      data: d.percentages,
      fill: false,
      borderColor: ['#3b82f6','#ef4444','#10b981','#f59e0b','#8b5cf6'][idx % 5],
      tension: 0.3,
    }))
  }), [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Predicción semanal de ocupación (%)' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line options={options} data={chartData} />
    </div>
  );
}
