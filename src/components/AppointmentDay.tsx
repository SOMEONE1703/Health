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

import { appointment } from '../types/appointment';

type Props = {
  key:any;
  appointments: Array<appointment>;
  day: any;
  date: any;
  navigation:any;
};
  
const AppointmentDay=({ key,appointments, day, date,navigation}: Props)=>{
    return(
    <View
    style={styles.outerTile}
    >
        <Text style={styles.date}>{day}, {date}</Text>
        <View style={styles.line}></View>
        {
            appointments.length==0?
            <Text style={styles.emptyAppointments}>Nothing planned yet</Text>:
            appointments.map((appointment,index)=>(<AppointmentTile key={index} appointment={appointment} navigation={navigation}/>))
        }
    </View>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'column',
        backgroundColor:'#FFFFFF',
        //alignItems:'center',
        width:'100%',
        paddingLeft:5,
        gap:2,
        minHeight:150,
    },
    line:{
        width:"98%",
        height:2,
        backgroundColor:'#000959',
        alignSelf:'center'
    },
    emptyAppointments:{
        textAlign:'center',
        fontStyle: 'italic',
        color: '#999',
    },
    date:{
        fontSize: 18,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 5,
        color: '#000959',
    }

   
    

});

export default AppointmentDay;