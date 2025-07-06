import React, { useEffect, useState, createContext, useContext } from 'react';

type AuthContextType = {
    username: string | null;
    userId: string | null;
    token: string | null;
    setUsername?: (username: string | null) => void;
    setUserId?: (userId: string | null) => void;
    setToken?: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  username: null,
  userId: null,
  token: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        
    }, []); // 👈 Only run once

    return (
    <AuthContext.Provider value={{ 
        username, 
        userId, 
        token, 
        setUsername, 
        setUserId, 
        setToken 
    }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a SocketProvider');
  }
  return context;
};

export const useUpdateAuth = () => {
  const { setUsername, setUserId, setToken } = useAuth();

  return (username: string, userId: string, token: string) => {
    if (setUsername) setUsername(username);
    if (setUserId) setUserId(userId);
    if (setToken) setToken(token);
    console.log("Auth updated:", { username, userId, token });
  };
};