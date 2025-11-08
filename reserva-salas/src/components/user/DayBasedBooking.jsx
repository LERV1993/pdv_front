import React, { useState, useEffect } from 'react';
import { roomService } from '../../services/roomService';
import { reservationService } from '../../services/reservationService';

export const DayBasedBooking = ({ user, onBookingComplete }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableArticles, setAvailableArticles] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Sala, 2: Fecha, 3: Artículos

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      loadAvailableDates();
    }
  }, [selectedRoom]);

  const loadRooms = async () => {
    try {
      const roomsData = await roomService.getAllRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  };

  const loadAvailableDates = async () => {
    if (!selectedRoom) return;
    
    setLoading(true);
    try {
      // Generar próximos 30 días disponibles (mockup)
      const dates = generateAvailableDates();
      setAvailableDates(dates);
      setAvailableArticles(generateMockArticles());
    } catch (error) {
      console.error('Error loading available dates:', error);
      setAvailableDates(generateAvailableDates());
      setAvailableArticles(generateMockArticles());
    } finally {
      setLoading(false);
    }
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends for mockup
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          available: Math.random() > 0.2, // 80% disponible
          formatted: date.toLocaleDateString('es-ES', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          })
        });
      }
    }
    
    return dates;
  };

  const generateMockArticles = () => {
    return [
      { id: 1, name: 'Proyector', available: true, category: 'Audiovisual' },
      { id: 2, name: 'Pizarra Móvil', available: true, category: 'Mobiliario' },
      { id: 3, name: 'Sistema de Audio', available: false, category: 'Audiovisual' },
      { id: 4, name: 'Mesa Adicional', available: true, category: 'Mobiliario' },
      { id: 5, name: 'Sillas Extra (4)', available: true, category: 'Mobiliario' },
      { id: 6, name: 'Pantalla LED', available: true, category: 'Audiovisual' }
    ];
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setSelectedDate(null);
    setSelectedArticles([]);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    if (!date.available) return;
    setSelectedDate(date.date);
    setStep(3);
  };

  const handleArticleToggle = (articleId) => {
    setSelectedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleBookingSubmit = async () => {
    if (!selectedRoom || !selectedDate) return;

    const bookingData = {
      userId: user.id,
      roomId: selectedRoom.id,
      startDate: `${selectedDate}T09:00:00`,
      endDate: `${selectedDate}T18:00:00`,
      articles: selectedArticles,
      status: 'PENDIENTE'
    };

    try {
      setLoading(true);
      const newReservation = await reservationService.createReservation(bookingData);
      onBookingComplete(newReservation);
      
      // Reset form
      setSelectedRoom(null);
      setSelectedDate(null);
      setSelectedArticles([]);
      setStep(1);
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedDate(null);
    } else if (step === 3) {
      setStep(2);
      setSelectedArticles([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Nueva Reserva</h2>
        <p className="text-blue-100 mb-4">Reserva día completo (09:00 - 18:00)</p>
        
        {/* Progress Steps */}
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-white' : 'text-blue-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>1</div>
            <span className="text-sm">Sala</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-white' : 'bg-blue-400'}`}></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-white' : 'text-blue-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>2</div>
            <span className="text-sm">Fecha</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-white' : 'bg-blue-400'}`}></div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-white' : 'text-blue-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>3</div>
            <span className="text-sm">Artículos</span>
          </div>
        </div>
      </div>

      {/* Step 1: Room Selection */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🏢 Seleccionar Sala</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => handleRoomSelect(room)}
                className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50 cursor-pointer transition-all"
              >
                <h4 className="font-semibold text-gray-900">{room.name}</h4>
                <p className="text-sm text-gray-600">Capacidad: {room.capacity} personas</p>
                {room.description && (
                  <p className="text-xs text-gray-500 mt-1">{room.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Date Selection */}
      {step === 2 && selectedRoom && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              � Días Disponibles - {selectedRoom.name}
            </h3>
            <button
              onClick={goBack}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Cambiar Sala
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableDates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => handleDateSelect(date)}
                  disabled={!date.available}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    date.available
                      ? 'bg-green-50 text-green-800 border border-green-200 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {date.formatted}
                  {!date.available && (
                    <div className="text-xs mt-1">Ocupado</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Articles Selection */}
      {step === 3 && selectedDate && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">🛠️ Artículos Disponibles</h3>
            <button
              onClick={goBack}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Cambiar Fecha
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {availableArticles.map((article) => (
              <div
                key={article.id}
                className={`p-4 rounded-lg border-2 ${
                  !article.available
                    ? 'border-gray-200 bg-gray-50 opacity-50'
                    : selectedArticles.includes(article.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedArticles.includes(article.id)}
                    onChange={() => handleArticleToggle(article.id)}
                    disabled={!article.available}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{article.name}</h4>
                    <p className="text-sm text-gray-500">{article.category}</p>
                    {!article.available && (
                      <p className="text-xs text-red-500 mt-1">No disponible</p>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Summary and Submit */}
          <div className="border-t pt-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Resumen:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Sala:</strong> {selectedRoom.name}</li>
                <li><strong>Fecha:</strong> {new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</li>
                <li><strong>Horario:</strong> 09:00 - 18:00 (9 horas)</li>
                <li><strong>Artículos:</strong> {selectedArticles.length} seleccionados</li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleBookingSubmit}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Creando...' : 'Confirmar Reserva'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};