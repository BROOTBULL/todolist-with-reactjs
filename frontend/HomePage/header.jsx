import { Link, useNavigate } from "react-router-dom";


export default function Header(){
const navigate=useNavigate();
    return(
        <div className="home_heading">
        <div className="head text ">
          <i className="bx bxs-book-alt"></i> <span style={{cursor:"pointer"}} onClick={()=>navigate("/")}>TodoList</span>
        </div>

        <div className="navOptionBox">
          <div className="text navOption">Feautres</div>
          <div className="text navOption">About</div>
          <div className="text navOption">Contact us</div>
          <hr />
          <Link to="/LogIn" className="text navOption">Log In</Link>
          <Link to="/SignUp" className="text navOption signUp">
            Start for free
          </Link>
        </div>
      </div>
    );
}