import api from "./api"; // your axios instance with baseURL = `${API_BASE_URL}/api`

const sellerService = {
  getSellerItems: async (sellerId, token) => {
    const res = await api.get(`/seller/items/${sellerId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  },

  updateItem: async (id, data, token) => {
    const res = await api.put(`/seller/item/${id}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  },

  deleteItem: async (id, token) => {
    const res = await api.delete(`/seller/item/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  },

  addItem: async (payload, token) => {
    const res = await api.post(`/seller/item`, payload, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  },

  getSellerStats: async (sellerId, token) => {
    const res = await api.get(`/seller/stats/${sellerId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  }
};

export default sellerService;
