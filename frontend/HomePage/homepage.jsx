import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import "./homepage.css";
import HowtoUse from "./howtouse";

function Homepage() {

  const navigate =useNavigate();

  return (
    <>
      <Header />

      {/**    //////////////// Head ///////////////       */}

      <div className=" homebody">
        <div className="text hero_title">
          Turn Your{" "}
          <span
            style={{ whiteSpace: "nowrap", color: "rgba(112, 119, 255, 0.5)" }}
          >
            To-Dos
          </span>{" "}
          into Done
          <p className="hero_description">
            Simplify life for both you and your team with the world’s #1 task
            manager and to-do list app.
            <br />
            <br /> 374K+ ★★★★★ reviews from
          </p>
          <div
            onClick={() => {
            navigate("/SignUp")
            }}
            className="text navOption signUp"
          >
            Start for free
          </div>
        </div>

        <div className="hero_image" />
      </div>

{/*   /////////////// Reviews ////////////          */}

      <div className="reviews">
        <div className="review_card text_curve">
          “Simple, straightforward, and super powerful”
          <div className="text_bold reviewer">THE VERGE</div>
        </div>
        <hr />
        <div className="review_card text_curve">
          “Simply a joy to use”
          <div className="text_bold reviewer">TECH REDAR</div>
        </div>
        <hr />
        <div className="review_card text_curve">
          “The best to-do list app on the market”
          <div className="text_bold reviewer">WIRECUTTER</div>
        </div>
        <hr />
        <div className="review_card text_curve">
          “Nothing short of stellar”
          <div className="text_bold reviewer">PAC MAG</div>
        </div>
      </div>

      {/**    //////////////// How to use ///////////////       */}

      <HowtoUse/>

      {/**    //////////////// Headline ///////////////       */}

      <div className="headline text">
        Gain calmness and clarity with the world’s most beloved productivity app
        <div
          onClick={() => navigate("/SignUp")}
          className="text navOption signUp" >
          Start for free
        </div>
      </div>

      {/**    //////////////// Footer ///////////////       */}



      <Footer/>
    </>
  );
}
export default Homepage;
