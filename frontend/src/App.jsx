import { useState } from "react";
import useUserInfo, { UserContextProvider } from "../Contexts/UserContext";
import Homepage from "../HomePage/homepage";
import "./App.css";
// import SignUpPage from "../SignUpPage/signUp";
import Home from "./home"

function App() {

const [isLoggedIn,setIsLoggedIn]=useState(useUserInfo().isLoggedIn);
console.log(isLoggedIn);

  return (
    <UserContextProvider value={{isLoggedIn,setIsLoggedIn}}>
      {isLoggedIn? <Homepage />: <Home/>}
    </UserContextProvider>
  );
}

export default App;
