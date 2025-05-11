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
  imageSource: any;
  page: string;
  navigation: any;
  title: any;
  paragraph: any;
};
  
const HomeScreenTile=({ imageSource, page, navigation, title, paragraph}: Props)=>{
    const handleClick=()=>{
        //console.log("clicked");
        navigation.navigate(page);

    }
    return(
    <TouchableOpacity
    onPress={()=>{handleClick()}}
    style={styles.outerTile}
    >
        <Image
            style={styles.image}
            source={imageSource}
        />
        <View style={styles.description}>
            <View style={styles.titleView}>
            <Text style = {styles.titleStyle}>{title}</Text>
            </View>
            <View style={styles.shortDescriptionView}>
            <Text style = {styles.shortDescription}>{paragraph}</Text>
            <View style={{height:2}}></View>
            <TouchableOpacity style={{height:20}}
            onPress={ ()=>{handleClick()}}
            ><Text
            >Read more</Text></TouchableOpacity>
            </View>
            
        </View>
    </TouchableOpacity>    
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

export default HomeScreenTile;