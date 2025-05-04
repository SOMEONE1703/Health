import React,{useState} from 'react';
//menu
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';


type Props={
    title:string;
    onClose: () => void;
}
  
const SideNavBar=({title,onClose}:Props)=>{
    const [MenuOpen,setMenuOpen]=useState(false);
    const handleMenuClick=()=>{
        setMenuOpen(!MenuOpen);
    };
    
    return(
    <View
    style={styles.outerTile}
    >
        <TouchableOpacity
        onPress={()=>{onClose()}}
        >
            <Image
            
            style={styles.image}
            source={require('../../assets/pictures/appbar-icon.png')}
            />
        </TouchableOpacity>
        <View
        style={styles.optionsHolder}
        >
            <Text style={styles.navOption}>Health</Text>
            <Text style={styles.navOption}>Transport</Text>
            <Text style={styles.navOption}>Retail</Text>
        </View>
        
    </View>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'row',
        position:'absolute',
        //elevation:5,
        //backgroundColor:'transparent',
        backgroundColor:'red',
        left:0,
        top:'10%',
        // borderBottomColor:'black',
        // borderBottomWidth:1,
        width:'100%',
        height:500,
    },
    optionsHolder:{
        flexDirection:'column',
        backgroundColor:'yellow',
        width:'50%',
        height:'100%',
        elevation:20
    },
    clickOff:{
        flexDirection:'column',
        backgroundColor:'transparent',
        width:'50%',
        height:'100%',
    },
    image:{
        height:50,
        width:50,
    },
    navOption: {
        color: 'black',
        fontSize: 18,
        marginVertical: 10,
    },
});

export default SideNavBar;