// src/components/admin/AdminStats.jsx
import React from 'react';

// Un componente "tonto" que solo recibe las estadísticas ya calculadas
export const AdminStats = ({ stats }) => {
  const statCards = [
    { label: 'Total Reservas', value: stats.totalBookings, color: 'text-blue-600' },
    { label: 'Reservas Hoy', value: stats.todayBookings, color: 'text-green-600' },
    { label: 'Reservas (Mes)', value: stats.monthBookings, color: 'text-purple-600' },
    { label: 'Total Usuarios', value: stats.totalUsers, color: 'text-orange-600' },
    { label: 'Total Admins', value: stats.adminUsers, color: 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {statCards.map(card => (
        <div key={card.label} className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
          <div className="text-gray-600">{card.label}</div>
        </div>
      ))}
      {/* El gráfico de predicción se muestra en la parte superior del dashboard */}
    </div>
  );
};