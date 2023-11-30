import React from "react";
import Team from "./Team";
import { useQuery } from "@tanstack/react-query";

const TeamLayout = () => {
  
  const { data: trainers } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/application?role=trainer`);
      return res.json();
    },
  });
  return (
    <>
     <div className="bg-[#dde244a6]">
      <div className="container m-auto px-4 py-10">
      <h1 className="mb-5 text-6xl font-bold font-oswald text-white py-5">
          Our Top <span className="text-6xl text-black">Expertise</span>
        </h1>
        <div className="grid  py-10 items-center">
          <div className="grid grid-cols-4 gap-4 ">
            {trainers?.map((member, index) => (
              <Team member={member} key={index}></Team>
            ))}
          </div>
        </div>
      </div>
     </div>
    </>
  );
};

export default TeamLayout;
