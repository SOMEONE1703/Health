import React,{useState} from 'react';
//menu
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';


type Props={
    navigation: any;
    onClose: () => void;
}
import tempImage from '../../assets/pictures/tempImage.jpg';
import HealthImage from '../../assets/pictures/health-image1.png';
import TransportImage from '../../assets/pictures/transport-image.png';
import RetailImage from '../../assets/pictures/retail-image.png';

let deviceHeight = Dimensions.get('window').height
const SideNavBar=({navigation,onClose}:Props)=>{
    const [MenuOpen,setMenuOpen]=useState(false);
    const handleMenuClick=()=>{
        setMenuOpen(!MenuOpen);
    };

    return(
    <View
    style={styles.outerTile}
    >
        
        <View
        style={styles.optionsHolder}
        >
            <View style={styles.decorator}>
                <Image
                style={styles.decoratorImage}
                source={tempImage}
                />
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} style={styles.container}>
                <View style={styles.textContainer}>
                    <Image source={HealthImage} style={styles.optionsImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.navOption}>Health</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate("Transport")}} style={styles.container}>
                <View style={styles.textContainer}>
                    <Image source={TransportImage} style={styles.optionsImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.navOption}>Transport</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate("Retail")}} style={styles.container}>
                <View style={styles.textContainer}>
                <Image source={RetailImage} style={styles.optionsImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.navOption}>Retail</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View
        style={styles.clickOff}
        onTouchEnd={onClose}
        ></View>
        
    </View>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'row',
        position:'absolute',
        //elevation:5,
        backgroundColor:'transparent',
        //backgroundColor:'red',
        left:0,
        top:0,
        // borderBottomColor:'black',
        // borderBottomWidth:1,
        width:'100%',
        height:deviceHeight,
        zIndex:2,
    },
    optionsHolder:{
        flexDirection:'column',
        backgroundColor:'#EEE',
        borderRightWidth:1,
        borderRightColor:'#000959',
        width:'70%',
        height:'100%',
        gap:2,
    },
    clickOff:{
        flexDirection:'column',
        backgroundColor:'black',
        width:'30%',
        height:'100%',
        opacity:0.2,
    },
    image:{
        height:32,
        width:40,
    },
    navOption: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
    decorator:{
        backgroundColor:'#000959',
        width:'100%',
        height:200,
    },
    decoratorImage:{
        height:'100%',
        width:'100%',
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
    },
    optionsImage:{
        height:32,
        width:40,
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        gap:15,
        height:55,
        width:'100%',
    },
    textContainer:{
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',

    }
});

export default SideNavBar;