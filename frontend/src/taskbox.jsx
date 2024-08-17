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

  const sectionName=$(".sectionName").val();
  console.log(sectionName);

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




  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    fetchTasks(); // Refresh the task list
    if (props.onAdd) props.onAdd(); // Call onAdd if provided
  };

  return (
    <>
    <form onSubmit={handleSectionName} className="section">
    <input className="text sectionName" defaultValue={"Home"} ></input>
    <i className='bx bxs-chevron-down'  onClick={()=>{$(".bigbox").slideToggle(300)}} ></i>
    </form>
   

    <div className="bigbox" style={{display:"none"}} onMouseLeave={handleMouseOut}>
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

      <Input onAdd={handleAdd} />

      <FloatingEditBox Id={index} fetchTasks={fetchTasks}/>

      </div>
    </>
  );
}

TaskBox.propTypes=
{
   onAdd: PropTypes.func.isRequired
}

export default TaskBox;
