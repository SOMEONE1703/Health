import React, { useEffect, useState } from 'react';
import { View,Image, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,Keyboard  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { TextInput } from 'react-native-gesture-handler';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AppBar from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import NotificationTile from '../../components/NotificationTile';
import { notification } from '../../types/notification';
//import { Image } from 'react-native-reanimated/lib/typescript/Animated';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};
// const response=await fetch(`${BASE_URL}/api/appointments`);
const Notifications : React.FC<Props> = ({navigation}) =>{
  const [Notifications, setNotifications] = useState<notification[]>([]);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: 'New Appointment',
        description: 'You have a new appointment scheduled for tomorrow at 10 AM.',
      },
      {
        id: 2,
        title: 'Health Tips',
        description: 'Remember to drink plenty of water and stay active!',
      },
    ]);
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('Health-Token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await fetch(`${BASE_URL}/api/notifications/unread`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched notifications:', data);
        //append to notifications
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...data.data.map((notification: notification) => ({
            id: notification.id,
            title: notification.title,
            description: notification.description,
          })),
        ]);
        
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);
  

  return (
    <>
    <View style={styles.page}>
        <AppBar navigation={navigation} title='Notifications'></AppBar>     

        {Notifications.length > 0 ? (
          Notifications.map((notification) => (
            <NotificationTile
              key={notification.id}
              title={notification.title}
              description={notification.description}
            />
          ))
        ) : (
          <Text
            style={styles.mainTitle}
          >No new Notifications!</Text>)
        }
            
    </View>
    <NavBar navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  page:{
    flex:1,
    paddingTop:20,

    alignItems:'center',
    gap: 5
  },
  mainTitle:{
    fontSize:30,
    color:'#000959',
    fontWeight:700,
    textAlign:'center',
  },
  
  
});


export default Notifications;