import axios from "axios";

// JWT Token are set automatically at @see ../contexts/User.jsx
export const api = axios.create({
  baseURL: "http://localhost:8080/"
});
