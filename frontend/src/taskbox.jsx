import { useState, useEffect, useRef } from "react";
import Tasknote from './task';
import Input from "./input";
import axios from "axios";
import PropTypes from "prop-types";
import $ from "jquery"
import { todoStore } from "../store/todo.store";
import FloatingEditBox from "./floatingEdit";
import SectionEditBox from "./SectionEditBox";









function handleMouseOut() {

  $(".sideboxOptions").slideUp(120);
  $(".sidebox").removeClass("sideboxOpen");
  $(".editform").slideUp(120);
  // $(".des-box").slideUp(500);

}



function TaskBox({section,sectionId,tasks})
 {
  const URL="http://localhost:3000";


  const [clickedSection,setClickedSection]=useState("")
  const [sectionName, setSectionName] = useState("");
  const inputRef = useRef(null);
  const dataLength=tasks.length;


  const ProjectSelected = todoStore((state) => state.ProjectSelected);
  const fetchSections = todoStore((state) => state.fetchSections);




  useEffect(() => {
    setClickedSection(section);
    setSectionName(section)
  }, [section]);

 


  function handleEditSection(event)
  {


    const clickheight =event.target.offsetTop;
    const clickleft = event.target.offsetLeft;
    $(`.sectionEditBox.${section}`).css({
        top: clickheight+35 + "px",
        left: clickleft-120 + "px",
      });
    
    $(`.sectionBox .sectionEditBox`).removeClass("sideboxOpen");
    $(`.sectionBox .sectionEditOption`).slideUp(120);

    $(`.sectionEditBox.${section}`).toggleClass("sideboxOpen");
    $(`.sectionBox .${section} .sectionEditOption`).slideToggle(120);


   
    if (!$(`.sectionEditBox.${section}`).hasClass("sideboxOpen"))
      {  $(".projectBox").on("click",()=>{
      
           
          $(`.sectionBox .sectionEditBox`).removeClass("sideboxOpen");
          $(`.sectionBox .sectionEditOption`).slideUp(120);
          $(".projectBox").off("click");
      })   
      }
    setClickedSection(section);

  }


  async function handleSectionName(event)
{ 
  event.preventDefault();

  const EditsectionName=$(`.EditsectionName.${section}`).val();

  await axios.put(`${URL}/api/${ProjectSelected}/${section}`,  { sectionName: EditsectionName, tasks: [] })
  .then(response => {
    console.log('section name successfully changed:', response.data);

   fetchSections();

    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from the input after submission
    }
  })
  .catch(error => {
    console.error('Error updating task:', error);
    
  });

}





  return (
    <>
 
  <div className="sectionBox">

    <form 
    onSubmit={handleSectionName} 
    className="Editsection"
    >

    <i 
    className='bx bxs-chevron-down'  
    onClick={()=>{$(`#${section}`).slideToggle(250)} /**Toggle Bigbox */}
    />

    <input 
    ref={inputRef} 
    name={section}
    className={"text EditsectionName "+ section}   
    value={sectionName.replace(/_/g," ")} 
    onChange={(e) => setSectionName(e.target.value.replace(/ /g,"_"))}
    />

    <div 
    className="text taskNumber">
    {(dataLength!=0)?(dataLength+" tasks"):""}
    </div>

    <i 
    className='bx bx-dots-horizontal-rounded' 
    onClick={handleEditSection} 
    />

    </form>
   
      <SectionEditBox
        section={clickedSection}
        sectionId={sectionId}
      />

      <div id={section} className="bigbox"  onMouseLeave={handleMouseOut}>
      <div className="TaskBox" >
          {tasks&&tasks.map((task,index) => (
            // (console.log("task,taskId:",task,task.description)),
            <Tasknote
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
        section={section}
        sectionId={sectionId}
        />

        <FloatingEditBox 
           section={section}
           sectionId={sectionId}

        />

        </div>
      </div>
    </>
  );
}

TaskBox.propTypes=
{
   section: PropTypes.string,
   tasks: PropTypes.array,
   sectionId: PropTypes.string,
}

export default TaskBox;