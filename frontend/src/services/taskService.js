import api from "../api/axios";

export const taskService = {
  getTasks: () => api.get("/tasks"),
  createTask: (taskData) => api.post("/tasks", taskData),
  updateTask: (taskId, updateData) => api.put(`/tasks/${taskId}`, updateData),
  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),
};
