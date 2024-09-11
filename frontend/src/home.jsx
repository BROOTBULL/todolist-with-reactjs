import { useState,useEffect } from "react";
import $ from "jquery";
import InputProjects from "./inputProject";
import axios from "axios";
import ProjectBox from "./projectbox";
import useUserInfo from "../Contexts/UserContext";
import UserOptions from "./UserOptions";





function Home() {
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [activeProject,setActiveProject]=useState("Today");
  const [data, setData] = useState([]);

function selectProject(e)
{
  setActiveProject(e.currentTarget.title);
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
    $(".sidebar").toggleClass("close");
    $("#InputProject").slideUp(100);
    $(".inputproject").removeClass("openproject");
   
  }

  async function handleDeleteProject(e)
  {
    const projectDelete=e.target.title;
    
    await axios.delete(`http://localhost:3000/${projectDelete}`)
    .then(response => {
      console.log('project deleted',response.data);
      fetchProjects()
      setActiveProject("Today")
    })
    .catch(error => {
      console.error('Error updating task:', error);
      
    });

  }


  function ProjectAdded(project)
  {
    setActiveProject(project)
    fetchProjects()
  }

const {isLoggedIn,setIsLoggedIn}=useUserInfo()

  return (
    <>
       

      <div className="fullPage">
        <div className="sidebar">
          <div className="text navbox" >
            <div onClick={()=>{$(".UserOptions").slideToggle(100)}} className="navitem profile">
              <a><i className='bx bxs-user-circle'/> UserName  <i className='bx bx-chevron-down'/></a>
            </div>
            <UserOptions/>

            <div className="navitem">
              <a href="">Search</a>
            </div>
            <div className="navitem">
              <a href="">Inbox</a>
            </div>
            <div onClick={selectProject} title="Today" className="navitem">
              <a href="">Today</a>
            </div>
            <div className="navitem">
              <a href="">Upcoming</a>
            </div>
<hr />
            <InputProjects ProjectAdded={ProjectAdded}/>
<hr />
<div className="projectbox">
{data.map((project)=>(
    <div className="projects" key={project._id}>
    <a onClick={selectProject} title={project.projectName} ># {project.projectName}</a>
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
            <h1 id="ProjectHeading" className="text"># {activeProject}</h1>
            <div onClick={()=>$(".viewOptions").slideToggle(300)} style={{padding:"0px 10px",marginLeft:"auto",marginRight:"2%"}}className="text navitem">
              view <i className="bx bx-slider-alt"></i>
            </div>
            <div style={{display:"none"}} className="viewOptions">
                <div className="text sectionEditOption">Change Theme</div>
                <hr style={{width:"90%"}}/>
                <div onClick={()=>setIsLoggedIn(!isLoggedIn)} className="text sectionEditOption delete">Logout</div>
            </div>
          </div>

         <ProjectBox activeProject={activeProject}/>
  
        </div>
      </div>
    </>
  );
}



export default Home;
