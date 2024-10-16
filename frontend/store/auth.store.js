import axios from "axios";
import { create } from "zustand";

const authURL = "http://localhost:3000/api/auth";


axios.defaults.withCredentials = true;

export const authStore = create((set) => ({
  userId: null,
  isAuthanticated: false,
  ProjectSelected:"",
  error: null,

  setProjectSelected: (projectName) => set({ ProjectSelected: projectName }),
  
  login:async(userInfo)=>{
    try {
      const response =await axios.post(`${authURL}/logIn`, userInfo);
      console.log(response.data.message);
      set({userId:response.data.user._id,isAuthanticated:true});
    
  } catch (error) {
      console.error('Error posting data:', error);
  } 
  },

  signUp: async (userInfo) => {
    set({ error: null });

    try {
      const response = await axios.post(`${authURL}/signUp`, userInfo);
      console.log(response.data);
      set({ userId: response.data.user._id,isAuthanticated:true});
    } catch (error) {
      console.log("Error posting data:", error);
    }
  },
  checkauth: async () => {
    set({ error: null });
    try {
      const response = await axios.get(`${authURL}/check-auth`);
      console.log("i got triggred");
      console.log("response:",response.data);    
      set({ userId: response.data.user._id, isAuthanticated:true });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log("Error message:", errorMessage);
        set({ error: errorMessage, isAuthenticated: false });
      }
  
    }
  },
logout:async()=>
{
  try {
    const response = await axios.post(`${authURL}/logOut`);
    set({ userId: null,isAuthanticated:false});
    console.log(response.data.message);
    
  } catch (error) {
    console.log(error)
  }
}
}));
