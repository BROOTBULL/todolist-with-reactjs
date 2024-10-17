import axios from "axios";
import { create } from "zustand";

const URL="http://localhost:3000";

axios.defaults.withCredentials = true;// line tells Axios HTTP client to send cookies with every request by default


export const todoStore = create((set,get)=>({
    
    ProjectSelected:"",
    setProjectSelected: (projectName) => set({ ProjectSelected: projectName }),
    sections:[],

    data:[],

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
   console.log("hiii");
   
        try {
            const {ProjectSelected}=get()
            if(ProjectSelected)
            {const response=await axios.get(`${URL}/${ProjectSelected}`)
            set({sections:response.data});      
        }}
        catch(err)
        {
            console.log(err)
        }
    }


}))