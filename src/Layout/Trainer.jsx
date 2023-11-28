import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import { useQuery } from "@tanstack/react-query";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaClock, FaFacebookF, FaGoogle } from "react-icons/fa6";
import Button from "../Shared Component/Button";

const Trainer = () => {
  const { isLoading, data: trainers } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await fetch("./trainer.json");
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
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
                      <Link>
                        <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
                          <FaFacebookF />
                        </span>
                      </Link>
                      <Link>
                        <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
                          <FaGoogle />
                        </span>
                      </Link>
                      <Link>
                        <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
                          <AiFillInstagram />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body  ">
                  <div className="text-start">
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
                    <p className=" font-roboto text-[#dde244]">{trainer.availableTimeSlot.start} -  </p>
                    <p className=" font-roboto text-[#dde244]"> {trainer.availableTimeSlot.end}</p>
                  </div>
                  </div>
                  <div className="card-actions">
                    <Link to={`/trainer/${trainer.id}`}>
                    <Button label={'know more'}></Button>
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
