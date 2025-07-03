import React, { useEffect, useState, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@env';

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  error: Error | null;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  error: null,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const newSocket = io(BASE_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    const handleConnect = () => {
      setIsConnected(true);
      setError(null);
      console.log('✅ Socket connected:', newSocket.id);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log('❌ Socket disconnected');
    };

    const handleError = (err: any) => {
      setError(err);
      console.error('🔥 Socket connection error:', err);
    };

    newSocket.on('connect', handleConnect);
    newSocket.on('disconnect', handleDisconnect);
    newSocket.on('connect_error', handleError);

    return () => {
      newSocket.off('connect', handleConnect);
      newSocket.off('disconnect', handleDisconnect);
      newSocket.off('connect_error', handleError);
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, []); // 👈 Only run once

  return (
    <SocketContext.Provider value={{ socket, isConnected, error }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const registerSocketConnection = (userId: string,socket: any,) => {
  console.log("Registering socket ID  for user:", userId);
  if (!socket || !socket.id) {
    console.error("Socket is not initialized");
    return;
  }
  console.log("Socket is initialized:", socket.id, "Registering user");
  
  const response = { received: true, id: userId };
  socket.emit("idResponse", response);

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  socket.on("receiveNotification", (notification: any) => {
    console.log("Received notification:", notification);
    // Handle notification logic here
  });
}
