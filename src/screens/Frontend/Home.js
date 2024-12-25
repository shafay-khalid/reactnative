import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import React from 'react'

export default function Home({navigation,route}) {
  return (
    <View style={styles.flexbox}>
      <Text style={styles.h1}>Home</Text>
      <Button title='press me' color='blue'  onPress={()=>{navigation.navigate("About",{name:'shafay',id:'unique',age:'18'}) }} />
    </View>
  )
}

const styles = StyleSheet.create({
  flexbox:{
    justifyContent:'center',
    alignItems:'ceenter',    
    backgroundColor:'red',
    flex:1,
    
  },
  h1:{
    fontSize:48,
    fontWeight:'bold',
    textAlign:'center',
    color:'black'
  }
})