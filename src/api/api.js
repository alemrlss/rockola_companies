// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://devpsprojecrock-1.onrender.com/api", // Reemplaza con la URL de tu servidor NestJS
  headers: {
    "Content-Type": "application/json",
    // Puedes agregar otros encabezados aquí según tus necesidades
  },
});

export default api;
