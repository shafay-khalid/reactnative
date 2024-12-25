import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Frontend/Home';
import About from '../screens/Frontend/About';
import Footer from '../components/Footer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import Login from '../screens/Auth/Login';
import { useAuthContext } from '../contexts/AuthContext';
import Register from '../screens/Auth/Register';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name='home' color={color} size={size} />;
                    }
                }}
            />
            <Tab.Screen
                name='About'
                component={About}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name='info-circle' color={color} size={size} />;
                    },
                    tabBarBadge: 4
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { isAuthenticated } = useAuthContext();
    console.log(isAuthenticated);

    return (
        <NavigationContainer>
            <stack.Navigator
                screenOptions={{
                    headerShown: false, // Remove the header from the stack navigator
                }}
            >
                {isAuthenticated ? (
                    <stack.Group>
                        <stack.Screen name='Root' component={MyTabs} />
                        <stack.Screen name='About' component={About} />
                    </stack.Group>
                ) : (
                    <stack.Group>
                        <stack.Screen name='Login' component={Login} />
                        <stack.Screen name='Register' component={Register} />
                    </stack.Group>
                )}
            </stack.Navigator>
            {/* <Footer /> */}
        </NavigationContainer>
    );
}