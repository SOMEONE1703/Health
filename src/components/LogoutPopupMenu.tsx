import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { BASE_URL } from '@env';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';

type Props = {
  navigation: any;
  cancel: () => void;
  visible: boolean;
};

const LogoutPopupMenu = ({ navigation, cancel, visible }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await sendAPILogout();
      await AsyncStorage.removeItem('Health-Token');
      navigation.navigate("Landing");
    } catch (error) {
      Alert.alert("Logout Error", "Failed to logout properly. Please try again.");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendAPILogout = async () => {
    const token = await AsyncStorage.getItem('Health-Token');
    if (!token) return;

    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Logout failed");
    }

    return await response.json();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={cancel}
    >
      <TouchableOpacity
        style={styles.outerTile}
        activeOpacity={1}
        onPress={cancel}
      >
        <View style={styles.menu}>
          <View style={styles.textHolder}>
            <Text style={styles.titleText}>Are you sure you want to logout?</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.noButton]}
              onPress={cancel}
              disabled={loading}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.yesButton]}
              onPress={handleLogout}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Yes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outerTile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    minHeight: 150,
    justifyContent: 'space-between',
  },
  textHolder: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButton: {
    backgroundColor: '#000959',
  },
  noButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LogoutPopupMenu;