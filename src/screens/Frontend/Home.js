import React from 'react'
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"

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
    <View style={styles.flexbox}>
      <Text style={styles.h1}>Home<Icon name='home' size={48}  /></Text>
      <Button title='press me' color='blue' onPress={() => { navigation.navigate("About") }} />
      <View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>Add todo <Icon name='plus' /> </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flexbox: {
    justifyContent: 'center',
    alignItems: 'ceenter',
    backgroundColor: 'red',
    flex: 1,

  },
  h1: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  button: {
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: 'black',
    borderRadius: 4,
    // maxWidth: 300,
    textAlign: 'center'
  },
  text: {
    // fontSize:8,
    textAlign: 'center',
    color: 'white'
  }
})