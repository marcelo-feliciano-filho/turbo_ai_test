import axios from "axios";
import { API_URL } from "./constants";

const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Authentication
interface AuthResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/token/", { email, password });
  return response.data;
};

export const signupUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/register/", { email, password });
  console.log("Signup API Response:", response.data);
  return response.data;
};

export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem("authToken", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete API.defaults.headers.common["Authorization"];
  }
};

// Notes API
export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  last_updated?: string;
  created_at?: string;
}

export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const { data } = await API.get<Note>(`/notes/${id}/`);
    return data;
  } catch {
    throw new Error("Failed to load note.")
  }
};

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const { data } = await API.get<Note[]>("/notes/");
    return data;
  } catch {
    throw new Error("Failed to load notes.");
  }
};

export const saveNote = async (
  noteId: number | null,
  payload: { title: string; content: string; category: string }
): Promise<Note> => {
  try {
    let response;
    if (noteId) {
      response = await API.put<Note>(`/notes/${noteId}/`, payload);
    } else {
      response = await API.post<Note>("/notes/", payload);
    }
    return response.data;
  } catch {
    throw new Error("Failed to save note.");
  }
};
