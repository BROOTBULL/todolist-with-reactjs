import axios from "axios";
import { useState} from "react";
import $ from "jquery";
import { todoStore } from "../store/todo.store";

const URL="http://localhost:3000";


function handleclick(){
$("#InputProject").slideToggle(120);
$(".inputproject").toggleClass("openproject");
$("#InputProject").focus();

}


function InputProjects()
{
    const [ProjectName,setProjectName]=useState({
        projectName:""
    });

    const {setProjectSelected,fetchProjects}=todoStore()
    





    async function handleSubmit(e)
    {
        e.preventDefault()
        try {
            await axios.post(`${URL}/api/projects`,ProjectName);
            console.log("axios post project name")
            setProjectSelected(ProjectName.projectName);
            fetchProjects()
            setProjectName({
                projectName:""
            })
        } catch (error) {
            console.error('Error posting data:', error);
        }
   

    }
    

    return(
<>
<div className="inputproject">
<form onSubmit={handleSubmit}>
<div className="Addtask">
    <a onClick={handleclick}>Add New Project</a>
  <button style={{all:"unset"}}><i  className='bx bx-plus-circle'></i></button>
</div>
    <input
    type="text" 
    name="projectName" 
    id="InputProject"
    style={{display:"none"}}
    value={ProjectName.projectName}
    onChange={(e)=>setProjectName({ projectName:e.target.value})}
    autoComplete="off"
    required
    />
</form>

</div>

</> 
)
}


export default InputProjects