import axios from "axios";
import { API_URL } from "./constants";

const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Include access token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refreshToken");
        if (!refresh) throw new Error("No refresh token");
        // Attempt refresh
        const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh });
        localStorage.setItem("authToken", data.access);
        API.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return API(originalRequest);
      } catch {
        // Refresh failed; force re-login
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  last_updated?: string;
  created_at?: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await API.post<AuthResponse>("/auth/token/", { email, password });
  // Store refresh token so we can auto-refresh
  localStorage.setItem("refreshToken", data.refresh);
  return data;
};

export const signupUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await API.post<AuthResponse>("/auth/register/", { email, password });
  localStorage.setItem("refreshToken", data.refresh);
  return data;
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

// Create or update a note
export const saveNote = async (
  noteId: number | null,
  payload: { title: string; content: string; category: string }
): Promise<Note> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token.");

  if (noteId) {
    return (await API.put<Note>(`/notes/${noteId}/`, payload)).data;
  } else {
    return (await API.post<Note>("/notes/", payload)).data;
  }
};

export const fetchNotes = async (): Promise<Note[]> => {
  return (await API.get<Note[]>("/notes/")).data;
};
