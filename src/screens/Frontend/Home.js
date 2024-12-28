import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAuthContext } from '../../contexts/AuthContext'; // Import the AuthContext

export default function Home({ navigation }) {
  const { logout } = useAuthContext(); // Get the logout function from context

  const handlePress = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
  }

  const handleLogout = () => {
    logout(); // Call the logout function from context
    // navigation.navigate('Login'); 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Home <Icon name='home' size={48} color="#333" style={styles.icon} /></Text>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          My Name Is Muhammad Shafay, a Web and Mobile App developer. I created this app in which users can register, login, and logout, and also can add the details of their events. Everyone can see the events and their details.
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light background color
    padding: 16,
  },
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Darker text color
    marginBottom: 16,
  },
  icon: {
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff', // White background for the description
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  descriptionText: {
    fontSize: 16,
    color: '#555', // Darker text color for better readability
    textAlign: 'center',
  },
  logoutButton: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'red', // Red color for logout button
    borderRadius: 4,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});