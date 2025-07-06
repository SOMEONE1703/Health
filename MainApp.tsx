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
import Signup from './src/pages/Signup';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import { useSocket } from './src/Contexts/SocketContext';
import { navigationRef } from './src/Services/NavigationRef';
import { registerSocketConnection } from './src/Services/SocketConnection';
import { useAuth,useUpdateAuth } from './src/Contexts/AuthContext';


type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

const Stack = createStackNavigator<RootStackParamList>();

function MainApp() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  var localSocket=useSocket();
  const updateAuth = useUpdateAuth();
  console.log("In MainApp, localSocket:", localSocket); 
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("Health-Token");
        setToken(storedToken);
        console.log("Checking validity of stored token:", storedToken);
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
        updateAuth(data.username, data.id, storedToken);
        registerSocketConnection(data.id,localSocket.socket);
        //if token is valid, navigate to Home
        if(navigationRef.isReady()) {
          console.log("Valid token, navigating to Home");
          navigationRef.navigate("Home");
        }
            

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
      if (localSocket.socket) {
        console.log("Disconnecting socket");
        // Unregister socket listeners if necessary
        // localSocket.socket.off("idResponse");
        // localSocket.off("connect");
        // localSocket.off("disconnect");
        // localSocket.off("receiveNotification");
        // localSocket.disconnect();
      }
    };
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <>
    <NavigationContainer ref={navigationRef}>
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
    </>
  );
}

export default MainApp;