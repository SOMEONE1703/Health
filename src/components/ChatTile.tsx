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
  name:string;
  lastMessage:string;
  time:string;
  date:string;
  isRead:boolean;
  navigation: any;
  id:number
};
  
const ChatTile=({imageSource,navigation,name,lastMessage,isRead,id}: Props)=>{
    const handleClick=()=>{
        //console.log("clicked");
        navigation.navigate("Chat",{name:name,avatar:imageSource,id:id});

    }
    return(
    <TouchableOpacity
    onPress={()=>{handleClick()}}
    style={styles.outerTile}
    >
        <View>
            <Image
                style={styles.image}
                source={imageSource}
            />
        </View>
        <View style={styles.messageDetails}>
            <View style={styles.senderHolder}>
                <Text style={styles.senderName}>{name}</Text>
            </View>
            <View style={styles.senderMessage}>
                <Text style={styles.lastmessage}>{lastMessage}</Text>
            </View>
        </View>
        <View style={styles.messageInfo}>
            <View style={styles.readStatusHolder}>
                {!isRead&&<View style={styles.readStatus}/>}
            </View>
            {/* <View style={styles.timeHolder}>
                <Text style = {styles.time}>{date}</Text>
            </View> */}
        </View>
    </TouchableOpacity>    
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'row',
        //elevation:5,
        backgroundColor:'#FFFFFF',
        alignSelf:'center',
        height:50,
        //borderRadius:10,
        borderBottomWidth:1,
        borderBottomColor:'#DDD',
        width:'98%',
    },
    image:{
        borderRadius:10,
        width:'100%',
        height:50,
    },
    messageDetails:{
        flexDirection:'column',
        justifyContent:'center',
        width:'80%',
        height:50,
    },
    senderHolder:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        height:20,
    },
    senderName:{
        fontSize:15,
        fontWeight:'bold',
        color:'#000959',
    },
    senderMessage:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        height:20,
    },
    lastmessage:{
        fontSize:12,
        color:'#000959',
    },
    messageInfo:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'20%',
        height:'100%',
    },
    readStatusHolder:{
        flexDirection:'column',
        justifyContent:'center',
        height:'100%',
        width:20,
    },
    readStatus:{
        backgroundColor:'#000959',
        width:10,
        height:10,
        borderRadius:5,
    },
    timeHolder:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        height:20,
    },
    time:{
        fontSize:12,
        color:'#000959',
    },
    date:{
        fontSize:12,
        color:'#000959',
    },

});

export default ChatTile;