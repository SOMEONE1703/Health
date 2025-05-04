import React,{useEffect,useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { BASE_URL } from '@env';
import AppointmentDay from '../components/AppointmentDay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import AppBar from '../components/AppBar';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Appointments'>;
};

type appointment={
  appointment_id:string;
  institution:string;
  doctor:string;
  startTime:string;
  endTime:string;
  status:string;
}

type AppointmentDayEntry={
  day:string,
  date:string,
  appointments:Array<appointment>
}
const weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const Appointments : React.FC<Props> = ({navigation}) =>{
  const appointmentEntries: AppointmentDayEntry[] = [
    {
      day: "Monday",
      date: "2025-04-14",
      appointments: [
        {
          appointment_id:"1",
          institution: "City Health Clinic",
          doctor: "Dr. John Smith",
          startTime: "09:00",
          endTime: "10:00",
          status: "approved"
        },
        {
          appointment_id:"1",
          institution: "Town Dental Center",
          doctor: "Dr. Jane Doe",
          startTime: "11:30",
          endTime: "12:30",
          status: "pending"
        }
      ]
    },
    {
      day: "Tuesday",
      date: "2025-04-15",
      appointments: [
        {
          appointment_id:"1",
          institution: "Downtown Eye Care",
          doctor: "Dr. Emily Clark",
          startTime: "13:00",
          endTime: "14:00",
          status: "approved"
        }
      ]
    },
    {
      day: "Wednesday",
      date: "2025-04-16",
      appointments: [
        {
          appointment_id:"1",
          institution: "General Hospital",
          doctor: "Dr. Mark Taylor",
          startTime: "08:30",
          endTime: "09:30",
          status: "declined"
        },
        {
          appointment_id:"1",
          institution: "Skin Specialist Clinic",
          doctor: "Dr. Anna Lee",
          startTime: "15:00",
          endTime: "16:00",
          status: "approved"
        }
      ]
    }
  ];
  const today=new Date();
  const oneDayAgo = new Date(today);
  oneDayAgo.setDate(today.getDate() - 1);
  const threeDaysAhead = new Date(today);
  threeDaysAhead.setDate(today.getDate() + 3);
  const [appointmentDays, setAppointmentDays] = useState<AppointmentDayEntry[]>(appointmentEntries);
  const [earliest,setEarliest]=useState(oneDayAgo);
  const [latest,setLatest]=useState(threeDaysAhead);
  const getAppointments=async()=>{
    try{
    const token=await AsyncStorage.getItem("Health-Token");
    
    const response=await fetch(`${BASE_URL}/api/appointments/between`,
      {
        method: "POST",
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          startDate:oneDayAgo.toISOString(),
          endDate:threeDaysAhead.toISOString()}),
      });
      const data1=await response.json();
      const data=data1.data;
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Fetching failed");
      }
      //split by day into appointmentDay
      
      for (let i=oneDayAgo;i<threeDaysAhead;i.setDate(i.getDate() + 1))
      {
        let currDay=weekdays[i.getDay()]
        console.log(currDay);
        let currDate=i.toISOString().substring(0,10);
        console.log(currDate);
        let appointmentDayEntry:AppointmentDayEntry={
          day:currDay,
          date:currDate,
          appointments:[]
        }

        for(let i=0;i<data.length;i++){
          if (data[i].date.substring(0,10)==currDate){
            appointmentDayEntry.appointments.push(data[i]);
          }
        }
        setAppointmentDays(appointmentDays=>[...appointmentDays,appointmentDayEntry]);
      }
      

    } catch(error){
      console.error("error,",error);
    }
  };
  useEffect(()=>{
    getAppointments();
  }, []);
  return (
    <View style={{paddingTop:20}}>
    <AppBar title='Appointments'></AppBar>
    <ScrollView>
      <View style={styles.page}>
        {appointmentDays.map((appointmentDay, index)=>
        <AppointmentDay
        key={index} 
        appointments={appointmentDay.appointments} 
        day={appointmentDay.day} date={appointmentDay.date} 
        navigation={navigation}></AppointmentDay>)}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page:{
    flex:1,
  },
  
});


export default Appointments;