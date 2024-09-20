import Homepage from "../HomePage/homepage";
import "./App.css";
import SignUpPage from "../SignUpPage/signUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import { UserContextProvider } from "../Contexts/UserContext";
import { useState } from "react";

function App() {

  const [id,setId]=useState("");
  const [ProjectSelected,setSelectedProject]=useState("");



  return (
    <UserContextProvider value={{id,setId,ProjectSelected,setSelectedProject}}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
