import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Dislike from "../Component/Community/Dislike";
import Like from "../Component/Community/Like";
import RouteLabel from "../Shared Component/RouteLabel";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "react-date-range";
import { isSunday, isSaturday, isFriday, getDay } from "date-fns";
import Button from "../Shared Component/Button";
import { FaClock, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const TrainerDetails = () => {
  const trainerDetails = useLoaderData();
  console.log();

  const availableTimeSlot = trainerDetails?.availableTimeSlot;
  const day = [];
  for (const data of availableTimeSlot) {
    if (data.day === "sat") {
      day.push(data.day + "urday");
    } else {
      day.push(data.day + "day");
    }
  }

  console.log(day);
  // get date name::::

  // const [disabledDays, setDisabledDays] = useState({
  //   sunday: false,
  //   monday: false,
  //   tuesday: false,
  //   wednesday: false,
  //   thursday: false,
  //   friday: false,
  //   saturday: false,
  // });

  const handleSelect = (date) => {
    console.log(date);
  };

  // const disabledDay = (date) => {
  //   const dayOfWeek = getDay(date);
  //   return disabledDays[getDayName(dayOfWeek)];
  // }

  const getDayName = (dayOfWeek) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[dayOfWeek];
  };

  // const formatDate = (date) => {
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  const disabledDay = (date) => {
    const dayOfWeek = getDay(date);
    // const availableDays = ["monday", "tuesday", "thursday", "friday"]; // Replace this with your actual available days from the backend
    // const bookedDates = ["2023-12-12", "2023-11-23"];
    // const formattedDate = formatDate(date);
    const today = new Date();
    // today.setHours(0, 0, 0, 0);
    const isUnavailableDay = !day.includes(getDayName(dayOfWeek));
    // const isBookedDate = bookedDates.includes(formattedDate);
    const isBeforeToday = date < today;
    // || isBookedDate || 
    return isUnavailableDay || isBeforeToday;
  };

  return (
    <>
      {/* rounte label */}
      <RouteLabel label={"Read full Blog"}></RouteLabel>
      <div className="container mx-auto px-4 pb-20">
        {/* become a trainer button */}
        <Link to="/newTrainer">
          <Button label={"become a trainer"}></Button>
        </Link>

        <div className="grid grid-cols-2 gap-10 justify-center items-start">
          {/* trainer profile  */}

          <div>
            {trainerDetails && (
              <div className="card items-start bg-base-100  mt-10 rounded-none">
                <figure>
                  <img src={trainerDetails.profileImage} alt="Shoes" />
                </figure>
                <div className="card-body px-0">
                  <div className="flex gap-3  items-end">
                    <h2 className="card-title text-4xl text-white font-oswald capitalize">
                      {trainerDetails?.fullName}
                    </h2>
                    <span className="text-gray-300 font-roboto">
                      ( {trainerDetails?.yearsOfExperience} years experience )
                    </span>
                    <span className="text-gray-300 font-roboto">
                      ( Age:{trainerDetails?.age} )
                    </span>
                  </div>
                  <div className=" mb-4 mt-2 badge badge-outline w-fit rounded-none px-5 py-3 border-[#dde244] font-medium uppercase text-[#dde244]">
                    {trainerDetails?.specialization}
                  </div>
                  <div className="flex gap-3  ">
                    {trainerDetails.socialIcons.map((item) => (
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
                  <div className="mt-10">
                    {trainerDetails.skills?.map((item) => (
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
                </div>
              </div>
            )}
          </div>

          {/* calender  */}
          <div className=" flex flex-col justify-center">
            <div className="flex gap-4 items-center my-3">
              <FaClock className=" text-2xl" />
              <span className="font-roboto text-[#dde244]">Available on : </span>
              <div className="flex justify-start items-center  ">
                {trainerDetails?.availableTimeSlot?.map((item) => (
                  <p className=" font-roboto text-[#dde244]  capitalize mr-2">
                    {item?.day} ,
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center my-3">
              <FaClock className=" text-2xl" />
              <div className="flex justify-start items-center  ">
                <p className=" font-roboto text-[#dde244]  capitalize mr-2">
                  Weekly available : {trainerDetails?.weeklyAvailableTime} slot
                </p>
              </div>
            </div>
            <Calendar
              className="mt-5"
              date={new Date()}
              disabledDay={disabledDay}
              onChange={handleSelect}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerDetails;
