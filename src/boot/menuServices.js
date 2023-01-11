import axios from "axios";
import { api } from "./axios.js";


/* refeito */ export const getMenus = (restaurant) => api.get(`/menus/${restaurant}`);
/* refeito */ export const updateMenu = (id, data) =>
  api.put(`/menus/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
/* refeito */ export const getSpecificMenu = (id, restaurant) => api.get(`/menus/${restaurant}/${id}`);

//-----------------------------------------------------------------------------------

/* refeito */ export const createDrink = (restaurant, data) => api.post(`/drinks/${restaurant}`, data);
/* refeito */ export const updateDrink = (restaurant, data) => api.put(`/drinks/${restaurant}`, data);
/* refeito */ export const getDrinks = (restaurant) => api.get(`/drinks/${restaurant}`);
/* refeito */ export const deleteDrinks = (restaurant, id) => api.delete(`/drinks/${restaurant}/${id}`);

//-----------------------------------------------------------------------------------
/* refeito */ export const createSize = (restaurant, data) => api.post(`/sizes/${restaurant}`, data);
/* refeito */ export const updateSize = (restaurant, data) => api.put(`/sizes/${restaurant}`, data);
/* refeito */ export const getSizes = (restaurant) => api.get(`/sizes/${restaurant}`);
/* refeito */ export const deleteSizes = (restaurant, id) => api.delete(`/sizes/${restaurant}/${id}`);

//-----------------------------------------------------------------------------------
export const getJWT = (data) => api.post("/auth", data, {
  headers: {
    "Content-Type": "application/json"
  }
});
