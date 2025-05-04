import React, { useState } from 'react';
import { View,Image, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,Keyboard  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { TextInput } from 'react-native-gesture-handler';
import { BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
//import { Image } from 'react-native-reanimated/lib/typescript/Animated';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Signup'>;
};
// const response=await fetch(`${BASE_URL}/api/appointments`);
const Signup : React.FC<Props> = ({navigation}) =>{
  const [Username,setUsername]=useState('');
  const [UsernameFocused,setUsernameFocused]=useState(false);
  const [Email,setEmail]=useState('');
  const [EmailFocused,setEmailFocused]=useState(false);
  const [Password1,setPassword1]=useState('');
  const [Password1Focused,setPassword1Focused]=useState(false);
  const [Password2,setPassword2]=useState('');
  const [Password2Focused,setPassword2Focused]=useState(false);
  const [Loading,setLoading]=useState(true);

  const validateInput=(Username:string,Email:string,Password1:string,Password2:string)=>{
    if([Username.trim(),Email.trim(),Password1.trim(),Password2.trim()].includes("")){
      Toast.show({
        type: 'error', // or 'error' | 'info'
        text1: 'Please fill in all information',
      });
      addToast("error",'Please fill in all information');
      return false;
    }
    if (Username.trim().length<4){
      addToast("error","Username should be at least 4 characters long.")
      return false;
    }

    if(Password1!=Password2){
      Toast.show({
        type: 'error', // or 'error' | 'info'
        text1: 'Passwords do not match',
      });
      return false;
    }
    return validatePassword(Password1);
  }
  const validatePassword = (password:string) => {
    const minLength = 4;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
        addToast("error",`Password should be at least ${minLength} characters long.`);
        return false;
    } else if (!hasUppercase) {
        addToast("error",'Password should contain at least one uppercase letter.');
        return false;
    } else if (!hasLowercase) {
        addToast("error",'Password should contain at least one lowercase letter.');
        return false;
    } else if (!hasDigit) {
        addToast("error",'Password should contain at least one number.');
        return false;
    } else if (!hasSpecialChar) {
        addToast("error",'Password should contain at least one special character.');
        return false;
    }
    return true;
  };
  const addToast=(type:string,message:string)=>{
    Toast.show({
      type: type, // or 'error' | 'info'
      text1: message,
    });
  };
  const googleSubmit=async()=>{
    if(Loading)return;
    setLoading(true);
    try{
      Toast.show({
        type: 'error', // or 'error' | 'info'
        text1: 'Not Implemented',
      });
    }
    catch(error:any){
      console.error("Signup error:",error.message);
    }
    finally{
      setLoading(false);
    }
  }
  const handleSubmit=async()=>{
    console.log("called");
    if(Loading)return;
    setLoading(true);
    try{
      if (!validateInput(Username,Email,Password1,Password2)){
        setLoading(false);
        return;
      }
      const response=await fetch(`${BASE_URL}/api/auth/signup`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname:Username,email: Email, password: Password1 }),
      });
      
      const data=await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(data.error || "Signup failed");
      }
      addToast("success",data.message);
      navigation.navigate("Login");
    }
    catch(error:any){
      console.error("Signup error:",error.message);
      addToast("error",`Sign up failed: ${error}`);
      
    } finally {
    setLoading(false);
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.page}>
      <Text
      style={styles.mainTitle}
      >Create Account</Text>
      <View
        style={{width:'80%'}}
      >
        <Text
          style={styles.welcome}
        >
          Create an account to explore medical facilities around you!
        </Text>
      </View>

      <View style={{height:20}}></View>
      <TextInput
        style={UsernameFocused?styles.inputFocused:styles.input}
        onChangeText={setUsername}
        onFocus={()=>setUsernameFocused(true)}
        onBlur={()=>setUsernameFocused(false)}
        value={Username}
        placeholder="Username"
        keyboardType="default"
      />
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
        style={Password1Focused?styles.inputFocused:styles.input}
        onChangeText={setPassword1}
        onFocus={()=>setPassword1Focused(true)}
        onBlur={()=>setPassword1Focused(false)}
        value={Password1}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={Password2Focused?styles.inputFocused:styles.input}
        onChangeText={setPassword2}
        onFocus={()=>setPassword2Focused(true)}
        onBlur={()=>setPassword2Focused(false)}
        value={Password2}
        placeholder="Confirm Password"
        secureTextEntry
      />
      

      <TouchableOpacity 
      onPress={()=>handleSubmit()}
      style={styles.proceedButton}>
        <Text 
        style={{color:"white", fontSize:20}}

        >Sign up</Text>
      </TouchableOpacity>

      <Text
        style={styles.createAccount}
        onPress={()=>{navigation.navigate('Login')}}
        >Already have an account</Text>
      <View style={{height:30}}></View>
      <Text
        style={styles.passwordReset}
      >OR</Text>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={()=>{googleSubmit()}}>
          <Image
          style={{height:20,width:20}}
          source={require("../../assets/pictures/google-logo.png")}
          ></Image>
          <Text
          style={{color:"#000959",fontWeight:600}}
          >Continue with Google</Text>
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
    position:'absolute',
    height:100,
    width:100,
    top: 20,
    left: 20,
    backgroundColor:'white',
  },
  
});


export default Signup;