import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types"






function InputSections(props)
{
    const activeProject =props.activeProject;
    const [sectionName,setSectionName]=useState({
    sectionName:"",tasks:[{title:"Tasks...",description:"Descriptions..."}]
    })


    async function handleSubmit(e)
{
   
    e.preventDefault();
    try {
        console.log(sectionName.sectionName.replace(/ /g,"_"));
        
        await axios.post(`http://localhost:3000/${activeProject}`,sectionName);
        console.log("Section Names: ",sectionName)
        setSectionName({sectionName:"",tasks:[{title:"Tasks...",description:"Descriptions..."}]});
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
    onChange={(e)=>{setSectionName({ ...sectionName, sectionName: e.target.value.replace(/ /g,"_") })}}
    name="SectionName" 
    id="InputSection"
    value={sectionName.sectionName.replace(/_/g," ")}
    placeholder="Add sections.." 
    autoComplete="off"
    required
    />
    <button style={{all:"unset"}}><i className='bx bx-plus'></i></button>
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