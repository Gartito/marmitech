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
export const getDrinks = () => api.get("/drinks");
export const deleteDrinks = (id) => api.delete(`/drinks/${id}`);

//-----------------------------------------------------------------------------------
export const createSize = (data) => api.post("/sizes", data);
export const updateSize = (id, data) =>
  api.put(`/sizes/${id}`, data, {
    headers: {
      "Content-Type": "application/json"
    },
  });
export const getSizes = () => api.get("/sizes");
export const deleteSizes = (id) => api.delete(`/sizes/${id}`);

//-----------------------------------------------------------------------------------
export const getJWT = (data) => api.post("/auth", data, {
  headers: {
    "Content-Type": "application/json"
  }
});
