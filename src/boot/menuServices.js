import axios from "axios";
import { api } from "./axios.js";


export const getMenus = (restaurant) => api.get(`/menus/${restaurant}`);
export const updateMenu = (id, data) =>
  api.put(`/menus/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const getSpecificMenu = (id, restaurant) => api.get(`/menus/${restaurant}/${id}`);

//-----------------------------------------------------------------------------------

export const createDrink = (restaurant, data) => api.post(`/drinks/${restaurant}`, data);
export const updateDrink = (restaurant, data) => api.put(`/drinks/${restaurant}`, data);
export const getDrinks = (restaurant) => api.get(`/drinks/${restaurant}`);
export const deleteDrinks = (restaurant, id) => api.delete(`/drinks/${restaurant}/${id}`);

//-----------------------------------------------------------------------------------

export const createSize = (restaurant, data) => api.post(`/sizes/${restaurant}`, data);
export const updateSize = (restaurant, data) => api.put(`/sizes/${restaurant}`, data);
export const getSizes = (restaurant) => api.get(`/sizes/${restaurant}`);
export const deleteSizes = (restaurant, id) => api.delete(`/sizes/${restaurant}/${id}`);

//-----------------------------------------------------------------------------------

export const getAllCustomers = (restaurant) => api.get(`/customers/${restaurant}`);

//-----------------------------------------------------------------------------------

export const getJWT = (data) => api.post("/auth", data, {
  headers: {
    "Content-Type": "application/json"
  }
});
