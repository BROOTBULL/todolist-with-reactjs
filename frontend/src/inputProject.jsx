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
    const [ProjectName,setProjectName]=useState({
        projectName:"",
        sections:[]
    });


    





    async function handleSubmit(e)
    {
        e.preventDefault()
        console.log(ProjectName)
        try {
            await axios.post(`http://localhost:3000/projects`,ProjectName);
            console.log("axios post project name")
            props.ProjectAdded(ProjectName.projectName);
            setProjectName({
                projectName:"",
                sections:[]
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
    <a onClick={handleclick}>AddTask</a>
  <button style={{all:"unset"}}><i  className='bx bx-plus-circle'></i></button>
</div>
    <input
    type="text" 
    name="projectName" 
    id="InputProject"
    style={{display:"none"}}
    value={ProjectName.projectName}
    onChange={(e)=>setProjectName({...ProjectName , projectName:e.target.value})}
    autoComplete="off"
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