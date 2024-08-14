import { useState, useEffect } from "react";
import Tasknote from './task';
import Input from "./input";
import axios from "axios";

function TaskBox() {
  const [data, setData] = useState([]);

  // Fetch data from the server
  async function re_renderTaskBox() {
    console.log("re_render")
    try {
      const response = await axios.get('http://localhost:3000/data');
      setData(response.data);
      console.log("axios get")

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    re_renderTaskBox();
    console.log("useeffect")
  }, []);

  return (
    <>
      <div className="TaskBox">
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
      <Input onAdd={re_renderTaskBox} />
    </>
  );
}

export default TaskBox;
