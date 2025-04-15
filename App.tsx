import React from 'react';
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
import {RootStackParamList} from './src/types/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Signup from './src/pages/Signup';
import Toast from 'react-native-toast-message';
// Define the navigation stack types

type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

const Stack = createStackNavigator<RootStackParamList>();
function App(){
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Appointments" component={Appointments} />
        <Stack.Screen name="Institutions" component={Institutions} />
        <Stack.Screen name="Appointment" component={Appointment} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
