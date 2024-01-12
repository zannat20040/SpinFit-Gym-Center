import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import { useQuery } from "@tanstack/react-query";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaClock, FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa6";
import Button from "../Shared Component/Button";
import { Helmet } from "react-helmet-async";

const Trainer = () => {
  const { isLoading, data: trainers } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await fetch('https://server-psi-tawny-84.vercel.app/application?role=trainer');
      return res.json();
    },
  });

  return (
    <div className="pb-10">
      <Helmet>
        <title>SpinFit | trainer</title>
      </Helmet>
      <RouteLabel label={"all trainer"}></RouteLabel>
      {isLoading ? (
        <div className="container mx-auto mt-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-4 gap-4 ">
            {trainers.map((trainer) => (
              <div className="card  bg-gray-700 rounded-none">
                <div className="flex flex-col justify-center items-center  gap-4 px-8 py-8   ">
                  {/* image */}
                  <div className="avatar  mb-4">
                    <div className="w-24 rounded-full">
                      <img src={trainer.profileImage} />
                    </div>
                  </div>
                  {/* body */}
                  <div>
                    {/* name */}
                    <h2 className="card-title justify-center text-[#dde244] text-2xl font-bold font-oswald  capitalize ">
                      {trainer?.fullName}
                    </h2>
                    {/* experience */}
                    <div className="text-center">
                    <span className="text-gray-300  font-roboto">
                      ( {trainer?.yearsOfExperience} years experience )
                    </span>
                    </div>
                    {/* social icon */}
                    <div className="flex justify-center gap-3 mt-5 ">
                      {trainer?.socialIcons?.map((item) => (
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
                    {/* schedule */}
                    <div className="flex justify-center my-5 items-center  ">
                    {/* <FaClock className="mr-4 text-[#dde244] text-2xl" /> */}
                       {
                        trainer?.availableTimeSlot?.map(item=>(
                          <p className=" font-roboto text-gray-300 capitalize mr-2">
                          {item?.day} /
                        </p>
                        ))
                       }
                    </div>
                    {/* button */}
                  <div className="flex justify-center">
                    <Link to={`/trainer/${trainer._id}`}>
                      <Button label={"know more"}></Button>
                    </Link>
                  </div>
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
