import { useQuery } from "@tanstack/react-query";
import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import Button from "../Shared Component/Button";
import { Link } from "react-router-dom";
import WeeklySchedule from "../Component/Classes/WeeklySchedule";

const Classes = () => {
  const { isLoading, data: classes } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/classes`);
      return res.json();
    },
  });

  console.log(classes);
  return (
    <div>
      <RouteLabel label={"All classes"}></RouteLabel>
      {isLoading ? (
        <div className="container mx-auto mt-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="container mx-auto px-4 ">
          <div className="flex gap-5 ">
          <div className="grid grid-cols-3 gap-5">
            {classes.map((item) => (
              <div className="card bg-slate-500 rounded-none text-primary-content">
                <div className="card-body">
                  <h2 className="card-title text-[#dde244] text-3xl font-bold font-oswald  capitalize ">
                    {item?.name}
                  </h2>
                  <span className="capitalize text-gray-300 font-roboto">
                    {item?.trainerName}
                  </span>
                  <span className="text-[#dde244] capitalize border font-roboto px-3 py-1 inline">
                    {item?.category}
                  </span>
                  <p className="font-roboto text-white">{item?.details}</p>
                  <p className="font-roboto text-white">
                    Class Duration:{" "}
                    <span className="text-[#dde244]">
                      {item?.classDuration} minutes
                    </span>
                  </p>

                  <div className="card-actions justify-start">
                    <Link to="/trainer">
                      <Button label={"join now"}></Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
          <h2 className="card-title text-[#dde244] text-4xl font-bold font-oswald  capitalize ">
                    Weekly Schedule
                  </h2>
            <WeeklySchedule></WeeklySchedule>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
