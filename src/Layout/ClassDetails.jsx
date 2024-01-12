import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import RouteLabel from "../Shared Component/RouteLabel";
import Button from "../Shared Component/Button";

const ClassDetails = () => {
  const classDetails = useLoaderData();
  console.log(classDetails);

  return (
    <div>
      <RouteLabel label={"Class details"}></RouteLabel>
      <div className="container mx-auto px-4 pb-10">
        <div className="items-center rounded-none  grid grid-cols-2 gap-10 justify-between ">
          <figure className="w-full">
            <img src={classDetails.photo} alt="Album" className="w-full" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-[#dde244] text-5xl font-bold font-oswald  capitalize ">
              {classDetails?.name}
            </h2>
            <span className="capitalize text-gray-300 font-roboto">
              {classDetails?.trainerName}
            </span>
            <span className="font-roboto text-white mt-10 ">{classDetails?.details}</span>
            <span className="font-roboto text-white">
              Class Duration:{" "}
              <span className="text-[#dde244]">
                {classDetails?.classDuration} minutes
              </span>
            </span>
            <span className="font-roboto text-white">
              Class Catagory:{" "}
              <span className="capitalize text-[#dde244]">
                {classDetails?.category}
              </span>
            </span>
            <div className="card-actions mt-10 justify-start">
              <Link to="/trainer">
                <Button label={"join now"}></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
