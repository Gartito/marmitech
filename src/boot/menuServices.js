import axios from 'axios'
import { api } from './axios.js'

export const createMenu = (data) => api.post('/menus', data);
export const getMenus = () => api.get('/menus');
export const updateMenu = (id, data) => api.put(`/menus/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
export const getSpecificMenu = (id) => api.get(`/menus/${id}`);

//-----------------------------------------------------------------------------------
export const getDrinks = () => api.get('/drinks');

export const deleteDrinks = (id) => api.delete(`/drinks/${id}`);