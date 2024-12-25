import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import React from 'react'

export default function About({navigation}) {
    // const {name,id,age} = route.params
    // console.log(name,id,age)
    return (
        <View style={styles.flexbox}>
            <Text style={styles.h1}>About</Text>
            <View>
                <Button title='press me' color='blue'  onPress={()=>{navigation.navigate("Home") }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexbox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,

    },
    h1: {
        fontSize: 48,
        fontWeight: 'bold',
        // textAlign:'center',
        color: 'black'
    }
})