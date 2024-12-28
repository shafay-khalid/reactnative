import React, { useReducer, createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: {} };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return { ...state, isAuthenticated: true, user: payload }; // Store user data
        case "LOGOUT":
            return { isAuthenticated: false, user: {} };
        default:
            return state;
    }
};

export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // Fetch user data using the token
                const user = await fetchUserData(token);
                dispatch({ type: "LOGIN", payload: user });
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post("http://192.168.100.23:5028/login", { email, password });
        if (response.data.status === "ok") {
            await AsyncStorage.setItem('token', response.data.data);
            const user = await fetchUserData(response.data.data);
            dispatch({ type: "LOGIN", payload: user });
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: "LOGOUT" });
    };

    const fetchUserData = async (token) => {
        const response = await axios.post("http://192.168.100.23:5028/userdata", { token });
        return response.data.data; // Assuming this returns user data
    };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}