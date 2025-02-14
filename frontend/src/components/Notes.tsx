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
  lastEdited: string; // Expected format: "YYYY-MM-DDTHH:mm:ss.sssZ"
}

const Notes: React.FC<NotesProps> = ({title, content, category, lastEdited}) => {
  // ✅ Ensure lastEdited is properly formatted before parsing
  const formattedDate = lastEdited && !isNaN(Date.parse(lastEdited))
    ? new Date(lastEdited).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    : "Not saved yet";


  return (
    <div
      className="p-6 rounded-lg shadow-lg"
      style={{
        backgroundColor: categories[category] || "#F4A988",
        border: `3px solid ${categories[category]}`,
      }}
    >
      {/* Last Edited + Category (Fixed structure) */}
      <div className="text-xs text-black mb-2 text-right">
        <span className="font-bold">{formattedDate}</span> • {category}
      </div>

      {/* Note Title */}
      <h2 className="text-2xl font-bold text-black">{title}</h2>

      {/* Note Content */}
      <p className="text-lg text-black mt-2">{content}</p>
    </div>
  );
};

export default Notes;
