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
export const createDrink = (data) => api.post('/drinks', data);
export const updateDrink = (id, data) => api.put(`/drinks/${id}`, data, {
  headers: {
    'Content-Type': 'application/json'
  }
});
export const getDrinks = () => api.get('/drinks');
export const deleteDrinks = (id) => api.delete(`/drinks/${id}`);

//-----------------------------------------------------------------------------------
export const createSize = (data) => api.post('/sizes', data);
export const updateSize = (id, data) => api.put(`/sizes/${id}`, data, {
  headers: {
    'Content-Type': 'application/json'
  }
});
export const getSizes = () => api.get('/sizes');
export const deleteSizes = (id) => api.delete(`/sizes/${id}`);