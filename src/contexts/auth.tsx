import { Dispatch, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import api from "../utils/api";

type authContext = {
    isLogin: boolean,
    setUserData: Dispatch<React.SetStateAction<string[]>>,
    userData: string[],
    setCurrentChat: Dispatch<React.SetStateAction<string[]>>,
    currentChat: object | undefined,
    loading: boolean,
    setLoading: Dispatch<React.SetStateAction<boolean>>,
}

const AuthContext = createContext<authContext | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userData, setUserData] = useState<string[]>([])
    const [currentChat, setCurrentChat] = useState<object>();
    const [loading, setLoading] = useState<boolean>(false)
    const { data, isError } = useQuery("validateToken", api.validateToken, {
        retry: false
    })
    
    if(data && userData.length == 0) {
        setUserData(data)
    }

    return(
        <AuthContext.Provider value={{
            isLogin: !isError,
            setUserData,
            userData,
            setCurrentChat,
            currentChat,
            setLoading,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    return context as AuthContext
}