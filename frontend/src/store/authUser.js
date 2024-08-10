import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isloggingOut: false,
  isloggingIn: false,

  //signup
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully.");
    } catch (error) {
      set({ isSigningUp: false, user: null });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  //login
  login: async (credentials) => {
    set({ isloggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isloggingIn: false });
      toast.success("Login successfully.");
    } catch (error) {
      set({ isloggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  //logout
  logout: async () => {
    try {
      set({ isloggingOut: true });
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isloggingOut: false });
      toast.success("Logged out successfully.");
    } catch (error) {
      set({ isloggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  // authCheck
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
