import { format, parseISO } from "date-fns";
import { NextRouter } from "next/router";

/**
 * Formats a given ISO date string into a human-readable format.
 */
export const formatDate = (isoString: string): string => {
  if (!isoString || typeof isoString !== "string") return "Unknown Date";

  try {
    const date = parseISO(isoString);
    return format(date, "MMMM d");
  } catch {
    return "Invalid Date";
  }
};

/**
 * Retrieves authentication token from localStorage.
 */
export const getAuthToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  console.log("Fetched token:", token); // ✅ Debugging
  return token;
};

/**
 * Checks authentication and redirects if not authenticated.
 */
export const checkAuth = (router: NextRouter): void => {
  const token = getAuthToken();
  if (!token) {
    console.warn("User is not authenticated. Redirecting...");
    router.replace("/auth/login");
  }
};
