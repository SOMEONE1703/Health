import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SentMessageTile from '../components/Messaging/SentMessageTile';
import ReceivedMessageTile from '../components/Messaging/ReceivedMessageTile';
import { useSocket } from '../Contexts/SocketContext';
import { useAuth } from '../Contexts/AuthContext';
import { receiveMessageHandler,sendMessage,readMessage } from '../Services/SocketConnection';
import { BASE_URL } from '@env';


type ChatScreenRouteProp = RouteProp<RootStackParamList, 'chat'>;
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: ChatScreenRouteProp;
};

type message = {
  message: string;
  sender: string;
  receiver: string;
  time: string;
  date: string;
  isRead: boolean;
  isSent: boolean;
  isReceived: boolean;
};

const Chat: React.FC<Props> = ({ navigation, route }) => {
    const { id, name } = route.params;
    const [typedMessage, setTypedMessage] = useState("");
    const [history, setHistory] = useState<message[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    const { socket } = useSocket();
    const { userId,username } = useAuth();
    //console.log("Socket in Chat:", socket);
    // socket listeners
    const handleReceiveMessage = (message: any) => {
      console.log("Received message in Chat:", message);
      setHistory(prevHistory => [...prevHistory, message]);
      // Optionally, save the received message to AsyncStorage
      AsyncStorage.getItem(`chatHistory:${id}`)
        .then(storedHistory => {
          const updatedHistory = storedHistory ? JSON.parse(storedHistory) : [];
          updatedHistory.push(message);
          return AsyncStorage.setItem(`chatHistory:${id}`, JSON.stringify(updatedHistory));
        })
        .catch(error => console.error("Error saving received message:", error));
    }
    receiveMessageHandler(socket, handleReceiveMessage);

    const handleReadMessage = (messageId: string) => {
      console.log("Reading message with ID:", messageId);
      readMessage(socket, messageId);
      setHistory(prevHistory => 
        prevHistory.map(msg => 
          msg.message === messageId ? { ...msg, isRead: true } : msg
        )
      );
      // Optionally, update the message in AsyncStorage
      AsyncStorage.getItem(`chatHistory:${id}`)
        .then(storedHistory => {
          if (storedHistory) {
            const updatedHistory = JSON.parse(storedHistory).map(msg => 
              msg.message === messageId ? { ...msg, isRead: true } : msg
            );
            return AsyncStorage.setItem(`chatHistory:${id}`, JSON.stringify(updatedHistory));
          }
        })
        .catch(error => console.error("Error updating read status:", error));
    }
    
    const handleSendMessage = (message: string) => {
      if (message.trim() === "") return;
      console.log("Sending message:", message);
      const newMessage: message = {
        message,
        sender: String(userId),
        receiver: String(id), // Assuming the receiver is the chat name
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        isRead: false,
        isSent: true,
        isReceived: false
      };

      setHistory(prevHistory => [...prevHistory, newMessage]);
      setTypedMessage("");

      // Send message via socket
      sendMessage(socket, newMessage);
      
      // Save to AsyncStorage
      AsyncStorage.getItem(`chatHistory:${id}`)
        .then(storedHistory => {
          const updatedHistory = storedHistory ? JSON.parse(storedHistory) : [];
          updatedHistory.push(newMessage);
          return AsyncStorage.setItem(`chatHistory:${id}`, JSON.stringify(updatedHistory));
        })
        .catch(error => console.error("Error saving message:", error));
    }

    useEffect(() => {
      // Load initial messages
      setHistory([
        {
          message: "Hello",
          sender: "John Doe",
          receiver: "Jane Smith",
          time: "12:00 PM",
          date: "12/12/2022",
          isRead: true,
          isSent: true,
          isReceived: false
        },
        {
          message: "Hi",
          sender: "Jane Smith",
          receiver: "John Doe",
          time: "12:01 PM",
          date: "12/12/2022",
          isRead: true,
          isSent: false,
          isReceived: true
        },
        {
          message: "How are you doing?",
          sender: "John Doe",
          receiver: "Jane Smith",
          time: "12:03 PM",
          date: "12/12/2022",
          isRead: false,
          isSent: true,
          isReceived: false
        },
        {
          message: "I'm good, how about you?",
          sender: "Jane Smith",
          receiver: "John Doe",
          time: "12:04 PM",
          date: "12/12/2022",
          isRead: false,
          isSent: false,
          isReceived: true
        }
      ]);

      const getChatHistory = async () => {
        try {
          const storedHistory = await AsyncStorage.getItem(`chatHistory:${id}`);
          if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
          }
        } catch (error) {
          console.error("Error loading chat history:", error);
        }
      };

      const getNewMessages = async () => {
        // This function can be used to fetch new messages from the server if needed
        console.log("Fetching stored token...");
        const token=await AsyncStorage.getItem("Health-Token");
        console.log("Token fetched:", token);
        if (!token) {
          console.error("No token found, cannot fetch new messages");
          return;
        }
        console.log("Fetching new messages...");
        try{
          const response = await fetch(`${BASE_URL}/api/chats/${userId}/${id}`, {
            method: "GET",
            headers: {
              "Authorization":`Bearer ${token}`,
            },
          });
          if (!response.ok) {
            console.log(response);
            console.error("Failed to fetch new messages:", response.statusText);
            return;
          }
          const data = await response.json();
          console.log("New messages fetched:", data);
          // Assuming data is an array of messages add to history
          setHistory(prevHistory => [...prevHistory, ...data]);
          // Save new messages to AsyncStorage
          AsyncStorage.getItem(`chatHistory:${id}`)
            .then(storedHistory => {
              const updatedHistory = storedHistory ? JSON.parse(storedHistory) : [];
              updatedHistory.push(...data);
              return AsyncStorage.setItem(`chatHistory:${id}`, JSON.stringify(updatedHistory));
            })
            .catch(error => console.error("Error saving new messages:", error));
          
        }
        catch(error){
          console.error("Error fetching new messages:", error);
        }
      }
      getChatHistory();
      getNewMessages();
    }, [id]);

    useEffect(() => {
      // Scroll to bottom when messages change
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, [history]);

    const handleBackClick = () => {
      navigation.goBack();
    };

    const handleSendClick = () => {
      // if (typedMessage.trim() === "") return;
      
      // const newMessage: message = {
      //   message: typedMessage,
      //   sender: me,
      //   time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      //   date: new Date().toLocaleDateString(),
      //   isRead: false,
      //   isSent: true,
      //   isReceived: false
      // };

      // setHistory([...history, newMessage]);
      // setTypedMessage("");

      // // Save to AsyncStorage
      // AsyncStorage.setItem(`chatHistory:${id}`, JSON.stringify([...history, newMessage]))
      //   .catch(error => console.error("Error saving message:", error));
      handleSendMessage(typedMessage);
    };

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Header */}
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
            
            <Text style={styles.headerTitle}>{name}</Text>
            <View style={styles.headerRightPlaceholder} />
          </View>

          {/* Chat History */}
          <ScrollView 
            ref={scrollViewRef}
            style={styles.chatContainer}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {history.map((message, index) => (
              message.sender === userId ? (
                <SentMessageTile
                  key={`${index}-${message.time}`}
                  message={message.message}
                  time={message.time}
                  isRead={message.isRead}
                />
              ) : (
                <ReceivedMessageTile
                  key={`${index}-${message.time}`}
                  message={message.message}
                  time={message.time}
                  isRead={message.isRead}
                />
              )
            ))}
          </ScrollView>

          {/* Input Box */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              value={typedMessage}
              onChangeText={setTypedMessage}
              multiline
              onSubmitEditing={handleSendClick}
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendClick}
              disabled={typedMessage.trim() === ""}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
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
    tintColor: '#000959',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000959',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContent: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 12,
    // paddingLeft:5,
    padding:12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000959',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#000959',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    opacity: 1,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Chat;