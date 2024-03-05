import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import api from "../utils/api";

type authContext = {
    isLogin: boolean,
}

const AuthContext = createContext<authContext | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {

    const { data, isError } = useQuery("validateToken", api.validateToken, {
        retry: false
    })

    console.log(data ,isError)

    return(
        <AuthContext.Provider value={{
            isLogin: !isError
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    return context as AuthContext
}