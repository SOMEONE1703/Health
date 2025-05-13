import React, { useState } from 'react';
import { View,Image, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,Keyboard  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { TextInput } from 'react-native-gesture-handler';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

//import { Image } from 'react-native-reanimated/lib/typescript/Animated';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};
// const response=await fetch(`${BASE_URL}/api/appointments`);
const Notifications : React.FC<Props> = ({navigation}) =>{
  const [Email,setEmail]=useState('');
  const [EmailFocused,setEmailFocused]=useState(false);
  const [Password,setPassword]=useState('');
  const [PasswordFocused,setPasswordFocused]=useState(false);
  const [error, setError] = useState('');
  const [Loading,setLoading]=useState(false);

  const googleSubmit=async()=>{
    setLoading(true);
    try{
      Toast.show({
        type: 'error', // or 'error' | 'info'
        text1: 'Not Implemented',
      });
    }
    catch(error:any){
      console.error("Login error:",error.message);
    }
    finally{
      setLoading(false);
    }
  }
  const handleSubmit=async()=>{
    setLoading(true);
    if(Loading){
      console.log("already loading");
      return;
    }
    try{
      const response=await fetch(`${BASE_URL}/api/auth/login`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      
      const data=await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(data.error || "Login failed");
      }
      await AsyncStorage.setItem("Health-Token", data.token); // has the userId in database
      //await AsyncStorage.setItem("Health-Role",data.role);
      navigation.navigate("Home");
    }
    catch(error:any){
      console.error("Login error:",error.message);
      
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <>
    
    <View style={styles.page}>
        <AppBar navigation={navigation} title='Notifications'></AppBar>     
      <Text
        style={styles.mainTitle}
        >No new Notifications!</Text>

      
      
    </View>
    <NavBar navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  page:{
    flex:1,
    paddingTop:20,

    alignItems:'center',
    gap: 30
  },
  mainTitle:{
    fontSize:30,
    color:'#000959',
    fontWeight:700,
    textAlign:'center',
  },
  
  
});


export default Notifications;