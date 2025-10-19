// src/components/user/Calendar.jsx
import React from 'react';

export const Calendar = ({ currentMonth, currentYear, selectedDate, onDateSelect, onMonthChange }) => {
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const generateCalendarDays = () => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Formato YYYY-MM-DD
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a medianoche

    const days = [];

    // Rellenar días vacíos al inicio
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Rellenar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const isPast = date < today;
      const isSelected = selectedDate === dateStr;

      days.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer rounded-lg transition-colors ${
            isPast
              ? 'text-gray-400 cursor-not-allowed'
              : isSelected
                ? 'bg-blue-500 text-white font-bold'
                : 'hover:bg-blue-100'
          }`}
          onClick={() => !isPast && onDateSelect(dateStr)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const navigateMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    onMonthChange(newMonth, newYear);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Paso 2: Seleccionar Fecha</h3>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            &larr; {/* Flecha izquierda */}
          </button>
          <h4 className="text-lg font-semibold">{monthNames[currentMonth]} {currentYear}</h4>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            &rarr; {/* Flecha derecha */}
          </button>
        </div>
        <div className="calendar-grid text-center text-sm">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="font-semibold text-gray-600 p-2">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {generateCalendarDays()}
        </div>
      </div>
    </div>
  );
};