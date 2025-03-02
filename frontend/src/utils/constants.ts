export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const categoryMap: { [key: string]: string } = {
  random_thoughts: "Random Thoughts",
  personal: "Personal",
  school: "School",
  drama: "Drama",
};

export const reverseCategoryMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(categoryMap).map(([k, v]) => [v, k])
);

export const categoryColors: { [key: string]: { bg: string; border: string } } = {
  "Random Thoughts": { bg: "#EF9C66", border: "#D67D4A" },
  Personal: { bg: "#78ABA8", border: "#5E8E8B" },
  School: { bg: "#FCDC94", border: "#D8B76B" },
  Drama: { bg: "#C8CFA0", border: "#A3B27D" },
};
