// import { useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import { useEffect } from "react";



function Tasknote(props) {
  const content = props.content.replace(/\n/g, "<br>");
  const task = props.task;
  const Id = props.id;

  const tlength = props.taskLength;
  const clength = props.contentLength;

  function handleClick(event) {

    console.log(event.target.id);
    props.onEdit(event.target.id);
  
    console.log(event.target);
    $(".editbox").slideToggle(120);
    $(".sidebox").toggleClass("sideboxOpen");
    $("#edit_title").focus();
  }


function handleMouseMove(event)
{
    const clickheight = event.pageY;
    const clickleft = event.pageX;
    $(".sidebox").css({
        top: clickheight-20 + "px",
        left: clickleft-20 + "px",
      });
}


  useEffect(() => {
    $("#" + Id).css(
      "grid-column",
      tlength > 20 || clength > 200
        ? tlength > 40
          ? "span 3"
          : "span 2"
        : "span 1"
    );
    $("#" + Id).css("grid-row", clength > 70 ? "span 2" : "span 1");
  }, [tlength, clength, Id]);

  return (
    <div id={Id} onClick={handleClick} onMouseEnter={handleMouseMove} className="tasknote text">
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
  taskLength: PropTypes.number.isRequired,
  contentLength: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Tasknote;
