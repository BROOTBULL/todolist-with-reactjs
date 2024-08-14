// import { useState } from "react";
import PropTypes from "prop-types"
import $ from "jquery";
import { useEffect } from "react";


function Tasknote(props)
{  
    const content=props.content.replace(/\n/g, "<br>");
    const task=props.task;
    const Id=props.id;

   const tlength=props.taskLength;
   const clength=props.contentLength;


useEffect(() => {
    $("#" + Id).css("grid-column",(tlength > 20|| clength > 200)? (tlength > 40 ? "span 3" : "span 2") : "span 1");
    $("#" + Id).css("grid-row",clength > 70 ? "span 2" : "span 1");
    window.scrollTo(0, document.body.scrollHeight);
}, [tlength,clength, Id]);




    return(
        <div id={Id} className="tasknote text">
            <div className="tasktitle">{task}</div>
            <div className="taskdecs" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    )
}
Tasknote.propTypes=
{
   task: PropTypes.string.isRequired,
   content: PropTypes.string.isRequired,
   taskLength: PropTypes.number.isRequired,
   contentLength: PropTypes.number.isRequired,
   id: PropTypes.number.isRequired,
}

export default Tasknote



