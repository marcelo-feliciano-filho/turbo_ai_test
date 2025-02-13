import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="bg-buttonBackground border-2 border-buttonBorder px-4 py-2 rounded-full text-primaryText hover:bg-buttonHover flex items-center gap-2"
      onClick={onClick}
    >
      <span>➕</span> {label}
    </button>
  );
}
