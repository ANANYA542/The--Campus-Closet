import api from "./api";

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  signup: (data) => api.post("/auth/signup", data),
};

export default authService;

