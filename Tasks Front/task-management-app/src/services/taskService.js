// src/services/taskService.js
import { axiosInstance } from './AuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333/auth/planification/tasks';

const taskService = {
  // Récupérer toutes les tâches
  getAllTasks: async () => {
    const response = await axiosInstance.get(`${API_URL}/list_tasks`);
    return response.data;
  },

  // Récupérer les tâches assignées à l'utilisateur connecté (nécessite l’ID)
  getMyTasks: async (userId) => {
    const response = await axiosInstance.get(`${API_URL}/list_tasks_for_user/${userId}`);
    return response.data;
  },

  // Créer une tâche
  createTask: async (taskData) => {
    const response = await axiosInstance.post(`${API_URL}/add_task`, taskData);
    return response.data;
  },

  // Mettre à jour une tâche
  updateTask: async (taskId, taskData) => {
    const response = await axiosInstance.put(`${API_URL}/update_task/${taskId}`, taskData);
    return response.data;
  },

  // Supprimer une tâche
  deleteTask: async (taskId) => {
    const response = await axiosInstance.delete(`${API_URL}/delete_task/${taskId}`);
    return response.data;
  },

  // Assigner une tâche à un utilisateur
  assignTask: async (taskId, userId) => {
    const response = await axiosInstance.post(`${API_URL}/assign_task_to_user/${taskId}/users/${userId}`);
    return response.data;
  },

  // Marquer une tâche comme terminée (ou changer son statut)
  completeTask: async (taskId) => {
    const response = await axiosInstance.put(`${API_URL}/change_task_status/${taskId}`);
    return response.data;
  }
};

export default taskService;
