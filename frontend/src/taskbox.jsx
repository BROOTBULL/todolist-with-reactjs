import { useState, useEffect } from "react";
import Tasknote from './task';
import Input from "./input";
import axios from "axios";
import PropTypes from "prop-types";
import $ from "jquery"

function handleMouseOut() {
  $(".sideboxOptions").slideUp(120);
  $(".sidebox").removeClass("sideboxOpen");
  $(".editform").slideUp(120);
  $(".des-box").slideUp(500);

}
  

function TaskBox(props)
 {



  const [id, setid] = useState();
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    title:"",
    description:""
  });




function handleEdit()
{
  $(".editform").slideToggle(120);
  $(".sideboxOptions").slideUp(120);
  $("#edit_title").focus()
}


function handleLeavesidebox()
{   
  $(".sidebox").removeClass("sideboxOpen");
  $(".sideboxOptions").slideUp(120);
  $(".editform").slideUp(120);
  
}



function handledelete()
{

  if (id) {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(response => {
        console.log('Task deleted successfully:', response.data);
        fetchTasks(); // Refresh the task list
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  } else {
    console.error('ID or edit data is missing.');
  }



  $(".editform").slideUp(120);
  $(".sideboxOptions").slideUp(120);
  $(".sidebox").removeClass("sideboxOpen");
}


  function handleSubmit(event) 
  {

   event.preventDefault()
   console.log(editData)
   
   if (id && editData) {
    axios.put(`http://localhost:3000/tasks/${id}`, editData)
      .then(response => {
        console.log('Task updated successfully:', response.data);
        setEditData({
          title:"",
          description:""
        })
        fetchTasks(); // Refresh the task list
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  } else {
    console.error('ID or edit data is missing.');
  }



  $(".sidebox").removeClass("sideboxOpen");
  $(".editform").slideUp(120);

}




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
    <div className="bigbox" onMouseLeave={handleMouseOut}>
    <div className="TaskBox" >
        {data.map((task, index) => (
          <Tasknote
            onEdit={(id)=>setid(id)}
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
 

      <div className="sidebox" onMouseLeave={handleLeavesidebox} >
           <div className="text sideboxOptions" onClick={handleEdit} style={{display:"none"}}>Edit
            
           </div>
    
              <form
                className="editform"
                onSubmit={handleSubmit}
                style={{ display: "none" }}
              >
                  
                <input
                  id="edit_title"
                  className="edit-title edit inputbox"
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  name="edit_title"
                  value={editData.title}
                  placeholder="Title"
                  type="text"
                  autoComplete="off"
                  required
                />
                <textarea
                  className="edit-content edit inputbox"
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  name="edit_content"
                  value={editData.description}
                  placeholder="description"
                  type="text"
                  autoComplete="off"
                />
                <button className="editbtn">edit</button>
              </form>
              <h3 className="text sideboxOptions delete" onClick={handledelete} style={{display:"none"}}>Delete<i className='bx bxs-x-square'></i></h3>
            </div>
            </div>
    </>
  );
}

TaskBox.propTypes=
{
   onAdd: PropTypes.func.isRequired
}

export default TaskBox;
