import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import { useQuery } from "@tanstack/react-query";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaClock, FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa6";
import Button from "../Shared Component/Button";

const Trainer = () => {
  const { isLoading, data: trainers } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/application?role=trainer`);
      return res.json();
    },
  });

  return (
    <div className="pb-10">
      <RouteLabel label={"all trainer"}></RouteLabel>
      {isLoading ? (
        <div className="container mx-auto mt-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-3 gap-4 ">
            {trainers.map((trainer) => (
              <div className="card w-96 bg-gray-700 rounded-none">
                <div className="flex gap-4 items-center px-8 py-8 border-b border-gray-100 ">
                  <div class="avatar">
                    <div class="w-24 rounded-full">
                      <img src={trainer.profileImage} />
                    </div>
                  </div>
                  <div>
                    <h2 className="card-title text-[#dde244] text-2xl font-bold font-oswald  capitalize ">
                      {trainer?.fullName}
                    </h2>
                    <span className="text-gray-300 font-roboto">
                      ( {trainer?.yearsOfExperience} years experience )
                    </span>
                    <div className="flex  gap-3 mt-3 ">
                      {trainer.socialIcons.map((item) => (
                        <Link to={item?.link} key={item?.platform}>
                          <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
                            {item?.platform === "Facebook" && <FaFacebookF />}
                            {item?.platform === "Linkedin" && <FaLinkedinIn />}
                            {item?.platform === "Instagram" && (
                              <AiFillInstagram />
                            )}
                            {/* Add more conditions based on your available icons */}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-body  ">
                  <div className="text-start flex-grow">
                    {trainer.skills?.map((item) => (
                      <>
                        <p className="capitalize text-gray-300 font-roboto">
                          {item?.skill}
                        </p>
                        <progress
                          className="progress  "
                          value={item?.value}
                          max="100"
                        ></progress>
                      </>
                    ))}
                  </div>
                  <div className="flex gap-4 items-center my-3">
                    <FaClock className=" text-2xl" />
                    <div className="flex justify-start items-center  ">
                       {
                        trainer?.availableTimeSlot?.map(item=>(
                          <p className=" font-roboto text-[#dde244]  capitalize mr-2">
                          {item?.day} , 
                        </p>
                        ))
                       }
                    </div>
                  </div>
                  <div className="card-actions">
                    <Link to={`/trainer/${trainer._id}`}>
                      <Button label={"know more"}></Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainer;
