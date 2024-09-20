import axios from "axios";
import { useState} from "react";
import $ from "jquery";
import PropTypes from "prop-types"
import useUserInfo from "../Contexts/UserContext";

const URL="http://localhost:3000";


function handleclick(){
$("#InputProject").slideToggle(120);
$(".inputproject").toggleClass("openproject");
$("#InputProject").focus();

}


function InputProjects(props)
{
    const [ProjectName,setProjectName]=useState({
        projectName:""
    });

    const {id:userId}=useUserInfo()
    





    async function handleSubmit(e)
    {
        e.preventDefault()
        try {
            await axios.post(`${URL}/api/${userId}/projects`,ProjectName);
            console.log("axios post project name")
            props.ProjectAdded(ProjectName.projectName);
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

InputProjects.propTypes=
{
   ProjectAdded: PropTypes.func.isRequired
}
export default InputProjects