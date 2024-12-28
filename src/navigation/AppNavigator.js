import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator ,DrawerContentScrollView,DrawerItem,DrawerItemList} from '@react-navigation/drawer';
import Home from '../screens/Frontend/Home';
import About from '../screens/Frontend/About';
import Footer from '../components/Footer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import Login from '../screens/Auth/Login';
import { useAuthContext } from '../contexts/AuthContext';
import Register from '../screens/Auth/Register';
import Profile from '../screens/Frontend/Profile';
import AddItems from '../screens/Dashboard/AddItems';
import Catalogs from '../screens/Frontend/Catalogs';
import Events from '../screens/Dashboard/Events';
import AddEvent from '../screens/Dashboard/AddEvent';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
                name='Catalogs'
                component={Catalogs}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name='database' color={color} size={size} />;
                    },
                    tabBarBadge: 4
                }}
            />
             <Tab.Screen
                name='Add Items'
                component={AddItems}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name='plus' color={color} size={size} />;
                    },
                    // tabBarBadge: 4
                }}
            />
             <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name='user-circle' color={color} size={size} />;
                    },
                    // tabBarBadge: 4
                }}
            />
        </Tab.Navigator>
    );
}

const MyDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                // drawerPosition:"left"
                drawerType:"back"
            }}
        >
            <Drawer.Screen 
                name='Home' 
                component={Home}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name='home' color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen 
                name='About' 
                component={About}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name='info-circle' color={color} size={size} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props) => {
    const handleLogout = () => {
        Alert.alert(
            "Log Out Function",
            "Log Out Is Working"
        );
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Log Out"
                onPress={handleLogout}
                labelStyle={{ color: 'red' }} // Change the text color to red
            />
        </DrawerContentScrollView>
    );
}

export default function AppNavigator() {
    const { isAuthenticated } = useAuthContext();
    console.log(isAuthenticated);

    return (
        <NavigationContainer>
            {/* <MyDrawer/> */}
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