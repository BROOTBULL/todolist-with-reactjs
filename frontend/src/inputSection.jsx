import axios from "axios";
import { useState } from "react";
import { todoStore } from "../store/todo.store";
import PropTypes from "prop-types";


function InputSections({sections})
{
    const URL="http://localhost:3000";
    // const {ProjectSelected,fetchSections}=todoStore()

    const ProjectSelected = todoStore((state) => state.ProjectSelected);
    const addSection = todoStore((state) => state.addSection);

    const [sectionName,setSectionName]=useState({
    sectionName:"",tasks:[{title:"Tasks...",description:"Descriptions..."}]
    })


    async function handleSubmit(e)
{
   
    e.preventDefault();
    try {
        
        const response=await axios.post(`${URL}/api/${ProjectSelected}/add_Sections`,sectionName)
        console.log("Section Names: ",response.data)
        setSectionName({sectionName:"",tasks:[{title:"Tasks...",description:"Descriptions..."}]});
        addSection(sections,sectionName)
        
      
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

    <button style={{all:"unset"}}>
     <i className='bx bx-plus'/>
    </button>

</form>
</> 
)
}

InputSections.propTypes=
{
   sections: PropTypes.array,
}


export default InputSections