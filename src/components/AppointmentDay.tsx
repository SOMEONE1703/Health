import React,{useState} from 'react';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppointmentTile from './AppointmentTile';

type appointment=any;
type Props = {
  appointments: Array<appointment>;
  day: any;
  date: any;
};
  
const AppointmentDay=({ appointments, day, date}: Props)=>{
    return(
    <View
    style={styles.outerTile}
    >
        <Text style={styles.date}>{day}, {date}</Text>
        <View style={styles.line}></View>
        {
            appointments.length==0?
            <Text style={styles.emptyAppointments}>Nothing planned yet</Text>:
            appointments.map((appointment)=>(<AppointmentTile appointment={appointment.appointment_id}/>))
        }
    </View>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'column',
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        width:'100%',
    },
    line:{
        width:"99%",
        height:1,
        color:'#000959',
    },
    emptyAppointments:{

    },
    date:{
        
    }

   
    

});

export default AppointmentDay;