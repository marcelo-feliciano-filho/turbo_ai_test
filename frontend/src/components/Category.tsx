import React from "react";

interface CategoryProps {
  name: string;
  color: string;
}

export default function Category({ name, color }: CategoryProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
      <span className="text-[#88642A]">{name}</span>
    </div>
  );
}
