// src/services/taskService.js
import { axiosInstance } from './AuthService';
// Correct the import statement to match the exact casing of the file name
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333/api';

const taskService = {
  // Récupérer toutes les tâches
  getAllTasks: async () => {
    const response = await axiosInstance.get(`${API_URL}/tasks`);
    return response.data;
  },

  // Récupérer les tâches assignées à l'utilisateur connecté
  getMyTasks: async () => {
    const response = await axiosInstance.get(`${API_URL}/tasks/my-tasks`);
    return response.data;
  },

  // Récupérer une tâche par son ID
  getTaskById: async (taskId) => {
    const response = await axiosInstance.get(`${API_URL}/tasks/${taskId}`);
    return response.data;
  },

  // Créer une nouvelle tâche
  createTask: async (taskData) => {
    const response = await axiosInstance.post(`${API_URL}/tasks`, taskData);
    return response.data;
  },

  // Mettre à jour une tâche existante
  updateTask: async (taskId, taskData) => {
    const response = await axiosInstance.put(`${API_URL}/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Supprimer une tâche
  deleteTask: async (taskId) => {
    const response = await axiosInstance.delete(`${API_URL}/tasks/${taskId}`);
    return response.data;
  },

  // Assigner une tâche à un utilisateur
  assignTask: async (taskId, userId) => {
    const response = await axiosInstance.put(`${API_URL}/tasks/${taskId}/assign`, { assignedTo: userId });
    return response.data;
  },

  // Marquer une tâche comme terminée
  completeTask: async (taskId) => {
    const response = await axiosInstance.put(`${API_URL}/tasks/${taskId}/complete`);
    return response.data;
  }
};

export default taskService;