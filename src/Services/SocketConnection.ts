import io, { Socket } from 'socket.io-client';
import { BASE_URL } from '@env';

let socket: Socket | null = null;

export const initializeSocket = (userId: string): Socket => {
  if (socket) {
    return socket; // Return existing socket if already initialized
  }

  console.log("Initializing socket connection");
  socket = io(BASE_URL);

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("idRequest", (data: any, callback: (response: any) => void) => {
    console.log(data);
    const response = { received: true, id: userId };
    socket?.emit("idResponse", response);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const receiveNotificationHandler = (handler: (notification: any) => void): void => {
  if (socket) {
    socket.on("receiveNotification", handler);
  }
};