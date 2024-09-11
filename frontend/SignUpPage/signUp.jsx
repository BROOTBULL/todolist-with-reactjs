import Footer from "../HomePage/footer";
import "./signUp.css"
export default function SignUpPage()
{
    return(
        <>
          <div className="home_heading">
            <div className="head text ">
            <i className="bx bxs-book-alt"></i> TodoList
            </div>
          </div>
          <div style={{margin:" 5% 9%"}} className="head text">SignUp</div>
          <div className="signUpBox">
            <div className="signup"></div>
            <div className="signupImage"></div>
          </div>
        <Footer/>
        </>
    )
}