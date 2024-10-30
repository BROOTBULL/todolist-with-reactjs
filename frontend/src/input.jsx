import { useState,useEffect, useRef }from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';//create a temp Id for state 
import { todoStore } from "../store/todo.store";


function Input({section,sectionId}) {

    const URL="http://localhost:3000";
    const {ProjectSelected,addTask,setServerId}=todoStore()
    const i=useRef(null)
    const TodayRef=useRef(null)
    
    const [newtask,setnewTask]=useState({
        title:"",
        description:"",
    })

    useEffect(() => {
        $("#title").keydown((event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#description").focus();
            }
        });
        $("#description").on("input", function() {
            $(this).css("height", "auto"); // Reset the height to allow shrinking
            $(this).css("height", this.scrollHeight + "px");
        });
        return () => {
            $("#title").off("keydown");
            $("#description").off("input");
          };

    }, []);



    function handleChange(event)
    {
        const {name,value}=event.target;

        setnewTask((prevValue)=>({
            ...prevValue,
            [name]:value
        }))
 
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        const tempId=uuidv4();

        addTask(sectionId,newtask,tempId)
        setnewTask({
            title: "",
            description: ""
        })
     
        try {
            const response=await axios.post(`${URL}/api/${ProjectSelected}/${section}`, newtask);
            console.log("axios post serverTasksId :",response.data.task,"temp Id:",tempId)
            const taskServerId=response.data.task._id;
            console.log("serverId of last added:",taskServerId);
            
            console.log("Before set:", todoStore.getState().sections);
            
            setServerId(sectionId,tempId,taskServerId)    //         set server id in the task id and removing tmp id
            console.log("After set:", todoStore.getState().sections);
          
        } catch (error) {
            console.error('Error posting data:', error);
        }
        
    }

    const toggleDropdown=(e,ref)=>{
      
      $(ref.current).css({top:e.screenY-60,left:e.screenX-20})   
      $(ref.current).slideToggle(300)   
    }
    
    const handleCancel=(e)=>{
      e.preventDefault()
      setnewTask({title: "",description: ""})
      $(i.current).slideUp(300).blur()
    }



  return (
    
      <form 
      className="inputform" 
      onSubmit={HandleSubmit}
      >
        
            <input
            onChange={handleChange}
            onFocus={()=> {$(i.current).slideDown(300),console.log(i.current);
            }}
            className="titlebox inputbox"
            type="text"
            name="title"
            value={newtask.title}
            id="title"
            placeholder="Add task"
            required
            > </input>
            
        
           <div ref={i} className=" des-box "    style={{display:"none"}}>
         
           <textarea
            onChange={handleChange}
            className="descriptionbox inputbox text"
            type="text"
            name="description"
            placeholder="Description"
            value={newtask.description}
            id="description"
            required
            />

             <div className="taskOptions">
             <button className="buttons" type="button"onClick={(e)=>toggleDropdown(e,TodayRef)}>Today</button>
                <div ref={TodayRef} className="Options text"  style={{display:"none"}}>
               
                </div>
             <button ref={i} className="buttons" onClick={toggleDropdown} >Priority</button>
             </div>

            <hr style={{width:"93%"}}/>
            <div className="taskOptions">
            <button ref={i} className="buttons" onClick={toggleDropdown}>{ProjectSelected} / {section} <i className='bx bxs-chevron-down'/></button>
            <button ref={i}  className="cancel buttons" onClick={handleCancel} >Cancel</button>
            <button ref={i} type="submit" className="add buttons">Add Task</button>
            </div>
           </div>
        
      </form>


  );
}

Input.propTypes=
{
   section: PropTypes.string,
   sectionId: PropTypes.string,
}
export default Input