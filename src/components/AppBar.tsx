import React,{useState} from 'react';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import SideNavBar from './SideNavBar';

import unread from '../../assets/pictures/chat-icon-unread.png';
import noUnread from '../../assets/pictures/chat-icon.png';

type Props={
    title:string;
}
  
const AppBar=({title}:Props)=>{
    const [MenuOpen,setMenuOpen]=useState(false);
    const [UnreadMessages,setUnreadMessages]=useState(false);
    const handleMenuClick=()=>{
        setMenuOpen(!MenuOpen);
    };
    const handleChatClick=()=>{
        console.log("chat clicked");
        setUnreadMessages(!UnreadMessages);
    };
    
    return(
        <View style={{flexDirection:'column', justifyContent:'center', height:50}}>
            <View
            style={styles.outerTile}
            >
                <TouchableOpacity
                style={styles.imageHolder}
                onPress={()=>{handleMenuClick()}}
                >
                    <Image
                    
                    style={styles.image}
                    source={require('../../assets/pictures/appbar-icon.png')}
                    />
                </TouchableOpacity>
                <View style={styles.titleHolder}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity 
                onPress={()=>{handleChatClick()}}
                style={styles.chatHolder}>
                    <Image
                    style={styles.image}
                    source={UnreadMessages?unread:noUnread}
                    />
                </TouchableOpacity>
                {MenuOpen&&<SideNavBar title={`${title}`} onClose={handleMenuClick}/>}
            </View>   
        </View> 
    );
}

const styles = StyleSheet.create({
    outerTile:{
        flexDirection: 'row',
        //elevation:5,
        backgroundColor:'#000959',
        // borderBottomColor:'black',
        // borderBottomWidth:1,
        width:'100%',
        height:50,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        //elevation:5,
    },
    imageHolder:{
        height:'100%',
        width:'12%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',        
    },
    image:{
        height:32,
        width:40,
    },
    title:{
        color:'#FFFFFF',
        fontSize:30,
    },
    titleHolder:{
        width:'76%',
        // height:'60%',
        flexDirection:'column',
        justifyContent:'center',
        //alignItems:'center',
        paddingLeft:5,
    },
    chatHolder:{
        height:'100%',
        width:'12%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
    }

    
});

export default AppBar;