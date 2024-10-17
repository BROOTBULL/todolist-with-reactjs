import { useEffect} from "react";
// import TaskBox from "./taskbox";
import InputSections from "./inputSection";
import { todoStore } from "../store/todo.store";

function ProjectBox()
{
    const {/*sections,**/projectSelected,fetchSections}=todoStore()
  
    


    useEffect(() => {
        
      fetchSections();
      (projectSelected!=="Today")&&console.log("sections fetch successfully")

    }, [projectSelected]);
    


    




    return(
        <>
       <div className="projectBox" >
       

        {
        // sections.map((section,id)=>(
        //     <TaskBox 
        //     key={id}
        //     id={section._id}
        //     section={section.sectionName}
        //     EditSection={handleAddSection}
        //      />
        // ))

    }
        
        <InputSections />
       
       </div>

        </>
    )
}
export default ProjectBox;