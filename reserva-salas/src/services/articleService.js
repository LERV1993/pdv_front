// src/services/articleService.js
import { apiService } from './apiService';

// Endpoints
const ARTICLES_ENDPOINT = '/articles';

// Helper para formatear el artículo desde la API
const formatArticle = (article) => ({
  id: article.id,
  name: article.name,
  available: article.available
});

export const articleService = {
  async getAllArticles() {
    try {
      const data = await apiService.get(ARTICLES_ENDPOINT);
      return Array.isArray(data) ? data.map(formatArticle) : [];
    } catch (error) {
      console.error('Error al obtener artículos:', error);
      return [];
    }
  },

  async getArticle(id) {
    try {
      const article = await apiService.get(`${ARTICLES_ENDPOINT}/${id}`);
      return formatArticle(article);
    } catch (error) {
      console.error(`Error al obtener artículo ${id}:`, error);
      return null;
    }
  },

  async addArticle(articleData) {
    try {
      const response = await apiService.post(ARTICLES_ENDPOINT, {
        id: null,
        name: articleData.name,
        available: true
      });
      return formatArticle(response);
    } catch (error) {
      console.error('Error al crear artículo:', error);
      throw error;
    }
  },

  async updateArticle(id, patch) {
    try {
      const response = await apiService.put(`${ARTICLES_ENDPOINT}/${id}`, {
        id: id,
        name: patch.name,
        available: patch.available
      });
      return formatArticle(response);
    } catch (error) {
      console.error(`Error al actualizar artículo ${id}:`, error);
      throw error;
    }
  },

  async deleteArticle(id) {
    try {
      await apiService.delete(`${ARTICLES_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar artículo ${id}:`, error);
      throw error;
    }
  },

  async toggleAvailability(id, available) {
    try {
      const article = await this.getArticle(id);
      if (!article) throw new Error('Artículo no encontrado');
      
      const response = await this.updateArticle(id, {
        ...article,
        available: available
      });
      return response;
    } catch (error) {
      console.error('Error al cambiar disponibilidad:', error);
      throw error;
    }
  }
};