// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

// Configuration d'Axios avec intercepteurs pour ajouter le token
const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  // Connexion utilisateur
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/loginWithToken`, credentials);
    return response.data;
  },

  // Inscription utilisateur
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/registerWithToken`, userData);
    return response.data;
  },

  // Récupérer les informations de l'utilisateur actuel
  getCurrentUser: async () => {
    const response = await axiosInstance.get(`${API_URL}/auth/me`);
    return response.data;
  }
};

export default authService;
export { axiosInstance };