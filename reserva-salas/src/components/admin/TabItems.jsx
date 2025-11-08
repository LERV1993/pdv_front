import React, { useState, useEffect } from 'react';
import { articleService } from '../../services/articleService';

export const TabItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const data = await articleService.getAllArticles();
      setItems(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar artículos:', err);
      setError('Error al cargar los artículos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    try {
      setIsLoading(true);
      await articleService.addArticle({ name });
      await loadItems();
      setName('');
    } catch (err) {
      console.error('Error al agregar artículo:', err);
      setError('Error al agregar el artículo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este artículo?')) return;

    try {
      setIsLoading(true);
      await articleService.deleteArticle(id);
      await loadItems();
    } catch (err) {
      console.error('Error al eliminar artículo:', err);
      setError('Error al eliminar el artículo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAvailability = async (id, currentAvailable) => {
    try {
      setIsLoading(true);
      await articleService.toggleAvailability(id, !currentAvailable);
      await loadItems();
    } catch (err) {
      setError('Error al cambiar disponibilidad');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && items.length === 0) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Administración de Artículos</h3>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded p-2 flex-1"
          placeholder="Nombre del artículo"
        />
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          onClick={handleAdd}
        >
          Agregar
        </button>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between border rounded p-3">
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <span className={`inline-block px-2 py-1 text-xs rounded ${
                item.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.available ? 'Disponible' : 'No disponible'}
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleToggleAvailability(item.id, item.available)}
                className={`text-sm font-medium ${
                  item.available 
                    ? 'text-yellow-600 hover:text-yellow-800' 
                    : 'text-green-600 hover:text-green-800'
                }`}
              >
                {item.available ? 'Marcar no disponible' : 'Marcar disponible'}
              </button>
              <button 
                className="text-red-600 hover:text-red-800 text-sm font-medium"
                onClick={() => handleDelete(item.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
