import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Frontend/Home';
import About from '../screens/Frontend/About';
import Footer from '../components/Footer';
import Header from '../components/Header';

const stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Header/>
           <stack.Navigator
           screenOptions={{
            headerTitleAlign:'center',
            // headerTintColor:"blue",
            headerTitleStyle:{fontWeight:'bold',color:'blue'}
           }}
           >
            <stack.Screen name='Home' component={Home}
            options={{
                headerTitle:'My Home'
            }}
            />
            <stack.Screen name='About' component={About}/>
           </stack.Navigator>
           <Footer/>
        </NavigationContainer>
    )
}