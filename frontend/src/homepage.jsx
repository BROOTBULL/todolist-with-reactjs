import { useState } from "react";
import $ from "jquery";
import TaskBox from "./taskbox"


function Home() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    function togglemenu() {
      setIsSidebarActive(!isSidebarActive);
      $(".sidebar").toggleClass("active");
      $(".navitem a").fadeToggle(180);
    }

    const handleAdd = () => {
      // This function will be passed down to TaskBox and used to refresh tasks
      console.log("Task added, refreshing list...");
    };

    return (
      <>
        <div className="fullPage">
          <div className="sidebar">
            <div className="text navbox">
              <div className="navitem profile">
                <a href="">UserName</a>
              </div>
              <div className="navitem">
                <a href="">AddTask</a>
              </div>
              <div className="navitem">
                <a href="">Search</a>
              </div>
              <div className="navitem">
                <a href="">Inbox</a>
              </div>
              <div className="navitem">
                <a href="">Today</a>
              </div>
              <div className="navitem">
                <a href="">Upcoming</a>
              </div>
            </div>
          </div>
          <div className={"mainBody "+(isSidebarActive ? "changeMainBody" : "")}>
            <div className="heading">
              <button className="btn menubtn" onClick={togglemenu}><i className={"bx " + (isSidebarActive ? "bx-left-arrow-alt" : "bx-menu")}></i></button>
              <h1 className="text head">TodoList</h1>
              <button className="viewbtn btn">view <i className="bx bx-slider-alt"></i></button>
            </div>
             

    <div>
    <TaskBox  onAdd={handleAdd} />
  
    </div>
  
  
          </div>
        </div>
      </>
    );
  }
  
  export default Home;
  