import PropTypes from "prop-types"
import axios from "axios";
import { useEffect, useState } from "react";
import TaskBox from "./taskbox";
import InputSections from "./inputSection";

function ProjectBox(props)
{
    const [sections,setsections]=useState([]);
    const activeProject=props.activeProject;
    

    const fetchSections = async () => {
    
        try {
            const response=await axios.get(`http://localhost:3000/${props.activeProject}`)
            setsections(response.data);
            console.log("sections fetch successfully",response.data)
          
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect(() => {
      
            fetchSections();
        
    }, [props.activeProject]);
    


    

    const handleAddSection=()=>{
        fetchSections();
    }


    return(
        <>
       <div className="projectBox" >
       

        {sections.map((section,id)=>(
            <TaskBox 
            key={id}
            id={section._id}
            activeProject={activeProject}
            section={section.sectionName}
            EditSection={handleAddSection}
             />
        ))

    }
        
        <InputSections 
          activeProject={activeProject}
          AddSection={handleAddSection} />
       
       </div>

        </>
    )
}
ProjectBox.propTypes=
{
   activeProject: PropTypes.string.isRequired

}
export default ProjectBox;