import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Profile() {
    const { user,logout } = useAuthContext(); // Get user data from context
    const handleLogout = () => {
        logout(); // Call the logout function from context
        // navigation.navigate('Login'); 
      }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.label}>Name: {user.name}</Text>
            <Text style={styles.label}>Email: {user.email}</Text>
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
        backgroundColor: '#f0f8ff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginVertical: 5,
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