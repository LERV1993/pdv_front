// src/components/admin/TabUsers.jsx
import React from 'react';

export const TabUsers = ({ users, currentUser, onDeleteUser, onToggleRole }) => {

  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="fade-in">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestión de Usuarios</h3>
      <div className="space-y-3">
        {users.map(u => (
          <div key={u.id} className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{u.name}</h4>
                  <p className="text-gray-600">{u.email}</p>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    u.role === 'admin'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {u.role === 'admin' ? 'Administrador' : 'Usuario'}
                  </span>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-4 mt-2 md:mt-0 pt-2 md:pt-0">
                  <p className="text-sm text-gray-500">
                    Registrado: {new Date(u.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0 md:ml-4">
              {/* No puedes cambiar tu propio rol ni eliminarte a ti mismo */}
              {u.id !== currentUser.id && (
                <>
                  <button
                    onClick={() => onToggleRole(u.id)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    {u.role === 'admin' ? 'Hacer Usuario' : 'Hacer Admin'}
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </>
              )}
              {u.id === currentUser.id && (
                <span className="px-3 py-1 text-gray-500 text-sm italic">(Usuario actual)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};