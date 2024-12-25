import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';

const initialState = { email: "", password: "" };

export default function Login({ navigation }) {
    const { dispatch } = useAuthContext();
    const [state, setState] = useState(initialState);

    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }));
    };

    const handleLogin = () => {
        const { email, password } = state;
        console.log(email);
        console.log(password);
        dispatch({ type: "LOGIN" });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Login</Text>
            {/* <Text style={styles.h4}>{Platform.OS}</Text>
            <Text style={styles.h4}>{Platform.Version}</Text>
            <Text style={styles.h4}>{Platform.isPad ? "This is a pad" : "Not a pad"}</Text> */}
            <TextInput
                style={styles.formControl}
                placeholder='Enter Your Email'
                placeholderTextColor={'gray'}
                keyboardType='email-address'
                onChangeText={val => handleChange('email', val)}
            />
            <TextInput
                style={styles.formControl}
                placeholder='Enter Your Password'
                placeholderTextColor={'gray'}
                keyboardType='default'
                secureTextEntry
                onChangeText={val => handleChange('password', val)}
            />

            <View style={styles.buttonContainer}>
                <Button title="Login" color='black' onPress={handleLogin} />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.footerText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.footerText}>Register Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#f0f8ff', // Light background color
    },
    h1: {
        fontSize: 40,
        color: "#333", // Darker text color
        fontWeight: 'bold',
        marginBottom: 16,
    },
    h4: {
        color: "#555", // Slightly lighter text color
        fontWeight: 'bold',
        marginBottom: 4,
    },
    formControl: {
        borderWidth: 1,
        borderColor: "#ccc", // Light border color
        borderRadius: 4,
        marginBottom: 10,
        width: "100%",
        color: "#333",
        padding: 10,
        backgroundColor: '#fff', // White background for input
    },
    buttonContainer: {
        width: "100%",
        marginTop: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    footerText: {
        color: '#007BFF', // Blue color for links
        fontWeight: 'bold',
    },
});