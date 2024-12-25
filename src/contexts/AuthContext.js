import React, { useReducer, createContext, useContext } from 'react'

const AuthContext = createContext()

const initialState = { isAuthenticated: false, user: {} }
const reducer = (state, { type }) => {
    switch (type) {
        case "LOGIN":
            return Object.assign({}, { isAuthenticated: true })
        case "LOGOUT":
            return Object.assign({}, { isAuthenticated: false })
        default:
            return state
    }
}

export default function AuthContextProvider(props) {

    const [state,dispatch] = useReducer(reducer,initialState)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
