import React from "react";

// Define categories with their respective colors
const categories: { [key: string]: string } = {
  "Random Thoughts": "#EF9C66",
  Personal: "#78ABA8",
  School: "#FCDC94",
  Drama: "#C8CFA0",
};

interface NotesProps {
  title: string;
  content: string;
  category: string;
  lastEdited: string; // Expected format: "YYYY-MM-DD"
}

const Notes: React.FC<NotesProps> = ({ title, content, category, lastEdited }) => {
  const formattedDate = new Date(lastEdited).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="p-6 rounded-lg shadow-lg"
      style={{
        backgroundColor: categories[category] || "#F4A988",
        border: `3px solid ${categories[category]}`,
      }}
    >
      {/* Last Edited + Category */}
      <p className="text-xs text-black mb-2">
        <span className="font-bold text-[12px]">{formattedDate}</span>{" "}
        <span className="text-[12px]">{category}</span>
      </p>

      {/* Note Title */}
      <h2 className="text-2xl font-bold text-black">{title}</h2>

      {/* Note Content */}
      <p className="text-lg text-black mt-2">{content}</p>
    </div>
  );
};

export default Notes;
