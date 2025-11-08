import React, { useState } from 'react';
import WeeklyPredictionChart from './WeeklyPredictionChart';

export const TabReports = ({ rooms = [] }) => {
  const [activeTab, setActiveTab] = useState('predictions');

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
            onClick={() => setActiveTab('usage')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'usage'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📊 Uso Histórico
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
        <div>
          <WeeklyPredictionChart />
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uso Histórico</h3>
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📊</div>
            <p>Próximamente: Análisis de uso histórico</p>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">📈</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Tendencia Semanal</h4>
                  <p className="text-sm text-gray-600">Análisis de patrones</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Sala1 tiene mayor demanda los martes, mientras que Sala2 es más solicitada los lunes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Días de Baja Demanda</h4>
                  <p className="text-sm text-gray-600">Oportunidades</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Los viernes (Sala1) y jueves (Sala2) son ideales para mantenimiento o eventos especiales.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">💡</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Recomendación</h4>
                  <p className="text-sm text-gray-600">Optimización</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Considere redistribuir reservas de días pico hacia días de menor demanda para balancear la carga.
              </p>
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis Detallado</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Patrones de Uso</h4>
                <p className="text-sm text-gray-600 mt-1">
                  El análisis muestra patrones consistentes de uso por sala, lo que permite una mejor planificación de recursos.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900">Eficiencia de Ocupación</h4>
                <p className="text-sm text-gray-600 mt-1">
                  La ocupación promedio varía entre 15% y 85% dependiendo del día y la sala, indicando oportunidades de optimización.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-medium text-gray-900">Planificación Estratégica</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Los datos permiten anticipar la demanda y ajustar la disponibilidad de recursos según las necesidades proyectadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
