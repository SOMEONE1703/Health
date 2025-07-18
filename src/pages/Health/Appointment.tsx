import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, ScrollView,StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import AppBar from '../../components/AppBar';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../../components/NavBar';

type AppointmentScreenRouteProp = RouteProp<RootStackParamList, 'appointment'>;
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Appointment'>;
  route:AppointmentScreenRouteProp;
};



const Appointment : React.FC<Props> = ({navigation,route}) =>{
  const [changed,setChanged]=useState(false);
  const [loading,setLoading]=useState(false);
  const [doctor,setDoctor]=useState("");
  const [institution,setInstitution]=useState("");
  const [startTime,setStartTime]=useState("");
  const [endTime,setEndTime]=useState("");
  const [location,setLocation]=useState("");
  const [description,setDescription]=useState("");
  const {appointment}=route.params;
  let token:string|null;
  
  const handleCancelClick=()=>{
    navigation.goBack();
  };
  const handleSaveClick=()=>{
    console.log('Saving');
    updateAppointment();
  };

  const updateAppointment=async()=>{
    setLoading(true);
    try{
      if (!token){
        token=await AsyncStorage.getItem("Health-Token");
      }
      const response=await fetch(`${BASE_URL}/api/appointments/${appointment._id}`,
      {
        method:"PUT",
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ doctor: doctor, institution:institution, startTime:startTime, endTime:endTime}),
      });
      const data=await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(data.error || "Updating appointment failed");
      }
    }
    catch(error:any){
      console.error("Error updating appointment:",error.message);
    }
    finally{
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    setDoctor(appointment.doctor);
    setInstitution(appointment.institution);
    setStartTime(appointment.startTime);
    setEndTime(appointment.endTime)
    setDescription("what in the actual fuck");
    const getAppointmentDetails=async()=>{
      token=await AsyncStorage.getItem("Health-Token");
      setLoading(true);
      try{
        const response=await fetch(`${BASE_URL}/api/appointments`,
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
    <>
    <StatusBar barStyle="dark-content"/>
    <View style={styles.container}>
      <AppBar navigation={navigation} title={"Appointment"} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled" // Important for TextInputs
      >
        <View style={styles.contentContainer}>
          <Text style={styles.titles}>Doctor</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={setDoctor}
            value={doctor}
          />
  
          <Text style={styles.titles}>Institution</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={setInstitution}
            value={institution}
          />
  
          <Text style={styles.titles}>Start Time</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={setStartTime}
            value={startTime}
          />
  
          <Text style={styles.titles}>End Time</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={setEndTime}
            value={endTime}
          />
  
          <Text style={styles.titles}>Description</Text>
          <TextInput
            style={[styles.inputs, { height: 100 ,textAlignVertical:'top'}]} // Taller for description
            onChangeText={setDescription}
            value={description}
            multiline
          />
  
          <Text style={styles.titles}>Location</Text>
          <View style={styles.mapPlaceholder} />
  
          <View style={styles.finalOptions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelClick}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveClick}
            >
              <Text style={styles.saveText}>{changed ? "Submit" : "Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  page:{
    gap:5
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
  },
  titles:{
    fontSize:20,
    fontWeight:800,
    paddingLeft:15,
    color:'#000959'
  },
  inputs:{
    height:50,
    width:'90%',
    //borderWidth: 2,
    borderRadius:10,
    backgroundColor:'#DDDDDD',
    alignSelf:'center',
    fontSize:17,
    fontWeight:600,
  },
  status:{
    flexDirection:'column',
    justifyContent:'center',
    height:50,
    width:'90%',
    //borderWidth: 2,
    borderRadius:10,
    backgroundColor:'#DDDDDD',
    alignSelf:'center',
    fontSize:17,
    fontWeight:600,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff' // Add background color
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40, // Extra padding for scroll space
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    gap: 15
  },
  mapPlaceholder: {
    height: 200, // Fixed height instead of percentage
    width: '90%',
    backgroundColor: '#DDDDDD',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20
  },
  
});


export default Appointment;