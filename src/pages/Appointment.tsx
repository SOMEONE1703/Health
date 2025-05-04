import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppBar from '../components/AppBar';
import { BASE_URL } from '@env';

type AppointmentScreenRouteProp = RouteProp<RootStackParamList, 'appointment'>;
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Appointment'>;
  route:AppointmentScreenRouteProp;
};

const handleCancelClick=()=>{
  console.log('Cancelling');
};
const handleSaveClick=()=>{
  console.log('Saving');
};

const Appointment : React.FC<Props> = ({navigation,route}) =>{
  const [changed,setChanged]=useState(false);
  const [loading,setLoading]=useState(false);
  const {appointment}=route.params;
  useEffect(()=>{
    const getAppointmentDetails=async()=>{
      setLoading(true);
      try{
        const response=await fetch(`${BASE_URL}/api/appointments`);
        const data=await response.json();
        if (!response.ok) {
          console.log(response);
          throw new Error(data.error || "Login failed");
        }
      }
      catch(error:any){
        console.error("Login error:",error.message);
      }
      finally{
        setLoading(false);
      }
    };
    getAppointmentDetails();
  },[]);
  return (
    <View style={{paddingTop:20}}>
      <AppBar title={"something"}></AppBar>
      <View style={styles.page}>
        <Text>{appointment.appointment_id}</Text>
        <Text>This is the Appointment Page</Text>
        <View style={styles.finalOptions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>{handleCancelClick()}}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={()=>{handleSaveClick()}}
          >
            <Text style={styles.saveText}>{changed?"Submit":"Save"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page:{
    
  },
  cancelButton:{
    height:30,
    backgroundColor:'#DDDDDD',
    width:'40%',
    borderRadius:5,
  },
  saveButton:{
    height:30,
    backgroundColor:'#000959',
    width:'40%',
    borderRadius:5,
  },
  finalOptions:{
    flexDirection:'row',
    justifyContent:'center',
    gap:20,
  },
  cancelText:{
    color:'#000959',
    fontSize:20,
    alignSelf:'center'
  },
  saveText:{
    color:'#DDDDDD',
    fontSize:20,
    alignSelf:'center'
  }
  
  
});


export default Appointment;