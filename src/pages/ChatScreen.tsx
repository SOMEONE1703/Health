import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';


type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
const ChatScreen : React.FC<Props> = ({navigation}) =>{
    const handleBackClick = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.page}>
        
            <View style={{flexDirection:'column', justifyContent:'center', height:50}}>
                <View
                style={styles.outerTile}
                >
                    <TouchableOpacity
                    style={styles.imageHolder}
                    onPress={()=>{handleBackClick()}}
                    >
                        <Image
                        style={styles.image}
                        source={require('../../assets/pictures/back-arrow1.png')}
                        />
                    </TouchableOpacity>
                    {/* <View style={styles.titleHolder}>
                        <Text style={styles.title}>{title}</Text>
                    </View> */}
                </View>   
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    page:{
        flex:1,
        paddingTop:20
    },
    outerTile:{
        flexDirection: 'row',
        //elevation:5,
        backgroundColor:'white',
        // borderBottomColor:'black',
        // borderBottomWidth:1,
        width:'100%',
        height:50,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        elevation:5,
    },
    image:{
        height:32,
        width:40,
    },
    imageHolder:{
        height:'100%',
        width:'12%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',        
    },
});


export default ChatScreen;