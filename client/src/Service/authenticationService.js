import axios from "axios";

// BASE_URL from your .env file
const API_URL = import.meta.env.VITE_APP_API_URL;
const AUTH_URL = `${API_URL}/auth`;

// Edit Product (with multiple images)
const login = async (data) => {
  const response = await axios.post(`${AUTH_URL}/login`, data);
  return response.data;
};

export { login };
