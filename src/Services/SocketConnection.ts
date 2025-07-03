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

export const disconnectSocket = (socket:any): void => {
  if (socket) {
    console.log("Disconnecting socket");
    socket.disconnect();
  } else {
    console.error("Socket is not initialized, cannot disconnect");
  }
};

export const receiveNotificationHandler = (socket:any,handler: (notification: any) => void): void => {
  if (socket) {
    socket.on("receiveNotification", handler);
  }
};

export const receiveMessageHandler = (socket:any, handler: (message: any) => void): void => {
  if (socket) {
    socket.on("receiveMessage", handler);
  } else {
    console.error("Socket is not initialized, cannot handle message");
  }
};

export const sendMessage = (socket:any, message: any): void => {
  if (socket && socket.connected) {
    socket.emit("sendMessage", message);
  } else {
    console.error("Socket is not connected, cannot send message");
  }
};

export const readMessage = (socket:any, messageId: string): void => {
  if (socket && socket.connected) {
    socket.emit("readMessage", { messageId });
  } else {
    console.error("Socket is not connected, cannot read message");
  }
};

export const readNotification = (socket:any, notificationId: string): void => {
  if (socket && socket.connected) {
    socket.emit("readNotification", { notificationId });
  } else {
    console.error("Socket is not connected, cannot read notification");
  }
};
