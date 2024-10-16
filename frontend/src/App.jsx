import Homepage from "../HomePage/homepage";
import "./App.css";
import SignUpPage from "../SignUpPage/signUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import LogInPage from "../SignUpPage/login";
import { authStore } from "../store/auth.store";
import { useEffect, useState } from "react";

const AutheticatedUser=({children})=>{
  const {isAuthanticated,userId}=authStore()

  if(isAuthanticated&&userId)
  {
    return children; 
  }
  return <Navigate to="/SignUp" replace/>
}

const RedirectAutheticatedUser=({children})=>{
  const {isAuthanticated,userId}=authStore()

  if(isAuthanticated&&userId)
  {
    return <Navigate to="/Home" replace/>
  }
  return children;
}



function App() {
const {checkauth}=authStore()

const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkAuthAsync = async () => {
    try {
      await checkauth();  // Call your checkauth function
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setLoading(false); // Set loading to false after checkauth completes
    }
  };

  checkAuthAsync();
}, []);

if (loading) {
  return <div>Loading...</div>; // Display loading message or spinner
}


// console.log("isAuthanticated",isAuthanticated);
// console.log("user",userId);



  return (
 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/SignUp" element={
            <RedirectAutheticatedUser>
              <SignUpPage />
            </RedirectAutheticatedUser>
          } />
          <Route path="/Home" element={ <AutheticatedUser>
              <Home />
            </AutheticatedUser>} />
          <Route path="/LogInPage" element={   
            <RedirectAutheticatedUser>
              <LogInPage />
            </RedirectAutheticatedUser>} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
