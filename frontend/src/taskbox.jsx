import { useState, useEffect } from "react";
import Tasknote from './task';
import Input from "./input";
import axios from "axios";
import PropTypes from "prop-types";
import $ from "jquery"
import FloatingEditBox from "./floatingEdit";
import SectionEditBox from "./SectionEditBox";









function handleMouseOut() {
  $(".sideboxOptions").slideUp(120);
  $(".sidebox").removeClass("sideboxOpen");
  $(".editform").slideUp(120);
  $(".des-box").slideUp(500);

}



function TaskBox(props)
 {

  const [passedValues, setPassedValues] = useState({
    id:"",
    content:"",
    title:""
  });
  const [data, setData] = useState([]);
  const [dataLength,setDataLength]=useState()
  const [clickedSection,setClickedSection]=useState("")
  const projectName=props.activeProject;
  const section=props.section;





  function handleOnEdit(id,content,title)
  {
    setPassedValues({
      id:id,
      content:content,
      title:title
    });

  }





  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${props.activeProject}/${props.section}/`);
      setData(response.data);
      console.log("sections responce :",response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
   
    fetchTasks();
  
  }, [props.section]);
  
  useEffect(() => {
    setDataLength(data.length);
  }, [data]);

  const handleAdd = () => {
    fetchTasks(); // Refresh the task list
  };

  useEffect(() => {
    setClickedSection(section);
  }, [section]);


  function handleEditSection(event)
  {


    const clickheight =event.target.offsetTop;
    const clickleft = event.target.offsetLeft;
    $(`.sectionEditBox.${section}`).css({
        top: clickheight+35 + "px",
        left: clickleft-120 + "px",
      });
    
    $(`.sectionEditBox`).removeClass("sideboxOpen");
    $(`.sectionEditOption`).slideUp(120);
    console.log("section:",section);
    setClickedSection(section);
    $(`.sectionEditBox.${section}`).toggleClass("sideboxOpen");
    $(`.${section} .sectionEditOption`).slideToggle(120);


   
    if ($(`.sectionEditBox.${section}`).hasClass("sideboxOpen"))
      {  $(".projectBox").on("click",()=>{
      console.log("hiiii");
      
           
          $(`.sectionEditBox`).removeClass("sideboxOpen");
          $(`.sectionEditOption`).slideUp(120);
          $(".projectBox").off("click");
      })   
      }
  }


  async function handleSectionName(event)
{ 
  event.preventDefault();

  const EditsectionName=$(`.EditsectionName.${section}`).val();
  console.log(EditsectionName);

  await axios.put(`http://localhost:3000/${props.activeProject}/${props.section}`,{sectionName:EditsectionName,tasks:[]})
  .then(response => {
    console.log('section name successfully changed:', response.data);
    props.EditSection();
  })
  .catch(error => {
    console.error('Error updating task:', error);
    
  });

}





  return (
    <>
  <div className="sectionBox">
    <form onSubmit={handleSectionName} className="Editsection">
    <i className='bx bxs-chevron-down'  onClick={()=>{$(`#${props.section}`).slideToggle(300)}} ></i>
    <input className={"text EditsectionName "+ section} defaultValue={section} ></input>
    <div className="text taskNumber">{(dataLength!=0)?(dataLength+" tasks"):""}</div>
    <i className='bx bx-dots-horizontal-rounded' onClick={handleEditSection} ></i>
    </form>
   
    <SectionEditBox
projectName={projectName}
section={clickedSection}
DeleteSection={props.EditSection}/>

    <div id={section} className="bigbox"  onMouseLeave={handleMouseOut}>
    <div className="TaskBox" >
        {data.map((task, index) => (
          <Tasknote
            onEdit={handleOnEdit}
            section={section}
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

      <FloatingEditBox 
       Id={passedValues.id}
       fetchTasks={fetchTasks}
       title={passedValues.title}
       content={passedValues.content}
       projectName={projectName}
       section={section}
       />

      </div>
    </div>
    </>
  );
}

TaskBox.propTypes=
{
   activeProject: PropTypes.string.isRequired,
   section: PropTypes.string.isRequired,
   EditSection:PropTypes.func
}

export default TaskBox;