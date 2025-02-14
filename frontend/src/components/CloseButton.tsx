import React from "react";
import { IoClose } from "react-icons/io5";

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      className="w-6 h-6 flex items-center justify-center rounded-full text-[#957139] hover:bg-[#FAF1E3] absolute top-8 right-8"
      onClick={onClick}
    >
      <IoClose size={18} />
    </button>
  );
}
