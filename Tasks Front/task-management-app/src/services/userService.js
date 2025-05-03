// src/services/userService.js
import { axiosInstance } from './AuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333/api';

const userService = {
  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    const response = await axiosInstance.get(`${API_URL}/users`);
    return response.data;
  },

  // Récupérer un utilisateur par son ID
  getUserById: async (userId) => {
    const response = await axiosInstance.get(`${API_URL}/users/${userId}`);
    return response.data;
  },

  // Mettre à jour un utilisateur
  updateUser: async (userId, userData) => {
    const response = await axiosInstance.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  }
};

export default userService;