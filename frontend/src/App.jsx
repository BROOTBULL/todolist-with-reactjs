import Homepage from "../HomePage/homepage";
import "./App.css";
import SignUpPage from "../SignUpPage/signUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import LogInPage from "../SignUpPage/login";
import { authStore } from "../store/auth.store";
import { useEffect } from "react";


function App() {
const {isAuthanticated,userId,checkauth}=authStore()

useEffect(()=>{
checkauth()
},[checkauth])

console.log("isAuthanticated",isAuthanticated);
console.log("user",userId);



  return (
 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/LogInPage" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
