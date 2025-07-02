import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Home from './src/pages/Health/Home';
import Landing from './src/pages/Landing';
import Login from './src/pages/Login';
import ForgotPassword from './src/pages/ForgotPassword';
import Appointments from './src/pages/Health/Appointments';
import Institutions from './src/pages/Health/Institutions';
import Appointment from './src/pages/Health/Appointment';
import Notifications from './src/pages/Health/Notifications';
import CreateAppointment from './src/pages/Health/CreateAppointment';
import Profile from './src/pages/Profile';
import ChatScreen from './src/pages/ChatScreen';
import Chat from './src/pages/Chat';
import { RootStackParamList } from './src/types/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Signup from './src/pages/Signup';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import io, { Socket } from 'socket.io-client';
import { useSocket,SocketProvider } from './src/Contexts/SocketContext';

type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { socket, isConnected } = useSocket();
  
  const configureSocketConnection1 = (userId: string,socket:any) => {
    console.log("Configuring socket connection for user:", userId);
    if (!socket) {
      Toast.show({
        type: 'error',
        text1: 'Socket Error',
        text2: 'Socket is not initialized',
      });
      console.log("This is odd");
      console.error("Socket is not initialized");
      return;
    }
    console.log("Socket initialized:", socket.id);
    Toast.show({
      type: 'success',
      text1: 'Socket Connection',
      text2: `Connected to socket server for user ${userId}`,
    });
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    socket.on("idRequest", (data: any) => {
      console.log("Received idRequest with data:", data);
      const response = { received: true, id: userId };
      socket.emit("idResponse", response);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("receiveNotification", (notification: any) => {
      console.log("Received notification:", notification);
        //create popup notification

      }
    );
  };

  
  console.log("Socket connection status:", isConnected);
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("Health-Token");
        setToken(storedToken);
        
        if (!storedToken) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/api/user/check`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json"
          },
        });

        const data = await response.json();
        
        if (!response.ok) {
          console.log(response);
          throw new Error(data.error || "Fetching failed");
        }
        console.log("User data:", data);
        setUserId(data.id);
        configureSocketConnection1(data.id,socket);
      } catch (e) {
        console.log(e);
        // Clear invalid token
        await AsyncStorage.removeItem("Health-Token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
    
    return () => {
      console.log("Cleaning up socket connection");
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("receiveNotification");
        socket.disconnect();
      }
    };
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <SafeAreaProvider>
      <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Appointments" component={Appointments} />
          <Stack.Screen name="Institutions" component={Institutions} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Appointment" component={Appointment} />
          <Stack.Screen name="CreateAppointment" component={CreateAppointment} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
      </SocketProvider>
    </SafeAreaProvider>
  );
}

export default App;