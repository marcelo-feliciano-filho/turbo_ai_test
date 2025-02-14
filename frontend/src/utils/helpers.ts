import { format, parseISO } from "date-fns";

export const formatDate = (isoString: string): string => {
  if (!isoString || typeof isoString !== "string") return "Unknown Date";

  try {
    const date = parseISO(isoString);
    return format(date, "MMMM d"); // ✅ Output: "February 14"
  } catch {
    return "Invalid Date";
  }
};

export const getAuthToken = () => localStorage.getItem("authToken");

export const checkAuth = (router) => {
  const token = getAuthToken();
  if (!token) router.push("/auth/login");
  return token;
};
