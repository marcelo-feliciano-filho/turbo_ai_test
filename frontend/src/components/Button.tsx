import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-transparent border-2 border-[#8B5E3B] text-[#8B5E3B] px-4 py-2 rounded-lg hover:bg-[#8B5E3B] hover:text-white transition duration-200 z-50"
    >
      {text}
    </button>
  );
};

export default Button;
