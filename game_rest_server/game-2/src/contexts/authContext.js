import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {})

    const userLogin = (authData) => {
        setAuth(authData)
    }
    const userLogout = () => {
        setAuth({})
    }
    
    return (
    <AuthContext.Provider value={{auth, userLogin, userLogout}}>
        {children}
    </AuthContext.Provider>
    )

}