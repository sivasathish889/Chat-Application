import Image from "next/image";
import React from "react";
import bgImage from "@/public/backgroung_image.jpg";


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image
        src={bgImage}
        alt="background image"
        className=" absolute w-full object-cover  h-full"
      />
      {children}
    </div>
  );
};

export default layout;
