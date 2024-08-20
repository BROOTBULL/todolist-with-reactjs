import axios from "axios";
import { useState} from "react";
import $ from "jquery";
import PropTypes from "prop-types"




function handleclick(){
$("#InputProject").slideToggle(120);
$(".inputproject").toggleClass("openproject");
$("#InputProject").focus();

}


function InputProjects(props)
{
    const [ProjectName,setProjectName]=useState("");


    





    async function handleSubmit(e)
    {
        e.preventDefault()
        console.log(ProjectName)
        try {
            await axios.post(`http://localhost:3000/projects`,{projectName:ProjectName ,sections:[]});
            console.log("axios post project name")
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    props.fetchProjects();

    }
    

    return(
<>
<div className="inputproject">
<form onSubmit={handleSubmit}>
<div className="Addtask"><a>AddTask</a><i onClick={handleclick} className='bx bx-plus-circle'></i></div>
    <input
    type="text" 
    name="projectName" 
    id="InputProject"
    style={{display:"none"}}
    onChange={(e)=>{setProjectName(e.target.value)}}
    autoComplete="off"
    />
</form>

</div>

</> 
)
}

InputProjects.propTypes=
{
   fetchProjects: PropTypes.func.isRequired
}
export default InputProjects