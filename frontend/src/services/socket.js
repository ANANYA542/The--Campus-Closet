import { io } from "socket.io-client";

export const createSocket = (token) =>
  io("http://localhost:5050", {
    auth: { token },
    transports: ["websocket"],
  });

