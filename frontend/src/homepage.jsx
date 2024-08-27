import { useState,useEffect } from "react";
import $ from "jquery";
import InputProjects from "./inputProject";
import axios from "axios";
import ProjectBox from "./projectbox";





function Home() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [activeProject,setActiveProject]=useState("Home");
  const [data, setData] = useState([]);

function selectProject(e)
{
  console.log(e.target.id);
  setActiveProject(e.target.id);
}



const fetchProjects = async () => {
  try {
    const response = await axios.get('http://localhost:3000/projects');
    setData(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

useEffect(() => {
  fetchProjects();
}, []);




  function togglemenu() {
    setIsSidebarActive(!isSidebarActive);

    $(".navbox").fadeToggle(120);
    $(".sidebar").toggleClass("active");
   
  }



  return (
    <>
      <div className="fullPage">
        <div className="sidebar">
          <div className="text navbox" style={{display:"none"}}>
          <h1 className="text head">TodoList</h1>
            <div className="navitem profile">
              <a href="">UserName</a>
            </div>
         
            <InputProjects fetchProjects={fetchProjects}/>

            <div className="projectbox">
            {data.map((project,index)=>(
                <div className="projects" id={project.projectName} onClick={selectProject} key={index}>
                <a style={{pointerEvents:"none"}}>{project.projectName}</a>
                </div>
            ))}
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
        <div className={"mainBody " + (isSidebarActive ? "changeMainBody" : "")}>
          <div className="heading">
            <button className="btn menubtn" onClick={togglemenu}>
              <i
                className={
                  "bx " + (isSidebarActive ? "bx-left-arrow-alt" : "bx-menu")
                }
              ></i>
            </button>
            <h1 id="ProjectHeading" className="text">{activeProject}</h1>
            <button className="viewbtn btn">
              view <i className="bx bx-slider-alt"></i>
            </button>
          </div>




          <ProjectBox activeProject={activeProject}/>




            
        </div>
      </div>
    </>
  );
}



export default Home;
