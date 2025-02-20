import React, { useEffect } from "react";
import { useRouter } from "next/router";
import CategoryList from "../components/CategoryList";
import Button from "../components/Button";
import { getAuthToken } from "../utils/helpers";
import Image from "next/image";

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/auth/login");
    }
  }, [router]);

  const handleNewNote = () => {
    router.push("/notes");
  };

  return (
    <div className="bg-[#FAF1E3] min-h-screen p-8 flex">
      <aside className="w-1/4 pr-8">
        <h2 className="font-bold text-lg mb-4">All Categories</h2>
        <CategoryList />
      </aside>

      <main className="w-3/4 flex flex-col relative">
        <div className="self-end mb-4 z-50 relative">
          <Button text="+ New Note" onClick={handleNewNote} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
          <Image src="/cup.png" alt="No Notes Available" width={297} height={296} className="mb-4" />
          <p className="text-lg text-[#88642A] text-center">I’m just here waiting for your charming notes...</p>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
