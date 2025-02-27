import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const registerFaculty = (data) => api.post("/register", data);
export const loginFaculty = (data) => api.post("/login", data);
export const getDashboard = (token) =>
  api.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });