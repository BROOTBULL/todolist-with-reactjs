import axios from "axios";
import { useState } from "react";





function InputSections()
{

const [sectionName,setSectionName]=useState("")


    async function handleSubmit(e)
{
    e.preventDefault();
    try {
        await axios.post(`http://localhost:3000/section`,{secname:sectionName});
        console.log(sectionName)

    } catch (error) {
        console.error('Error posting data:', error);
    }
}



    return(
<>
<form onSubmit={handleSubmit}>
    <input 
    type="text"
    onChange={(e)=>{setSectionName(e.target.value)}}
    name="SectionName" 
    id="InputSection"
    value={sectionName} />
</form>
</> 
)
}
export default InputSections