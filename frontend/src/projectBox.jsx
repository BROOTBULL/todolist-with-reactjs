import PropTypes from "prop-types"
import axios from "axios";
import { useEffect, useState } from "react";
import TaskBox from "./taskbox";
import InputSections from "./inputSection";




function ProjectBox(props)
{
    console.log("projectBox")
    const [sections,setsections]=useState([]);
    const activeProject=props.activeProject;


    const fetchSections = async () => {
        setsections([]);
        if(props.activeProject!="Home")
        try {
            const response=await axios.get(`http://localhost:3000/${props.activeProject}`)
            setsections(response.data);
            console.log("sections fetch successfully",sections)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchSections();
    },[activeProject]);

    function handleAddSection()
    {
        fetchSections();
    }

    return(
        <>
         <InputSections 
          activeProject={activeProject}
          AddSection={handleAddSection} />

        {sections.map((section,index)=>(
            <TaskBox 
            key={index}
            activeProject={activeProject}
            section={section.sectionName}
             />
        ))

        }
        

        </>
    )
}
ProjectBox.propTypes=
{
   activeProject: PropTypes.string.isRequired

}
export default ProjectBox;