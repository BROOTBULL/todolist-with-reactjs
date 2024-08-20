import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types"






function InputSections(props)
{
    const activeProject =props.activeProject;

const [sectionName,setSectionName]=useState("")


    async function handleSubmit(e)
{
    e.preventDefault();
    try {
        await axios.post(`http://localhost:3000/${activeProject}`,{sectionName:sectionName,tasks:[]});
        console.log(sectionName)

    } catch (error) {
        console.error('Error posting data:', error);
    }
}



    return(
<>
<form className="addSections" onSubmit={handleSubmit}>
    <input
     
    type="text"
    onChange={(e)=>{setSectionName(e.target.value)}}
    name="SectionName" 
    id="InputSection"
    placeholder="Add sections.."
    value={sectionName} 
    autoComplete="off"
    />
    <i className='bx bx-plus'></i>
</form>
</> 
)
}
InputSections.propTypes=
{
   activeProject: PropTypes.string.isRequired
}

export default InputSections