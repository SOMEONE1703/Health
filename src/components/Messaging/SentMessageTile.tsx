import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';

type Props = {
  message:string;
  time:string;
  isRead:boolean;
};
  
const SentMessageTile = ({ time, message, isRead }: Props) => {
    return (
      <View style={styles.outerTile}>
        <View style={styles.messageHolder}>
          <View style={styles.contentContainer}>
            <Text style={styles.messageStyle}>{message}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.timeStyle}>{time}</Text>
              {isRead && (
                <Text style={styles.readStatus}>✓✓</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    outerTile: {
      padding: 10,
      flexDirection: "row",
      justifyContent: 'flex-end',
      width: '100%',
      minHeight: 60,
      marginBottom: 4, // Add some spacing between messages
    },
    messageHolder: {
      flexDirection: 'column',
      backgroundColor: '#000959',
      borderWidth: 2,
      borderColor: '#000959',
      borderRadius: 10,
      maxWidth: '70%',
      minWidth: 100,
    },
    contentContainer: {
      padding: 8,
    },
    messageStyle: {
      fontSize: 16,
      fontWeight: Platform.OS === 'android' ? '500' : '600',
      color: 'white',
      marginBottom: 4,
    },
    timeStyle: {
      fontSize: 10,
      color: 'rgba(255, 255, 255, 0.7)',
      alignSelf: 'flex-end',
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 4,
    },
    readStatus: {
      fontSize: 10,
      color: '#4FC3F7', // Light blue color for read receipts
    },
  });
  
  export default SentMessageTile;