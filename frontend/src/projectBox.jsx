import { useEffect} from "react";
import TaskBox from "./taskbox";
import InputSections from "./inputSection";
import { todoStore } from "../store/todo.store";

function ProjectBox()
{
    const sections = todoStore((state) => state.sections);
    const ProjectSelected = todoStore((state) => state.ProjectSelected);
    const fetchSections = todoStore((state) => state.fetchSections);

  
    


    useEffect(() => {
      
      fetchSections(ProjectSelected);
      console.log("useEffect ProjectBox");
    }, [ProjectSelected,fetchSections]);

    


    return(
        <>
       <div className="projectBox" >

        {
        sections.map((section,id)=>(
            <TaskBox 
            key={id}
            sectionId={section._id}
            tasks={section.tasks}
            section={section.sectionName}
             />
        ))

    }
        
        <InputSections sections={sections}/>
       
       </div>

        </>
    )
}
export default ProjectBox;