import { useState,useEffect }from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import axios from "axios";
import { todoStore } from "../store/todo.store";


function Input({section,sectionId}) {

    const URL="http://localhost:3000";
    const {ProjectSelected,addTask}=todoStore()
    
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
        console.log("handle submit")
    
        try {
            await axios.post(`${URL}/api/${ProjectSelected}/${section}`, newtask);
            console.log("axios post")
             
             addTask(sectionId,newtask)

             console.log("onAdd executed")
             setnewTask({
                title: "",
                description: ""
            });
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    



  return (
    
      <form 
      className="inputform" 
      onClick={()=> {$(`#${section}.des-box`).slideDown(300);}} 
      onSubmit={HandleSubmit}
      >
        
            <input
            onChange={handleChange}
            className="titlebox inputbox"
            type="text"
            name="title"
            value={newtask.title}
            id="title"
            placeholder="Add task"
            required
            > </input>
            
        
           <div id={section} className=" des-box "    style={{display:"none"}}>
           <textarea
            onChange={handleChange}
            className="descriptionbox inputbox text"
            type="text"
            name="description"
            placeholder="Description"
            value={newtask.description}
            id="description"
            required
            > </textarea>

            {/* <input type="date" /> */}


            <button type="submit" className="addbtn"><i className='bx bx-plus' ></i></button>
           </div>
        
      </form>


  );
}

Input.propTypes=
{
   section: PropTypes.string.isRequired,
   sectionId: PropTypes.string.isRequired,
}
export default Input