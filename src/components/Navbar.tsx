import React,{useState} from 'react';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { appointment } from '../types/appointment';

type Props={
    title:string;
}
  
const NavBar=({title}:Props)=>{
    const [MenuOpen,setMenuOpen]=useState(false);
    const handleMenuClick=()=>{
        setMenuOpen(!MenuOpen);
    };
    
    return(
    <View
    style={styles.outerTile}
    >
        
    </View>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'row',
        //elevation:5,
        backgroundColor:'#FFFFFF',
        // borderBottomColor:'black',
        // borderBottomWidth:1,
        width:'98%',
        minHeight:80,
        elevation:5,
    },
    approved:{
        height:10,
        width:10,
        borderRadius:'50%',
        backgroundColor:'green'
    },
    pending:{
        height:10,
        width:10,
        borderRadius:'50%',
        backgroundColor:'orange'
    },
    declined:{
        height:10,
        width:10,
        borderRadius:'50%',
        backgroundColor:'red'
    },
    statusHolder:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        //height:'100%',
        width:'5%',

    },
    info:{
        justifyContent:'center',
        width:'70%',
        paddingLeft:10,
        gap:5
    },
    institution:{
        color:'808080',
        fontSize:13,
        fontWeight:500,
    },
    doctor:{
        color:'#000959',
        fontSize:20,
        fontWeight:700,
    },
    time:{
        color:'808080',
        fontSize:16,
        fontWeight:700,
    },
    timeContainer:{
        width:'25%',
        flexDirection:'column',
        justifyContent:'center',
    }
});

export default NavBar;