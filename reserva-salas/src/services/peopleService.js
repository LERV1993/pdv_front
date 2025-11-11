// src/services/peopleService.js
import { apiService } from './apiService';

const PEOPLE_ENDPOINT = '/people';

const formatPersonFromApi = (person) => ({
  id: person.id,
  nombre: person.name,
  email: person.email
});

const formatPersonToApi = (person) => ({
  id: person.id || null,
  name: person.nombre || person.name,
  email: person.email
});

export const peopleService = {
  async getAll() {
    try {
      const data = await apiService.get(PEOPLE_ENDPOINT);
      return Array.isArray(data) ? data.map(formatPersonFromApi) : [];
    } catch (error) {
      console.error('Error al obtener personas:', error);
      return [];
    }
  },

  async getByEmail(email) {
    try {
      const allPeople = await this.getAll();
      const person = allPeople.find(p => p.email === email);
      return person || null;
    } catch (error) {
      console.error('Error al buscar persona por email:', error);
      return null;
    }
  },

  async getById(id) {
    try {
      const data = await apiService.get(`${PEOPLE_ENDPOINT}/${id}`);
      return formatPersonFromApi(data);
    } catch (error) {
      console.error(`Error al obtener persona ${id}:`, error);
      return null;
    }
  },

  async create(personData) {
    try {
      const payload = formatPersonToApi(personData);
      const response = await apiService.post(PEOPLE_ENDPOINT, payload);
      return formatPersonFromApi(response);
    } catch (error) {
      console.error('Error al crear persona:', error);
      throw error;
    }
  },

  async update(id, personData) {
    try {
      const payload = formatPersonToApi({ ...personData, id });
      const response = await apiService.put(PEOPLE_ENDPOINT, payload);
      return formatPersonFromApi(response);
    } catch (error) {
      console.error(`Error al actualizar persona ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`${PEOPLE_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar persona ${id}:`, error);
      throw error;
    }
  }
};
