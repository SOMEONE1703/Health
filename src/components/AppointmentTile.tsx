import React,{useState} from 'react';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

type Props = {
  appointment:any;
};
  
const AppointmentTile=({ appointment}: Props)=>{
    const handleClick=()=>{
        console.log("clicked")

    }
    return(
    <View
    style={styles.outerTile}
    
    >
        
    </View>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'column',
        elevation:5,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        width:'95%',
    },
    image:{
        borderRadius:10,
        width:'100%',
        height:200,
    },
    shortDescription:{
        fontSize:15,
        color:'#000959',

    },
    titleStyle:{
        fontWeight:'bold',
        color:'#000959',
        fontSize:22,

    },
    description:{
        gap:5,

    },
    shortDescriptionView:{
        minHeight:70,
        width:'95%',
        alignSelf:'center'
    },
    titleView:{
        width:'95%',
        alignSelf:'center',
    }

});

export default AppointmentTile;