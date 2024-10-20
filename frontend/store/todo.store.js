import axios from "axios";
import { create } from "zustand";

const URL="http://localhost:3000";


axios.defaults.withCredentials = true;// line tells Axios HTTP client to send cookies with every request by default


export const todoStore = create((set)=>({
    Projects:[],
    
    ProjectSelected:"",
    setProjectSelected: (projectName) => set({ ProjectSelected: projectName }),

    sections:[],

    data:[],

    passedValues:{
        id:"",
        content:"",
        title:""
    },

    setPassedValues:(id,content,title)=>set({id:id,content:content,title:title}),

    fetchProjects: async () => {
    try {
        // console.log("userId",userId);
        
        const response = await axios.get(`${URL}/api/projects`);
        set({Projects:response.data});
        console.log("project Names==>",response.data)

    } catch (error) {
        console.error('Error fetching projects:', error);
    }
    },
    fetchSections: async (ProjectSelected) => {
   
        try {
            console.log("Project selected:",ProjectSelected);
            if(ProjectSelected)
            { 
            const response=await axios.get(`${URL}/api/${ProjectSelected}/sections`);
            set({sections:response.data}); 
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
          console.log("Task responce :",response.data)
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }


}))