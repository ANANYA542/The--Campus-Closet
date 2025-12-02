import axios from "axios";
import API_BASE_URL from "../config/api.js";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export default api;