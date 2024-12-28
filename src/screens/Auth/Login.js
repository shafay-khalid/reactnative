import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const initialState = {email: "", password: "" };

export default function Login({ navigation }) {
    // const { dispatch } = useAuthContext();
    const {login} = useAuthContext();
    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (name, val) => {
        if (val === null || val === undefined) {
            val = ""; // Default to an empty string if val is null or undefined
        }
        setState(s => ({ ...s, [name]: val }));
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
    };

    const validate = () => {
        const { email, password } = state;
        let valid = true;
        let newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            valid = false;
            newErrors.email = "Your email is incorrect";
        }

        if (password.length < 6) {
            valid = false;
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = () => {
        if (validate()) {
            const { email, password } = state;
            const userData = { email, password };
    
            axios.post("http://192.168.100.23:5028/login", userData)
                .then(res => {
                    if (res.data.status === "ok") {
                        login(email, password); // Call the login function from context
                        Alert.alert("Login Successfully");
                    } else {
                        Alert.alert(JSON.stringify(res.data));
                    }
                }).catch(e => console.log(e));
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Login</Text>
            <TextInput
                style={styles.formControl}
                placeholder='Enter Your Email'
                placeholderTextColor={'gray'}
                keyboardType='email-address'
                onChangeText={val => handleChange('email', val)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder='Enter Your Password'
                    placeholderTextColor={'gray'}
                    secureTextEntry={!passwordVisible}
                    onChangeText={val => handleChange('password', val)}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconContainer}>
                    <Icon name={passwordVisible ? "eye-slash" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.buttonContainer}>
                <Button title="Login" color='black' onPress={handleLogin} />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity >
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc", // Light border color
        borderRadius: 4,
        backgroundColor: '#fff', // White background for input
    },
    passwordInput: {
        flex: 1,
        color: "#333",
        padding: 10,
    },
    iconContainer: {
        padding: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
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