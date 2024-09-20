import { createContext, useContext } from "react";


export const UserContext = createContext({
  id:"",
  setId:()=>{},
  ProjectSelected:"",
  setSelectedProject:()=>{}
});


export const UserContextProvider = UserContext.Provider;


export default function useUserInfo() {
    return useContext(UserContext);
}
