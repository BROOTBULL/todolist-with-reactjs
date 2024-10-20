import { useEffect} from "react";
import TaskBox from "./taskbox";
import InputSections from "./inputSection";
import { todoStore } from "../store/todo.store";

function ProjectBox()
{
    const {sections,ProjectSelected,fetchSections}=todoStore()
  
    


    useEffect(() => {
      
      fetchSections(ProjectSelected);

    }, [ProjectSelected]);

    useEffect(() => {
      
     console.log("sections",sections);
     
  
      }, [sections]);

    


    return(
        <>
       <div className="projectBox" >
       

        {
        sections.map((section,id)=>(
            <TaskBox 
            key={id}
            SectionId={section._id}
            section={section.sectionName}
             />
        ))

    }
        
        <InputSections />
       
       </div>

        </>
    )
}
export default ProjectBox;