// src/components/admin/AdminStats.jsx
import React from 'react';

export const AdminStats = ({ stats }) => {
  const statCards = [
    { label: 'Total Reservas', value: stats.totalReservations || stats.totalBookings || 0, color: 'text-blue-600' },
    { label: 'Reservas Hoy', value: stats.todayReservations || stats.todayBookings || 0, color: 'text-green-600' },
    { label: 'Reservas (Mes)', value: stats.monthReservations || stats.monthBookings || 0, color: 'text-purple-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statCards.map(card => (
        <div key={card.label} className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
          <div className="text-gray-600">{card.label}</div>
        </div>
      ))}
    </div>
  );
};