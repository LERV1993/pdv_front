import React, { useState, useEffect } from 'react';
import { analyticsService } from '../../services/analyticsService';

export const TabReports = ({ rooms = [] }) => {
  const [activeTab, setActiveTab] = useState('predictions');
  const [occupancyRanking, setOccupancyRanking] = useState(null);
  const [seasonalPatterns, setSeasonalPatterns] = useState(null);
  const [trendingResources, setTrendingResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'predictions') {
      loadOccupancyRanking();
    } else if (activeTab === 'insights') {
      loadSeasonalPatterns();
      // loadTrendingResources(); // Temporalmente deshabilitado por error 401
    }
  }, [activeTab]);

  const loadOccupancyRanking = async () => {
    setLoading(true);
    try {
      const data = await analyticsService.getOccupancyRanking();
      setOccupancyRanking(data);
    } catch (error) {
      console.error('Error cargando ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSeasonalPatterns = async () => {
    try {
      const data = await analyticsService.getSeasonalPatterns();
      setSeasonalPatterns(data);
    } catch (error) {
      console.error('Error cargando patrones:', error);
    }
  };

  const loadTrendingResources = async () => {
    setLoading(true);
    try {
      const data = await analyticsService.getTrendingResources();
      setTrendingResources(data);
    } catch (error) {
      console.error('Error cargando tendencias:', error);
    } finally {
      setLoading(false);
    }
  };

  const dayNames = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📊 Reportes y Análisis</h2>
        <p className="text-purple-100">Análisis predictivo de ocupación de salas</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('predictions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'predictions'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📈 Predicciones Semanales
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'insights'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            💡 Insights
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'predictions' && (
        <div className="space-y-6">
          {/* Ranking de ocupación por día */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Cargando predicciones...</p>
            </div>
          ) : occupancyRanking ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Ranking de Ocupación por Día</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(occupancyRanking).map(([day, rooms]) => (
                  <div key={day} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{dayNames[day] || day}</h4>
                    {rooms && rooms.length > 0 ? (
                      <div className="space-y-2">
                        {rooms.slice(0, 3).map((room, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{room.room}</span>
                            <span className={`font-semibold ${
                              room.expected_occupancy > 0.7 ? 'text-red-600' :
                              room.expected_occupancy > 0.4 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {Math.round(room.expected_occupancy * 100)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Sin datos</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
              No hay datos de predicción disponibles
            </div>
          )}
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Cargando insights...</p>
            </div>
          ) : (
            <>
              {/* Patrones Estacionales */}
              {seasonalPatterns && Object.keys(seasonalPatterns).length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Patrones Estacionales de Salas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(seasonalPatterns).map(([room, pattern]) => (
                      <div key={room} className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">{room}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-green-600 mr-2">📈</span>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Mayor demanda</p>
                              <p className="text-sm text-gray-600">{dayNames[pattern.peak_day] || pattern.peak_day}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-blue-600 mr-2">📉</span>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Menor demanda</p>
                              <p className="text-sm text-gray-600">{dayNames[pattern.low_day] || pattern.low_day}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
