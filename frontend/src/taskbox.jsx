import { useState, useEffect } from "react";
import Tasknote from './task';
import Input from "./input";
import axios from "axios";
import PropTypes from "prop-types";
import $ from "jquery"

function handleMouseOut() {
  $(".editbox").slideUp(150);
  $(".sidebox").removeClass("sideboxOpen");
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


  function handleSubmit(event) {

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

  $(".editbox").slideUp(150);
  $(".sidebox").removeClass("sideboxOpen");

  
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
 

      <div className="sidebox">
    
              <form
                className="editbox"
                onSubmit={handleSubmit}
                style={{ display: "none" }}
              >
                    <h1 className="text" style={{margin:"0px",fontSize:"20px"}}>Edit</h1>
                <input
                  id="edit_title"
                  className="edit-title edit inputbox"
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  name="edit_title"
                  value={editData.title}
                  placeholder="Title"
                  type="text"
                  autoComplete="off"
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
