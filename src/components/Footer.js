import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>Footer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'white',
        paddingVertical: 10
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontWeight:'bold'
    }
})