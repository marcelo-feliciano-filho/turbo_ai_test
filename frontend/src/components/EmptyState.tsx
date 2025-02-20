import React from "react";
import Image from "next/image";

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/cup.png" alt="No Notes Available" width={297} height={296} priority />
      <p className="text-xl text-[#88642A] mt-4">I’m just here waiting for your charming notes...</p>
    </div>
  );
};

export default EmptyState;
