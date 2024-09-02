import { useState,useEffect } from "react";
import $ from "jquery";
import InputProjects from "./inputProject";
import axios from "axios";
import ProjectBox from "./projectbox";




function Home() {
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [activeProject,setActiveProject]=useState("Today");
  const [data, setData] = useState([]);

function selectProject(e)
{
  console.log(e.target.title);
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


  return (
    <>
      <div className="fullPage">
        <div className="sidebar">
          <div className="text navbox" >
          <h1 className="text head">TodoList</h1>
            <div className="navitem profile">
              <a href="">UserName</a>
            </div>
         
            <InputProjects ProjectAdded={ProjectAdded}/>

            <div className="projectbox">
            {data.map((project,index)=>(
                <div className="projects" key={index}>
                <a onClick={selectProject} title={project.projectName} ># {project.projectName}</a>
                <i className='bx bxs-trash-alt' title={project.projectName} onClick={handleDeleteProject}></i>
                </div>
            ))}
            </div>

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
