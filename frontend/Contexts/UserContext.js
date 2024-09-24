import { createContext, useContext } from "react";



export const UserContext = createContext({
  userId:"",
  setUserId:()=>{},
  ProjectSelected:"",
  setSelectedProject:()=>{},
  signUp:()=>{}
});




export default function useUserInfo() {
    return useContext(UserContext);
}
