import axios from 'axios';

// API URL
const API_URL = "http://localhost:5000"; // Replace with your backend API URL

// Login function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Invalid email or password!" };
  }
};

// Get Students function
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch students!" };
  }
};
