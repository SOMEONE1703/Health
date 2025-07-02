import React, { useEffect,useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import ChatTile from '../components/ChatTile';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  date: string;
  isRead: boolean;
  avatar?: any; // Can be replaced with proper image type
};

const ChatScreen: React.FC<Props> = ({ navigation }) => {
  const handleBackClick = () => {
    navigation.goBack();
  };

  // Using useMemo to prevent unnecessary re-renders
  const [chats, setChats] = React.useState<Chat[]>([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hello there! How are you doing today?",
      time: "12:00 PM",
      date: "12/12/2022",
      isRead: true,
      avatar: require('../../assets/pictures/profileIcon.png')
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Don't forget our meeting tomorrow",
      time: "1:00 PM",
      date: "12/12/2022",
      isRead: false,
      avatar: require('../../assets/pictures/profileIcon.png')
    },
    // Add more unique chats with different IDs
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 3,
      name: `User ${i + 3}`,
      lastMessage: `Sample message ${i + 1}`,
      time: `${i + 2}:00 PM`,
      date: `12/${i + 12}/2022`,
      isRead: i % 2 === 0,
      avatar: require('../../assets/pictures/profileIcon.png')
    }))
  ]);

  useEffect(() => {
    const token = AsyncStorage.getItem("Health-Token");
    const getChats=async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/chats`, {
          headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.log("Error fetching chats:", error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch chats. Please try again later.',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        
      }
    }
    getChats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackClick}
          activeOpacity={0.7}
        >
          <Image
            style={styles.backIcon}
            source={require('../../assets/pictures/back-arrow1.png')}
          />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView 
        style={styles.chatList}
        contentContainerStyle={styles.chatListContent}
        showsVerticalScrollIndicator={false}
      >
        {chats.map((chat) => (
          <ChatTile 
            key={`${chat.id}-${chat.name}`}
            name={chat.name}
            imageSource={chat.avatar}
            lastMessage={chat.lastMessage}
            time={chat.time}
            date={chat.date}
            isRead={chat.isRead}
            navigation={navigation}
            id={chat.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    height: 24,
    width: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000959',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingBottom: 16,
  },
});

export default ChatScreen;