import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  return (
    <button
      className="border border-[#957139] rounded-xl px-4 py-2 text-[#88642A] hover:bg-[#f0e6d2] transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
