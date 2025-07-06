import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SocketProvider } from './src/Contexts/SocketContext';
import { AuthProvider } from './src/Contexts/AuthContext';
import MainApp from './MainApp';

function App() {
  
  return (
    <SafeAreaProvider>
      <SocketProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </SocketProvider>
    </SafeAreaProvider>
  );
}

export default App;