import "./signUp.css"
import { useState } from "react";
import Footer from "../HomePage/footer";
import "./signUp.css"
import { authStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";





export default function LogInPage()
{
  const [userInfo,setUserInfo]=useState({
    email:"",
    password:""
  })
const {login}=authStore()
const navigate=useNavigate();

 async function handleUserInput(e)
 {
  e.preventDefault();
  login(userInfo);

  setUserInfo({
    email:"",
    password:""
  })


 }



    return(
        <>
          <div className="home_heading">
            <div className="head text ">
            <i className="bx bxs-book-alt"></i> TodoList
            </div>
          </div>
          <div className="head_pagename text">LogIn</div>
          <div className="signUpBox">
            <div className="signup">

            <div className="head_info login text">LogIn to your account</div>

            <button className="Oauths google text">
            <i className='bx bxl-google'/>Continue with Google
            </button>
            <button className="Oauths facebook text">
            <i className='bx bxl-facebook'/>Continue with facebook
            </button>

            <div style={{display:"flex",flexDirection:"row",marginTop:"15px"}}>
            <hr style={{borderWidth:"2px",width:"40%"}}/>
            <span style={{color:"rgba(62, 75, 146, 0.278)"}} className="text">OR</span>
            <hr style={{borderWidth:"2px",width:"40%"}}/>
            </div>

             <form className="User_input_box">


              <input
              className="userInput" 
              type="text"
              value={userInfo.email}
              onChange={(e)=>{ setUserInfo({...userInfo , email:e.currentTarget.value})}}
              name="email"
              placeholder="Email *"
              autoComplete="off"
              required
               />

              <input
              className="userInput" 
              type="password"
              value={userInfo.password}
              onChange={(e)=>{ setUserInfo({...userInfo , password:e.currentTarget.value})}}
              name="password"
              autoComplete="off"
              placeholder="Password *"
              required
               />

               <button  className="text btn user_submit_btn" onClick={handleUserInput}>Submit</button>
               <div className="text" style={{fontSize:"12px",color:"rgba(131, 141, 195, 0.6)",textDecoration:"underline",cursor:"pointer"}}>Forgot your password ?</div>
               <hr style={{borderWidth:"1px",width:"100%"}}/>
               <div style={{fontSize:"12px",color:"rgba(131, 141, 195, 0.6)"}} className="text">Dont have an account ? <span onClick={()=>navigate("/SignUp")} style={{textDecoration:"underline",cursor:"pointer"}}>SignUp</span></div>
             </form>
      
            </div>
            <div className="signupImage"></div>
          </div>
        <Footer/>
        </>
    )
}