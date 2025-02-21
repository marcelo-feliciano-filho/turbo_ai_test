// utils/categoryMap.ts
export const categoryMap: Record<string, { display: string; color: string }> = {
  random_thoughts: {
    display: "random thoughts",
    color: "#EF9C66",
  },
  personal: {
    display: "personal",
    color: "#78ABA8",
  },
  school: {
    display: "school",
    color: "#FCDC94",
  },
  drama: {
    display: "drama",
    color: "#C8CFA0",
  },
}

export const defaultCategory = {
  display: "Unknown",
  color: "#F4A988",
}
