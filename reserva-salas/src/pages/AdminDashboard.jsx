// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { bookingService } from '../services/bookingService';

// Componentes
import { Header } from '../components/shared/Header';
import { AdminStats } from '../components/admin/AdminStats';
import { AdminTabs } from '../components/admin/AdminTabs';
import { TabBookings } from '../components/admin/TabBookings';
import { TabUsers } from '../components/admin/TabUsers';
import { TabRooms } from '../components/admin/TabRooms';
import { TabItems } from '../components/admin/TabItems';
import { TabSalas } from '../components/admin/TabSalas';
import { analyticsService } from '../services/analyticsService';
import WeeklyPredictionChart from '../components/admin/WeeklyPredictionChart';
import { TabReports } from '../components/admin/TabReports';

// Datos estáticos de las salas (igual que en UserDashboard)
const roomData = {
  'sala-a': { name: 'Sala A - Ejecutiva', capacity: '8 personas', features: 'Proyector, WiFi, AC', color: 'from-purple-500 to-pink-500' },
  'sala-b': { name: 'Sala B - Conferencias', capacity: '20 personas', features: 'Pantalla LED, Audio, WiFi', color: 'from-green-500 to-teal-500' },
  'sala-c': { name: 'Sala C - Creativa', capacity: '12 personas', features: 'Pizarra, Sofás, WiFi', color: 'from-orange-500 to-red-500' }
};

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reservas');
  
  // Estados para los datos
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [weeklyPrediction, setWeeklyPrediction] = useState([]);

  // Cargar todos los datos al montar el componente
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const b = bookingService.getAllBookings();
        const u = await authService.getAllUsersAsync();
        const wp = analyticsService.weeklyOccupancyPrediction();
        if (mounted) {
          setBookings(b);
          setUsers(u);
          setItems([]);
          setWeeklyPrediction(wp);
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  // --- Manejadores de eventos ---
  const handleDeleteBooking = (bookingId) => {
    const updatedBookings = bookingService.deleteBooking(bookingId);
    setBookings(updatedBookings); // Actualiza el estado local
  };

  const handleDeleteUser = (userId) => {
    (async () => {
      const updatedUsers = await authService.deleteUserAsync(userId);
      setUsers(updatedUsers);
    })();
  };

  const handleToggleRole = (userId) => {
    (async () => {
      const updatedUsers = await authService.toggleUserRoleAsync(userId);
      setUsers(updatedUsers);
    })();
  };

  // --- Cálculo de Estadísticas ---
  const getStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    const bookingStartISO = (b) => {
      // soporta distintos shapes: 'date' (YYYY-MM-DD) o 'fecha_hora_inicio' (ISO)
      if (!b) return undefined;
      if (b.date) return b.date; // ya es YYYY-MM-DD
      if (b.fecha_hora_inicio) {
        try { return new Date(b.fecha_hora_inicio).toISOString().split('T')[0]; } catch(e){ return undefined; }
      }
      if (b.start) return b.start;
      return undefined;
    };

    return {
      totalBookings: bookings.length,
      todayBookings: bookings.filter(b => bookingStartISO(b) === today).length,
      monthBookings: bookings.filter(b => {
        const d = bookingStartISO(b);
        return d ? d.startsWith(thisMonth) : false;
      }).length,
      totalUsers: users.filter(u => u.role === 'user').length,
      adminUsers: users.filter(u => u.role === 'admin').length
    };
  };

  const stats = getStats(); // Calcula las estadísticas en cada render

  // --- Renderizado de Pestaña ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'reservas':
        return (
          <TabBookings 
            bookings={bookings} 
            roomData={roomData} 
            onDeleteBooking={handleDeleteBooking} 
          />
        );
      case 'usuarios':
        return (
          <TabUsers 
            users={users} 
            currentUser={user}
            onDeleteUser={handleDeleteUser} 
            onToggleRole={handleToggleRole}
          />
        );
      case 'salas':
        return (
          <TabSalas />
        );
      case 'personas':
        return null;
      case 'articulos':
        return (
          <TabItems />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-full">
      <Header title="Panel de Administración" icon="👨‍💼" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* La predicción se muestra en la pestaña 'Reportes' */}

        {/* Sección de Estadísticas */}
        <AdminStats stats={stats} />

        {/* Sección de Pestañas */}
        <AdminTabs activeTab={activeTab} onTabClick={setActiveTab} />

        {/* Contenido de la Pestaña Activa */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'reportes' ? (
            <TabReports rooms={Object.entries(roomData).map(([id, r]) => ({ id, name: r.name }))} />
          ) : (
            renderTabContent()
          )}
        </div>

      </main>
    </div>
  );
};