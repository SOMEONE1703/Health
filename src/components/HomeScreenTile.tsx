import React,{useState} from 'react';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
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
        navigation.navigate(page);

    }
    return(
    <TouchableOpacity
    style={styles.outerTile}
    onPress={ ()=>{handleClick()}}
    >
        <Image
            style={styles.image}
            source={imageSource}
        />
        <View>
            <Text style = {styles.titleStyle}>{title}</Text>
            <Text style = {styles.shortDescription}>{paragraph}</Text>
        </View>
    </TouchableOpacity>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'column',

        backgroundColor:'transparent',
        width:'90%',
    },
    image:{
        borderRadius:10,
        width:'100%',
        height:200,
    },
    shortDescription:{
        fontSize:10,
        color:'blue',

    },
    titleStyle:{
        fontWeight:'bold',
        color:'blue',
        fontSize:15,

    }

});

export default HomeScreenTile;