import { useState,useEffect }from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import axios from "axios";


function Input(props) {
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
            await axios.post('http://localhost:3000/', newtask);
            console.log("axios post")
            if (props.onAdd) props.onAdd();
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
    
    <div>
      <form className="inputform" onSubmit={HandleSubmit}>
        
            <input
            onChange={handleChange}
            className="titlebox inputbox"
            type="text"
            name="title"
            value={newtask.title}
            id="title"
            required
            > </input>
            
        
           <div className=" des-box">
           <textarea
            onChange={handleChange}
            className="descriptionbox inputbox text"
            type="text"
            name="description"
            value={newtask.description}
            id="description"
            required
            > </textarea>
            <button type="submit" className="addbtn"><i className='bx bx-plus' ></i></button>
           </div>
        
      </form>
    </div>
  );
}

Input.propTypes=
{
   onAdd: PropTypes.func.isRequired
}
export default Input