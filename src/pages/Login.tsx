import React, { useState } from 'react';
import { View,Image, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,Keyboard  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { TextInput } from 'react-native-gesture-handler';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useSocket ,registerSocketConnection } from '../Contexts/SocketContext';
//import { Image } from 'react-native-reanimated/lib/typescript/Animated';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};
// const response=await fetch(`${BASE_URL}/api/appointments`);
const Login : React.FC<Props> = ({navigation}) =>{
  const [Email,setEmail]=useState('');
  const [EmailFocused,setEmailFocused]=useState(false);
  const [Password,setPassword]=useState('');
  const [PasswordFocused,setPasswordFocused]=useState(false);
  const [error, setError] = useState('');
  const [Loading,setLoading]=useState(false);
  const { socket } = useSocket();
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
      console.log(`${BASE_URL}/api/auth/login`);
      const response=await fetch(`${BASE_URL}/api/auth/login`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      
      const data=await response.json();
      console.log("Response data:",data);
      if (!response.ok) {
        console.log(response);
        throw new Error(data.error || "Login failed");
      }
      registerSocketConnection(data.userId,socket);
      await AsyncStorage.setItem("Health-Token", data.token); // has the userId in database
      //await AsyncStorage.setItem("Health-Role",data.role);
      //console.log(`data.token:${data.token}`);
      //const token1=await AsyncStorage.getItem("Health-Token");
      //console.log(`storage token:${token1}`);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.page}>
      <Text
      style={styles.mainTitle}
      >Login here</Text>

      <Text
        style={styles.welcome}
      >
        Welcome back,{"\n"}you have been missed!
      </Text>
      
      <View style={{height:20}}></View>

      <TextInput
        style={EmailFocused?styles.inputFocused:styles.input}
        onChangeText={setEmail}
        onFocus={()=>setEmailFocused(true)}
        onBlur={()=>setEmailFocused(false)}
        value={Email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={PasswordFocused?styles.inputFocused:styles.input}
        onChangeText={setPassword}
        onFocus={()=>setPasswordFocused(true)}
        onBlur={()=>setPasswordFocused(false)}
        value={Password}
        placeholder="Password"
        secureTextEntry
      />

      <View
      style={styles.passwordResetView}
      >
        <Text
        style={styles.passwordReset}
        onPress={()=>{navigation.navigate('ForgotPassword')}}
        >Forgot your password?</Text>
      </View>

      <TouchableOpacity style={styles.proceedButton}>
        <Text 
        style={{color:"white", fontSize:20}}
        onPress={(e)=>handleSubmit()}
        >Sign in</Text>
      </TouchableOpacity>

      <Text
        style={styles.createAccount}
        onPress={()=>{navigation.navigate('Signup')}}
        >Create new account</Text>

      <View style={{height:30}}></View>

      <Text
        style={styles.passwordReset}
      >OR</Text>

      <TouchableOpacity
      style={styles.googleButton}
      onPress={()=>{googleSubmit()}}>
        <Image
          style={{height:20,width:20}}
          source={require("../../assets/pictures/google-logo.png")}/>
        <Text style={{color:"#000959",fontWeight:600}}>
          Continue with Google
        </Text>
      </TouchableOpacity>
      {Loading?<TouchableOpacity
      onPress={()=>{console.log('Doing nothing')}}
      style={styles.loadingModal}>
        <ActivityIndicator size={'large'} color={'#000959'}/>
      </TouchableOpacity>:null}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  page:{
    flex:1,
    paddingTop:20,
    justifyContent:'center',
    alignItems:'center',
    gap: 30
  },
  input:{
    height:50,
    width:'80%',
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#DDDDDD',
    backgroundColor:'#DDDDDD',
  },
  inputFocused:{
    height:50,
    width:'80%',
    borderWidth: 2,
    borderRadius:10,
    borderColor:'#000959',
    backgroundColor:'#DDDDDD',
  },
  mainTitle:{
    color:'#000959',
    fontSize:35,
    fontWeight:900,
  },
  welcome:{
    color:'black',
    fontSize:18,
    fontWeight:600,
    textAlign:'center'
  },
  passwordResetView:{
    flexDirection:'row',
    justifyContent:'flex-end',
    width:'80%',
  },
  passwordReset:{
    fontSize:15,
    fontWeight:600,
    color:'#000959',
  },
  createAccount:{
    fontSize:15,
    fontWeight:600,
    color:'#545353',
  },
  proceedButton:{
    flexDirection:'column',
    backgroundColor:"#000959",
    height:50,
    width:'80%',
    borderRadius:20,
    justifyContent:"center",
    alignItems:'center',
  },
  googleButton:{
    flexDirection:'row',
    backgroundColor:"#DDDDDD",
    height:50,
    width:'80%',
    borderRadius:20,
    justifyContent:"center",
    alignItems:'center',
    gap:10,
    // shadowColor:'#545353',
    borderColor:"#DDDDDD",
    borderWidth:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingModal:{
    flexDirection:'column',
    justifyContent:"center",
    position:'absolute',
    height:'80%',
    width:'80%',
    top: '15%',
    left: '10%',
    backgroundColor:'transparent',
    alignItems:'center',
  },
  loader:{
    width:48,
    height:48,
    borderRadius:'50%',
    position:'relative',
  },
  
});


export default Login;