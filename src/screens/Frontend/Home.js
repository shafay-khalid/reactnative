import React from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Home({ navigation }) {

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

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Home</Text>
      <Icon name='home' size={48} color="#333" style={styles.icon} />
      <View style={styles.buttonContainer}>
        <Button title='Press Me' color='#007BFF' onPress={() => { navigation.navigate("About") }} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handlePress}>
        <Text style={styles.addButtonText}>Add Todo <Icon name='plus' size={16} /></Text>
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
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  addButton: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'black',
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});