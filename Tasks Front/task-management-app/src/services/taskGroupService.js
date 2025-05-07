// src/services/taskGroupService.js
import { axiosInstance } from './AuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333/auth/planification/task-groups';

const taskGroupService = {
  // Récupérer tous les groupes de tâches
  getAllTaskGroups: async () => {
    const response = await axiosInstance.get(`${API_URL}/list_task_groups`);
    return response.data;
  },
  
  // Récupérer un groupe de tâches par son ID
  getTaskGroupById: async (groupId) => {
    const response = await axiosInstance.get(`${API_URL}/${groupId}`);
    return response.data;
  },
  
  // Créer un nouveau groupe de tâches
  createTaskGroup: async (groupData) => {
    const response = await axiosInstance.post(`${API_URL}/add_task_group`, groupData);
    return response.data;
  },
  
  // Mettre à jour un groupe de tâches
  updateTaskGroup: async (groupId, groupData) => {
    const response = await axiosInstance.put(`${API_URL}/update_task_group/${groupId}`, groupData);
    return response.data;
  },
  
  // Supprimer un groupe de tâches
  deleteTaskGroup: async (groupId) => {
    const response = await axiosInstance.delete(`${API_URL}/delete_task_group/${groupId}`);
    return response.data;
  },
  
  // Récupérer toutes les tâches d'un groupe
  getTasksInGroup: async (groupId) => {
    const response = await axiosInstance.get(`${API_URL}/${groupId}/tasks`);
    return response.data;
  }
};

export default taskGroupService;