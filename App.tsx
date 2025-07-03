import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SocketProvider } from './src/Contexts/SocketContext';
import MainApp from './MainApp';

function App() {
  
  return (
    <SafeAreaProvider>
      <SocketProvider>
        <MainApp />
      </SocketProvider>
    </SafeAreaProvider>
  );
}

export default App;