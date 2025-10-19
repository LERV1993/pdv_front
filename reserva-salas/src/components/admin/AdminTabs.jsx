// src/components/admin/AdminTabs.jsx
import React from 'react';

export const AdminTabs = ({ activeTab, onTabClick }) => {
  const tabs = [
    { id: 'reservas', label: 'Gestión de Reservas' },
    { id: 'personas', label: 'Gestión de Personas' },
    { id: 'usuarios', label: 'Gestión de Usuarios' },
    { id: 'salas', label: 'Gestión de Salas' },
    { id: 'articulos', label: 'Gestión de Artículos' },
    { id: 'reportes', label: 'Reportes' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};