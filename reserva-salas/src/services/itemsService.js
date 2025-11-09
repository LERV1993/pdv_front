import api from './apiService';

const formatArticleFromApi = (article) => ({
  id: article.id,
  nombre: article.name,
  disponible: article.available
});

const formatArticleToApi = (article) => ({
  id: article.id || null,
  name: article.nombre || article.name,
  available: article.disponible !== undefined ? article.disponible : article.available
});

export const itemsService = {
  async getAll() {
    try {
      const data = await api.get('/articles');
      return Array.isArray(data) ? data.map(formatArticleFromApi) : [];
    } catch (error) {
      console.error('Error al obtener artículos:', error);
      return [];
    }
  },

  async getAvailable() {
    try {
      const data = await api.get('/articles/available');
      return Array.isArray(data) ? data.map(formatArticleFromApi) : [];
    } catch (error) {
      console.error('Error al obtener artículos disponibles:', error);
      return [];
    }
  },

  async getNotAvailable() {
    try {
      const data = await api.get('/articles/not-available');
      return Array.isArray(data) ? data.map(formatArticleFromApi) : [];
    } catch (error) {
      console.error('Error al obtener artículos no disponibles:', error);
      return [];
    }
  },

  async getAvailableByDate(date) {
    try {
      const payload = { date };
      const data = await api.post('/articles-reservation/available', payload);
      return Array.isArray(data) ? data.map(formatArticleFromApi) : [];
    } catch (error) {
      console.error('Error al obtener artículos disponibles por fecha:', error);
      return [];
    }
  },

  async add(articleData) {
    try {
      const payload = formatArticleToApi(articleData);
      const response = await api.post('/articles', payload);
      return formatArticleFromApi(response);
    } catch (error) {
      console.error('Error al agregar artículo:', error);
      throw error;
    }
  },

  async update(id, articleData) {
    try {
      const payload = formatArticleToApi({ ...articleData, id });
      const response = await api.put('/articles', payload);
      return formatArticleFromApi(response);
    } catch (error) {
      console.error(`Error al actualizar artículo ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/articles/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar artículo ${id}:`, error);
      throw error;
    }
  }
};
