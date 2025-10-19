// src/components/shared/Header.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

// Hacemos este Header genérico. Recibirá el título y un icono.
export const Header = ({ title, icon }) => {
  const { user, logout } = useAuth();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    // Capitalizar la primera letra
    let dateString = now.toLocaleDateString('es-ES', options);
    setCurrentDate(dateString.charAt(0).toUpperCase() + dateString.slice(1));
  }, []);

  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">{icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">Bienvenido, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm text-gray-600 hidden sm:block">
              <span>{currentDate}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};