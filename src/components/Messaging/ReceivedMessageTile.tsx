import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

type Props = {
  message: string;
  time: string;
  isRead: boolean;
};

const ReceivedMessageTile = ({ time, message, isRead }: Props) => {
  return (
    <View style={styles.outerTile}>
      <View style={styles.messageHolder}>
        <View style={styles.contentContainer}>
          <Text style={styles.messageStyle}>{message}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.timeStyle}>{time}</Text>
            {isRead && (
              <Text style={styles.readStatus}>✓</Text>
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
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 60,
    marginBottom: 4,
  },
  messageHolder: {
    flexDirection: 'column',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    maxWidth: '70%',
    minWidth: 100,
    borderTopLeftRadius: 2,
  },
  contentContainer: {
    padding: 10,
    width: '95%',
    alignSelf: 'center',
  },
  messageStyle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'android' ? '500' : '400',
    color: '#000959',
    marginBottom: 4,
  },
  timeStyle: {
    fontSize: 10,
    color: 'rgba(0, 9, 89, 0.6)',
    alignSelf: 'flex-start',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  readStatus: {
    fontSize: 10,
    color: '#888',
    marginLeft: 4,
  },
});

export default ReceivedMessageTile;