import Homepage from "../HomePage/homepage";
import "./App.css";
import SignUpPage from "../SignUpPage/signUp";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
