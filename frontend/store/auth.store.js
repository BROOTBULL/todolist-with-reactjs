import axios from "axios";
import { create } from "zustand";

const URL = "http://localhost:3000/api/auth";
axios.defaults.withCredentials = true;

export const authStore = create((set) => ({
  userId: null,
  isAuthanticated: false,
  error: null,

  signUp: async (userInfo) => {
    set({ error: null });

    try {
      const response = await axios.post(`${URL}/signUp`, userInfo);
      console.log(response.data);
      set({ user: response.data.username });
    } catch (error) {
      console.log("Error posting data:", error);
    }
  },
  checkauth: async () => {
    set({ error: null });
    try {
      const response = await axios.get(`${URL}/check-auth`);
      console.log("i got triggred");
      console.log("response:",response.data);
      
      
      set({ userId: response.data.user._id, isAuthanticated:true });
    } catch (error) {
      set({ error: error.message, isAuthenticated: false });
      console.log("Error checking auth:", error);
    }
  },
}));
