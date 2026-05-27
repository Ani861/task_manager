import api from "../api/axios";

export const authService = {
  login: async (credentials) => {
    return api.post("/login", credentials);
  },
  register: async (userData) => {
    return api.post("/register", userData);
  },
};
