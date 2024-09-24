import axios from "axios";
import { create } from "zustand";

const URL="http://localhost:3000/api/auth";

export const authStore = create((set) => ({
  userId: null,
  isAuthanticated: false,
  error: null,

  signUp: async (userInfo) => {
    set({ error: null });

    try {
      const response = await axios.post(`${URL}/signUp`, userInfo);
      console.log(response.data);
      set({user:response.data.username})
     
    } catch (error) {
      console.error("Error posting data:", error);
    }
  },
}));
