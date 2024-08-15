import { useState, useEffect } from "react";
import Tasknote from './task';
import Input from "./input";
import axios from "axios";
import PropTypes from "prop-types";
// import $ from "jquery"

  
function TaskBox(props) {
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
      <div className="TaskBox" >
        {    console.log("Map start")}
        {data.map((task, index) => (
          <Tasknote
            key={index}
            id={index}
            taskLength={task.title.length}
            contentLength={task.description.length}
            task={task.title}
            content={task.description}
          />
        ))}
      </div>
      <Input onAdd={handleAdd} />
    </>
  );
}

TaskBox.propTypes=
{
   onAdd: PropTypes.func.isRequired
}

export default TaskBox;
