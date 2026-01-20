import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000") + "/api/auth";

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Registration failed";
        }
    },

    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Login failed";
        }
    },
};

export default authService;
