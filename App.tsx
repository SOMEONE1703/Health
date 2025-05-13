import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Home from './src/pages/Home';
import Landing from './src/pages/Landing';
import Login from './src/pages/Login';
import ForgotPassword from './src/pages/ForgotPassword';
import Appointments from './src/pages/Appointments';
import Institutions from './src/pages/Institutions';
import Appointment from './src/pages/Appointment';
import Notifications from './src/pages/Notifications';
import CreateAppointment from './src/pages/CreateAppointment';
import Profile from './src/pages/Profile';
import ChatScreen from './src/pages/ChatScreen';
import { StackActions } from '@react-navigation/native';
import {RootStackParamList} from './src/types/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Signup from './src/pages/Signup';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the navigation stack types

type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

const Stack = createStackNavigator<RootStackParamList>();
function App(){
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try{
      const storedToken = await AsyncStorage.getItem("Health-Token");
      setToken(storedToken);
      console.log(storedToken);
      }catch(e){
        console.log(e);
      }
      
      setLoading(false);
    };
    getToken();
  }, []);
  console.log(token);
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={token?Home:Landing} />
        <Stack.Screen name="Home" component={token?Home:Login} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Appointments" component={token?Appointments:Login} />
        <Stack.Screen name="Institutions" component={token?Institutions:Login} />
        <Stack.Screen name="Notifications" component={token?Notifications:Login} />
        <Stack.Screen name="Appointment" component={token?Appointment:Login} />
        <Stack.Screen name="CreateAppointment" component={token?CreateAppointment:Login} />
        <Stack.Screen name="ChatScreen" component={token?ChatScreen:Login} />
        <Stack.Screen name="Profile" component={Profile} />
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
