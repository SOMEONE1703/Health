import React, { use, useState, useEffect } from 'react';
import { View,Image, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,Keyboard, StatusBar  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { TextInput } from 'react-native-gesture-handler';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import LogoutPopupMenu from '../components/LogoutPopupMenu';

//import { Image } from 'react-native-reanimated/lib/typescript/Animated';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};
// const response=await fetch(`${BASE_URL}/api/appointments`);
const Profile : React.FC<Props> = ({navigation}) =>{
  const [fullname,setFullName]=useState('');
  const [Email,setEmail]=useState('');
  const [role,setRole]=useState('');
  const [error, setError] = useState('');
  const [Loading,setLoading]=useState(false);
  const [logoutPopup,setLogoutPopup]=useState(false);

  const cancelLogout=()=>{
    setLogoutPopup(false);
  }

  useEffect(()=>{
    const getUserDetails=async()=>{
      const token=await AsyncStorage.getItem("Health-Token");
      setLoading(true);
      console.log("getting user details")
      try{
        const response=await fetch(`${BASE_URL}/api/user/`,
        {
          headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        const data=await response.json();
        if (!response.ok) {
          console.log(response);
          throw new Error(data.error || "Login failed");
        }
        console.log(data);
        setEmail(data.email);
        setFullName(data.firstname+" "+data.lastname);
        setRole(data.role);
      }
      catch(error:any){
        console.error("Login error:",error.message);
      }
      finally{
        setLoading(false);
      }
    };
    getUserDetails();
    
  },[]);

  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <View style={styles.page}>
      <AppBar navigation={navigation} title='Profile'></AppBar>     
      <View style={{alignItems:'center',width:'100%',height:'84%',gap:20, justifyContent:'space-between'}}>
        <View style={styles.infoContainer}>
          <Text style={styles.mainTitle}>{fullname}</Text>
          <Image source={require('../../assets/pictures/profileIcon.png')} style={{width:200,height:200}}></Image>
          <View style={{alignItems:'flex-start',width:'100%',height:'10%'}}>
            <Text style={{fontSize:20,color:'#000959',fontWeight:700,paddingLeft:10}}>Email:</Text>
            <View style={styles.fieldContainer}>
              <Text style={{fontSize:20,color:'#000959',fontWeight:700}}>{Email}</Text>
            </View>
            <Text style={{fontSize:20,color:'#000959',fontWeight:700,paddingLeft:10}}>Role:</Text>
            <View style={styles.fieldContainer}>
              <Text style={{fontSize:20,color:'#000959',fontWeight:700}}>{role}</Text>
            </View>
          </View>
        </View>
      {role=='admin'&&
      <TouchableOpacity
      onPress={()=>{setLogoutPopup(true)}}
      style={styles.logoutButton}>
        <View style={styles.imageText}>
          <Text style={styles.logoutText}>Manage Users</Text>
        </View>
        {/* <Text style={{color:'white',fontSize:20,fontWeight:700}}>Logout</Text> */}
        <View style={{flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',}}>
          <Image source={require('../../assets/pictures/rightBlue.png')} style={{width:40,height:40}}></Image>
        </View>
      </TouchableOpacity>
  }
      <TouchableOpacity
        onPress={()=>{setLogoutPopup(true)}}
        style={styles.logoutButton}>
          <View style={styles.imageText}>
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
          {/* <Text style={{color:'white',fontSize:20,fontWeight:700}}>Logout</Text> */}
          <View style={{flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',}}>
            <Image source={require('../../assets/pictures/logout-icon.png')} style={{width:30,height:30}}></Image>
          </View>
      </TouchableOpacity>
      </View>
      {logoutPopup&&<LogoutPopupMenu visible={logoutPopup} cancel={cancelLogout} navigation={navigation} />}
      
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
  logoutButton:{
    flexDirection:'row',
    backgroundColor:'#FFFFFF',
    width:'98%',
    height:'9%',
    borderRadius:10,
    elevation:1,
    //alignSelf:'flex-end',
  },
  fieldContainer:{
    width:'98%',
    height:40,
    backgroundColor:'#FFFFFF',
    //borderRadius:10,
    color:'#000959',
    elevation:2,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  imageText:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    width:'85%',
    height:'100%',
  },
  logoutText:{
    color:'#000959',
    fontSize:20,
    fontWeight:700,
    paddingLeft:10,
  },
  infoContainer:{
    width:'100%',
    height:'70%',
    // backgroundColor:'#DDDDDD',
    // borderRadius:10,
    // elevation:5,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  
  
});


export default Profile;