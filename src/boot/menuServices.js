import axios from "axios";
import { api } from "./axios.js";


/* refeito */ export const getMenus = (restaurant) => api.get(`/menus/restaurants/${restaurant}`);
/* refeito */ export const updateMenu = (id, data) =>
  api.put(`/menus/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
/* refeito */ export const getSpecificMenu = (id, restaurant) => api.get(`/menus/restaurants/${restaurant}/${id}`);
//-----------------------------------------------------------------------------------
export const createDrink = (data) => api.post("/drinks", data);
export const updateDrink = (id, data) =>
  api.put(`/drinks/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
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
