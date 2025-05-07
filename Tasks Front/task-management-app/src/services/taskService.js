import { axiosInstance } from './AuthService'; // ✅ Réutilisation propre
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333/auth/planification/tasks';

const taskService = {
  getAllTasks: async () => {
    const response = await axiosInstance.get(`${API_URL}/list_tasks`);
    return response.data;
  },

  getMyTasks: async () => {
    const response = await axiosInstance.get(`${API_URL}/list_tasks_for_user`);
    return response.data;
  },

  createTask: async (taskData) => {
    const { createdBy, ...cleanTaskData } = taskData;
    const response = await axiosInstance.post(`${API_URL}/add_task`, cleanTaskData);
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await axiosInstance.put(`${API_URL}/update_task/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await axiosInstance.delete(`${API_URL}/delete_task/${taskId}`);
    return response.data;
  },

  assignTask: async (taskId, userId) => {
    const response = await axiosInstance.post(`${API_URL}/assign_task_to_user/${taskId}/users/${userId}`);
    return response.data;
  },

  changeTaskStatus: async (taskId, status) => {
    const response = await axiosInstance.put(`${API_URL}/change_task_status/${taskId}`, { status });
    return response.data;
  },

  changeTaskGroup: async (taskId, taskGroupId) => {
    const response = await axiosInstance.put(`${API_URL}/change_task_group/${taskId}`, { taskGroupId });
    return response.data;
  },

  updateProgression: async (taskId, progression) => {
    const response = await axiosInstance.put(`${API_URL}/update_progression/${taskId}`, { progression });
    return response.data;
  },

  getTasksInLate: async () => {
    const response = await axiosInstance.get(`${API_URL}/tasks_in_late`);
    return response.data;
  }
};

export default taskService;
