import axios from "axios";
import { useState } from "react";
import { todoStore } from "../store/todo.store";


function InputSections()
{
    const URL="http://localhost:3000";
    const {ProjectSelected,fetchSections}=todoStore()
    const [sectionName,setSectionName]=useState({
    sectionName:"",tasks:[{title:"Tasks...",description:"Descriptions..."}]
    })


    async function handleSubmit(e)
{
   
    e.preventDefault();
    try {
        
        await axios.post(`${URL}/${ProjectSelected}`,sectionName);
        console.log("Section Names: ",sectionName)
        setSectionName({sectionName:"",tasks:[{title:"Tasks...",description:"Descriptions..."}]});
        fetchSections()
      
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

export default InputSections