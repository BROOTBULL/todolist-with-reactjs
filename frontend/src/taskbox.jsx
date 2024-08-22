import { useState, useEffect } from "react";
import Tasknote from './task';
import Input from "./input";
import axios from "axios";
import PropTypes from "prop-types";
import $ from "jquery"
import FloatingEditBox from "./floatingEdit";






function handleMouseOut() {
  $(".sideboxOptions").slideUp(120);
  $(".sidebox").removeClass("sideboxOpen");
  $(".editform").slideUp(120);
  $(".des-box").slideUp(500);

}

async function handleSectionName(event)
{ 
  event.preventDefault();

  const EditsectionName=$(".EditsectionName").val();
  console.log(EditsectionName);

  // try
  // {
  //     await axios.post("http://localHost:3000/section",sectionName);
  //     console.log("section name posted");
  // }
  // catch(error)
  // {
  //   console.log(error);
  // }

}

function TaskBox(props)
 {

  const [index, setindex] = useState();
  const [data, setData] = useState([]);
  const projectName=props.activeProject;
  const section=props.section;



  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${props.activeProject}/${props.section}/`);
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    fetchTasks(); // Refresh the task list
  };

  return (
    <>
    <form onSubmit={handleSectionName} className="Editsection">
    <input className="text EditsectionName" defaultValue={section} ></input>
    <i className='bx bxs-chevron-down'  onClick={()=>{$(`#${section}`).slideToggle(300)}} ></i>
    </form>
   

    <div id={section} className="bigbox" style={{display:"none"}} onMouseLeave={handleMouseOut}>
    <div className="TaskBox" >
        {data.map((task, index) => (
          <Tasknote
            onEdit={(id)=>setindex(id)}
            key={index}
            id={task._id}
            taskLength={task.title.length}
            contentLength={task.description.length}
            task={task.title}
            content={task.description}
          />
        ))}
      </div>

      <Input 
      onAdd={handleAdd} 
      projectName={projectName}
      section={section}
       />

      <FloatingEditBox Id={index} fetchTasks={fetchTasks}/>

      </div>
    </>
  );
}

TaskBox.propTypes=
{
   activeProject: PropTypes.string.isRequired,
   section: PropTypes.string.isRequired

}

export default TaskBox;