import api from "./api";

export const chatService = {
  createConversation: (data, token) =>
    api.post("/conversations", data, { headers: { Authorization: `Bearer ${token}` } }),
  getConversations: (userId, token) =>
    api.get(`/conversations/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
  getMessages: (conversationId, token) =>
    api.get(`/messages/${conversationId}`, { headers: { Authorization: `Bearer ${token}` } }),
  sendMessage: (payload, token) =>
    api.post(`/messages`, payload, { headers: { Authorization: `Bearer ${token}` } }),
  markRead: (payload, token) =>
    api.post(`/messages/read`, payload, { headers: { Authorization: `Bearer ${token}` } }),
};

export default chatService;
