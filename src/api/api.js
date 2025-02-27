import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginFaculty = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const registerFaculty = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const fetchProfile = async (token) => {
  return await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
