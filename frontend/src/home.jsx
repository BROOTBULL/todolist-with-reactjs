import { useState,useEffect } from "react";
import $ from "jquery";
import InputProjects from "./inputProject";
import axios from "axios";
// import ProjectBox from "./projectBox";
import UserOptions from "./UserOptions";
import { Link } from "react-router-dom";

import { authStore } from "../store/auth.store";


const URL="http://localhost:3000"



function Home() {


  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const {userId,ProjectSelected,setProjectSelected,logout}=authStore()
  const {fetchProjects,data,username}=authStore()





useEffect(() => {
  fetchProjects(userId);
  setProjectSelected("Today")
}, [fetchProjects]);



  function togglemenu() {
    setIsSidebarActive(!isSidebarActive);

    $(".navbox").fadeToggle(120);
    $(".sidebar").toggleClass("close");
    $("#InputProject").slideUp(100);
    $(".inputproject").removeClass("openproject");
   
  }

  async function handleDeleteProject(e)
  {
   
    const projectDelete=e.target.title;
    
    await axios.delete(`${URL}/api/${userId}/${projectDelete}`)
    .then(response => {
      console.log('project deleted',response.data);
      fetchProjects()
      setProjectSelected("Today")
    })
    .catch(error => {
      console.error('Error updating task:', error);
      
    });

  }
  

  return (
    <>
       

      <div className="fullPage">
        <div className="sidebar">
          <div className="text navbox" >
            <div onClick={()=>{$(".UserOptions").slideToggle(100)}} className="navitem profile">
              <a><i className='bx bxs-user-circle'/> {username} <i style={{marginLeft:"auto"}} className='bx bx-chevron-down'/></a>
            </div>
            <UserOptions/>

            <div className="navitem">
              <a href="">Search</a>
            </div>
            <div className="navitem">
              <a href="">Inbox</a>
            </div>
            <div onClick={()=>setProjectSelected("Today")} title="Today" className="navitem">
              <a href="">Today</a>
            </div>
            <div className="navitem">
              <a href="">Upcoming</a>
            </div>
<hr />
            <InputProjects />
<hr />

<div className="projectbox">
{data.map((project)=>(
    <div className="projects" key={project._id}>
    <a onClick={(e)=> setProjectSelected(e.currentTarget.title)} title={project.projectName} ># {project.projectName}</a>
    <i className='bx bxs-trash-alt' title={project.projectName} onClick={handleDeleteProject}></i>
    </div>
    
))}
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
            <h1 id="ProjectHeading" className="text"># {ProjectSelected}</h1>
            <div onClick={()=>$(".viewOptions").slideToggle(300)} style={{padding:"0px 10px",marginLeft:"auto",marginRight:"2%"}}className="text navitem">
              view <i className="bx bx-slider-alt"></i>
            </div>
            <div style={{display:"none"}} className="viewOptions">
                <div className="text sectionEditOption">Change Theme</div>
                <hr style={{width:"90%"}}/>
                <Link to="/" onClick={()=>logout()} className="text sectionEditOption delete">Logout</Link>
            </div>
          </div>

         {/* <ProjectBox /> */}
  
        </div>
      </div>
    </>
  );
}



export default Home;
