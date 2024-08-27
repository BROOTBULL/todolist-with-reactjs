import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types"






function InputSections(props)
{
    const activeProject =props.activeProject;

const [sectionName,setSectionName]=useState({
    sectionName:"",task:[{title:"Tasks...",description:"Descriptions..."}]
})


    async function handleSubmit(e)
{
    e.preventDefault();
    try {
        await axios.post(`http://localhost:3000/${activeProject}`,sectionName);
        console.log("Section Names: ",sectionName)
        setSectionName({sectionName:"",tasks:[]});
        props.AddSection()
      
    } catch (error) {
        console.error('Error posting data:', error);
    }
}



    return(
<>
<form className="addSections" onSubmit={handleSubmit}>
    <input
     
    type="text"
    onChange={(e)=>{setSectionName({ ...sectionName, sectionName: e.target.value })}}
    name="SectionName" 
    id="InputSection"
    value={sectionName.sectionName}
    placeholder="Add sections.." 
    autoComplete="off"
    required
    />
    <i className='bx bx-plus'></i>
</form>
</> 
)
}
InputSections.propTypes=
{
   activeProject: PropTypes.string.isRequired,
   AddSection: PropTypes.func

}

export default InputSections