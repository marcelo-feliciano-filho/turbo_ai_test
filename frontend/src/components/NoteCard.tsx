import React from 'react';

type NoteProps = {
  title: string;
  content: string;
  category: string;
  date: string;
};

const categoryColors: { [key: string]: string } = {
  "Random Thoughts": "bg-categoryRandom",
  "School": "bg-categorySchool",
  "Personal": "bg-categoryPersonal",
};

export default function NoteCard({ title, content, category, date }: NoteProps) {
  return (
    <div className={`border-2 rounded-lg p-4 shadow-md border-cardBorder ${categoryColors[category] || 'bg-gray-100'}`}> 
      <p className="text-sm text-primaryText font-bold">
        {date} <span className="font-normal">{category}</span>
      </p>
      <h2 className="text-xl font-title text-primaryText mt-1">{title}</h2>
      <p className="text-primaryText text-sm mt-2">{content}</p>
    </div>
  );
}
