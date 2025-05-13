import React,{useState} from 'react';
//menu
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';


type Props={
    navigation:any;
}
  
const NavBar=({navigation}:Props)=>{
    const [MenuOpen,setMenuOpen]=useState(false);
    const handleMenuClick=()=>{
        setMenuOpen(!MenuOpen);
    };
    
    return(
    <View
    style={styles.outerTile}
    >
        <TouchableOpacity
        style={styles.navOption}
        onPress={()=>{navigation.navigate('Notifications')}}
        >
            <Image
            style={styles.image}
            source={require('../../assets/pictures/notification.png')}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
        style={styles.navOption}
        onPress={()=>{navigation.navigate('Home')}}
        >
            <Image
            style={styles.image}
            source={require('../../assets/pictures/home.png')}
            />
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.navOption}
        onPress={()=>{navigation.navigate('Profile')}}
        >
            <Image
            style={styles.image}
            source={require('../../assets/pictures/profileIcon.png')}
            />
        </TouchableOpacity>
    </View>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'row',
        position:'absolute',
        justifyContent:'space-between',
        //elevation:5,
        //backgroundColor:'transparent',
        backgroundColor:'#EEEEEE',
        left:0,
        bottom:0,
        // borderBottomColor:'black',
        // borderBottomWidth:1,
        width:'100%',
        height:50,
        paddingBottom:20,
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderTopWidth:1,
        borderTopColor:'#000959',

    },
    optionsHolder:{
        flexDirection:'column',
        backgroundColor:'yellow',
        width:'50%',
        height:'100%',
        elevation:20,
    },
    image:{
        height:40,
        width:40,
    },
    navOption: {
        width:'30%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
    },
});

export default NavBar;