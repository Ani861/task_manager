import api from "../api/axios";

export const authService = {
  login: async (credentials) => {
    const data = new URLSearchParams();
    data.append("username", credentials.username);
    data.append("password", credentials.password);
    return api.post("/auth/token", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  register: async (userData) => {
    return api.post("/auth/register", userData);
  },
};
