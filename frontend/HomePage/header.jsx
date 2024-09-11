import useUserInfo from "../Contexts/UserContext";

export default function Header(){
  const { isLoggedIn, setIsLoggedIn } = useUserInfo();

    return(
        <div className="home_heading">
        <div className="head text ">
          <i className="bx bxs-book-alt"></i> TodoList
        </div>

        <div className="navOptionBox">
          <div className="text navOption">Feautres</div>
          <div className="text navOption">About</div>
          <div className="text navOption">Contact us</div>
          <hr />
          <div className="text navOption">Log In</div>
          <div
            onClick={() => {
              setIsLoggedIn(!isLoggedIn);
            }}
            className="text navOption signUp"
          >
            Start for free
          </div>
        </div>
      </div>
    );
}