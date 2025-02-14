import axios from "axios";
import { API_URL } from "./constants";

const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const signupUser = async (email, password) => {
  const response = await API.post("/auth/register", { email, password });
  return response.data;
};


export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
    API.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete API.defaults.headers["Authorization"];
  }
};

export const checkAuth = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "/auth/login";
  }
  setAuthToken(token);
};

export const fetchNotes = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "/auth/login";
    return [];
  }
  setAuthToken(token);

  try {
    const { data } = await API.get("/notes/");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load notes:", error);
    return [];
  }
};

export const saveNote = async (noteId, payload) => {
  try {
    const response = await API({
      method: noteId ? "PUT" : "POST",
      url: noteId ? `/${noteId}/` : "/",
      data: payload,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to save note: ${error.response?.status}`);
  }
};

export const categoryMap = {
  random_thoughts: "Random Thoughts",
  personal: "Personal",
  school: "School",
  drama: "Drama",
};

export const reverseCategoryMap = Object.fromEntries(Object.entries(categoryMap).map(([k, v]) => [v, k]));

export const categoryColors = {
  "Random Thoughts": { bg: "#EF9C66", border: "#D67D4A" },
  Personal: { bg: "#78ABA8", border: "#5E8E8B" },
  School: { bg: "#FCDC94", border: "#D8B76B" },
  Drama: { bg: "#C8CFA0", border: "#A3B27D" },
};