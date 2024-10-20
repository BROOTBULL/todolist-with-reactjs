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
   
    


    $(`.${props.section} .sideboxOptions`).slideToggle(120);
    $(`.${props.section}.sidebox`).toggleClass("sideboxOpen");
    $("#edit_title").focus();

    setPassedValues(event.target.id,taskcontentValue,tasktitleValue);
  }



  function handleMouseOver(event){

    if (!$(".sidebox").hasClass("sideboxOpen")){
    const clickheight =event.target.offsetTop;
    const clickleft = event.target.offsetLeft;
    const clickwidth=event.target.offsetWidth;
    $(".sidebox").css({
        top: clickheight + "px",
        left: clickleft+clickwidth-38 + "px",
      });
    }
}

  useEffect(() => {
    $("#" + Id).css("grid-column",tlength > 20 || clength > 150? (tlength > 40 || clength > 240? "span 3": "span 2"): "span 1");
    $("#" + Id).css("grid-row", tlength < 20 && (clength > 80 || linebreaks > 3)? "span 2" : "span 1");
  }, [tlength, clength, Id]);

  return (
    <div id={Id} onClick={handleClick} onMouseOver={handleMouseOver} className="tasknote text">
      <div className="tasktitle">{task}</div>
      <div
        className="taskdecs"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
Tasknote.propTypes = {
  task: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  taskLength: PropTypes.number.isRequired,
  contentLength: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default Tasknote;
