import axios from "axios";
import { create } from "zustand";


const URL="http://localhost:3000";


axios.defaults.withCredentials = true;// line tells Axios HTTP client to send cookies with every request by default


export const todoStore = create((set)=>({
    Projects:[],
    
    ProjectSelected:"",
    setProjectSelected: (projectName) => set({ ProjectSelected: projectName }),

    sections:[],
    addSection:(sections,section)=>(set({sections:[...sections ,section]})),
    deleteSection: (sectionId) => set(({ sections }) => ({
        sections: sections.filter((section) => section._id !== sectionId)
      })),
      
    
    addTask: (sectionId, addedTask,tempId) => {

        const newTask={...addedTask,_id:tempId}
        set((state) => ({
        sections: state.sections.map((section) =>
            
            section._id === sectionId
                ? { ...section, tasks: [...(section.tasks || []), newTask] } // Add the new task to the section
                : section
    )
    }))}, 

    setServerId:(sectionId,tempId,taskServerId)=>{
        
        set((state) => ({
            sections: state.sections.map((section) =>
        
                section._id === sectionId
                    ? {...section,
                        tasks:section.tasks.map((task)=>
                            task._id===tempId?
                        {...task, _id:taskServerId }
                        :task
                    )  } 
                    : section
        )}));
    },

    EditTask: (sectionId,taskId, editedTask) => (set((state) => ({
        sections: state.sections.map((section) =>
            
            section._id === sectionId
                ? {...section,
                    tasks:section.tasks.map((task)=>
                    task._id===taskId?
                    {...task,title:editedTask.title,description:editedTask.description }
                    :task
                ) } 
                : section
    )
    }))), 
    
    deleteTask: (sectionId, tasksIdToRemove) => (set((state) => ({
        sections: state.sections.map((section) =>
            
            section._id === sectionId? { ...section, tasks: section.tasks? section.tasks.filter((task)=>task._id !==tasksIdToRemove) : [] } : section
    )
    }))),
    

    data:[],

    passedValues:{
        id:"",
        content:"",
        title:""
    },

    setPassedValues:(id,content,title)=>set({passedValues:{id:id,content:content,title:title}}),

    fetchProjects: async () => {
    try {
        // console.log("userId",userId);
        
        const response = await axios.get(`${URL}/api/projects`);
        set({Projects:response.data});
        console.log("project Names==>",response.data)
        return response.data.length

    } catch (error) {
        console.error('Error fetching projects:', error);
    }
    },
    fetchSections: async (ProjectSelected) => {
   
        try {
            if(ProjectSelected)
            { 
            const response=await axios.get(`${URL}/api/${ProjectSelected}/sections`);
            set({sections:response.data}); 
            console.log("section fetched todostore");
            
            return response.data;

        }}
        catch(err)
        {
            console.log("Error fetching Sections",err)
        }
    },
    fetchTasks :async (ProjectSelected,section) => {
        try {
        

          const response = await axios.get(`${URL}/api/${ProjectSelected}/${section}`);
          set({data:response.data});
          console.log("Task responce todostore:",response.data)

        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }, 
 


}))