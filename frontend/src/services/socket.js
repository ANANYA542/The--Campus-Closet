import { io } from "socket.io-client";
import API_BASE_URL from "../config/api.js";

export const createSocket = (token) =>
  io(API_BASE_URL, {
    auth: { token },
    transports: ["websocket"],
  });

