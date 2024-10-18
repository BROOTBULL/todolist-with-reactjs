import axios from "axios";
import { create } from "zustand";

const URL="http://localhost:3000";

axios.defaults.withCredentials = true;// line tells Axios HTTP client to send cookies with every request by default


export const todoStore = create((set,get)=>({
    
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

    fetchProjects: async (userId) => {
    try {
        console.log("userId",userId);
        
        const response = await axios.get(`${URL}/api/${userId}/projects`);
        set({data:response.data});
        console.log("project Names==>",response.data)

    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
    },
    fetchSections: async () => {
 
   
        try {
            const {ProjectSelected}=get()
            console.log(ProjectSelected);
            if(ProjectSelected)
            {const response=await axios.get(`${URL}/${ProjectSelected}`)
            set({sections:response.data});      
        }}
        catch(err)
        {
            console.log(err)
        }
    },
    fetchTasks :async (section) => {
        try {
          const {ProjectSelected}=get()

          const response = await axios.get(`${URL}/${ProjectSelected}/${section}/`);
          set({data:response.data});
          console.log("Task responce :",response.data)
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }


}))