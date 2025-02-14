import React from "react";

const categories = [
  { name: "Random Thoughts", color: "#ECA494" },
  { name: "School", color: "#F4D27A" },
  { name: "Personal", color: "#7FB3D5" },
];

const CategoryList = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-[#6B4E3D]">All Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="flex items-center mb-2">
            <span
              className="w-2 h-3 rounded-full mr-2"
              style={{ backgroundColor: category.color }}
            ></span>
            <span className="text-[#6B4E3D]">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
