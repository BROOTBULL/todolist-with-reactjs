import { useState } from "react";
import Footer from "../HomePage/footer";
import "./signUp.css"
import { authStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";




export default function SignUpPage()
{
  const [userInfo,setUserInfo]=useState({
    username:"",
    email:"",
    password:""
  })

  const navigate=useNavigate();
  const {signUp}=authStore()

 async function handleUserInput(e)
 {
  e.preventDefault();

  signUp(userInfo)

  setUserInfo({
    username:"",
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
          <div className="head_pagename text">SignUp</div>
          <div className="signUpBox">
            <div className="signup">

              <div className="head_info text">Create new account</div>

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
              name="username"
              onChange={(e)=>{ setUserInfo({...userInfo , username:e.currentTarget.value})}}
              value={userInfo.username}
              placeholder="Username *"
              autoComplete="off"
              required
               />

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
              placeholder="Password *"
              autoComplete="off"
              required
               />

               <button  className="text btn user_submit_btn" onClick={handleUserInput}>Submit</button>
               <div style={{fontSize:"12px",color:"rgba(131, 141, 195, 0.6)"}} className="text">Already Signed up ? <span onClick={()=>navigate("/Login")} style={{textDecoration:"underline",cursor:"pointer"}}> Go to Login page</span></div>
             </form>
      
            </div>
            <div className="signupImage"/>
          </div>
        <Footer/>
        </>
    )
}