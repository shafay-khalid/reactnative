import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Frontend/Home';
import About from '../screens/Frontend/About';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import Login from '../screens/Auth/Login';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator>
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
                    tabBarBadge:4
                }} 
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {

    const isAuthenticated = false
    return (
        <NavigationContainer>
            {/* <MyTabs /> */}
            <Header />
            <stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: 'blue' }
                }}
                initialRouteName='Login'
            >
                <stack.Screen name='Home' component={Home}
                    options={{
                        headerTitle: 'My Home'
                    }}
                />
                <stack.Screen name='About' component={About} />
                <stack.Screen name='login' component={Login} />
            </stack.Navigator>
            <Footer />
        </NavigationContainer>
    );
}