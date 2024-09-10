import { createContext, useContext } from "react";


export const UserContext = createContext({
    isLoggedIn: true,
    setIsLoggedIn:()=>{}
});


export const UserContextProvider = UserContext.Provider;


export default function useUserInfo() {
    return useContext(UserContext);
}
