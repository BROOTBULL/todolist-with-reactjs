import PropTypes from "prop-types";
import $ from "jquery";
import { useEffect } from "react";
import { todoStore } from "../store/todo.store";



function Tasknote(props) {
  
  const content = props.content.replace(/\n/g, "<br>");
  const linebreaks = (props.content.match(/\n/g) || []).length; 
  const task = props.task;
  const Id = props.id;

  const tlength = props.taskLength;
  const clength = props.contentLength;
  const {setPassedValues}=todoStore();


  function handleClick(event)
   {
    const tasktitleValue=(event.currentTarget.querySelector(".tasktitle")).innerHTML;    
    const taskcontentValue=(event.currentTarget.querySelector(".taskdecs")).innerHTML;
   
    
    setPassedValues(Id,taskcontentValue,tasktitleValue);


    $(`.${props.section} .sideboxOptions`).slideToggle(120);
    $(`.${props.section}.sidebox`).slideToggle(120);
    $("#edit_title").focus();

  }




  function handleMouseOver(event){
    const { top, left } = $(event.target).offset();
    const width = $(event.target).outerWidth();
    $(".sidebox").slideUp(100).animate({
      top: top + "px",
      left: left + width + 3 + "px",
    });
    $(".sideboxOptions").slideUp(100)
   
   
    

}

  useEffect(() => {
    $("#tasknotes" + Id).css("grid-column",tlength > 20 || clength > 150? (tlength > 40 || clength > 240? "span 3": "span 2"): "span 1");
    $("#tasknotes" + Id).css("grid-row", tlength < 20 && (clength > 80 || linebreaks > 3)? "span 2" : "span 1");
  }, [tlength, clength, Id]);

  return (
    <div id={"tasknotes"+Id} onClick={handleClick} onMouseOver={handleMouseOver}className="tasknote text">
      <div className="tasktitle">{task}</div>
      <div
        className="taskdecs"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
Tasknote.propTypes = {
  task: PropTypes.string,
  content: PropTypes.string,
  section: PropTypes.string,
  taskLength: PropTypes.number,
  contentLength: PropTypes.number,
  id: PropTypes.string,
};

export default Tasknote;
