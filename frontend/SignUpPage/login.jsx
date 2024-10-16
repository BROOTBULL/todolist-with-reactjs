import "./signUp.css"
import { useState } from "react";
import Footer from "../HomePage/footer";
import "./signUp.css"
import { authStore } from "../store/auth.store";





export default function LogInPage()
{
  const [userInfo,setUserInfo]=useState({
    email:"",
    password:""
  })
const {login}=authStore()

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
          <div style={{margin:" 5% 9%"}} className="head text">LogIn</div>
          <div className="signUpBox">
            <div className="signup">

              <h1 className="text">LogIn to your Account</h1>

              {/* <button className="Oauths text">
              <i className='bx bxl-google'/>
              </button>
              <button className="Oauths blue text">
              <i className='bx bxl-facebook'/>
              </button> */}

             <div style={{display:"flex",flexDirection:"row"}}>
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
              required
               />

              <input
              className="userInput" 
              type="password"
              value={userInfo.password}
              onChange={(e)=>{ setUserInfo({...userInfo , password:e.currentTarget.value})}}
              name="password"
              placeholder="Password *"
              required
               />

               <button  className="text btn user_submit_btn" onClick={handleUserInput}>Submit</button>

             </form>
      
            </div>
            <div className="signupImage"></div>
          </div>
        <Footer/>
        </>
    )
}