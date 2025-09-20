import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8002" : "/";
export const authStore = create((set, get) => ({

    authUser: null,
    isGettingTask: false,
    isLoggingIn: false,
    isCreatingAgent: false,
    isCheckingAuth: false,
    isUploading: false,
    userData: null,
    agent: [],

    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data.role });
            set({userData:res.data})
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    agentLogin: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            // console.log(res.data.user.role)
            set({ authUser: res.data.user.role })
            set({userData:res.data})
            toast.success("Logged in successfully");

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    adminLogin: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/adminlogin", data);
            set({ authUser: res.data.user.role })
            set({userData:res.data})
            toast.success("Logged in successfully (Admin)");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Logged out successfully");

            set({
                authUser: null,
                agent: null,
                userdata:null,
            });

        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },


    upload: async (file) => {

        set({ isUploading: true })
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axiosInstance.post("/admin/uploadfile", formData)

            toast.success(res.data.message)

        } catch (error) {
            toast.error(error.response?.data?.message || "File upload failed");
        } finally {
            set({ isUploading: false });
        }

    },

    getTask: async () => {
        set({ isGettingTask: true });
        const { agent } = get(); // ← Gets current agent array
        try {
            const res = await axiosInstance.get("/agent/agent-task");
            set({ agent: res.data }); // ← appends new data
        } catch (error) {
            toast.error("error while getting tasks");
        } finally {
            set({ isGettingTask: false });
        }
    },

    createAgent: async(agentD)=>{
        set({isCreatingAgent:true})
        try{
            const res = await axiosInstance.post("/admin/createuser",agentD);
            toast.success(res.data.message)
            console.log(res)
        }catch(error){
            toast.error("error while creating agent")
        }finally{
            set({isCreatingAgent:false});
        }
    }

}))