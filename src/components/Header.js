import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        paddingVertical: 12
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontWeight:'bold'
    }
})