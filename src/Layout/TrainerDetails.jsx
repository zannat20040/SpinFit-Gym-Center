import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import RouteLabel from "../Shared Component/RouteLabel";
import { Calendar } from "react-date-range";
import { getDay } from "date-fns";
import Button from "../Shared Component/Button";
import {
  FaArrowRightLong,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
  const trainerDetails = useLoaderData();
  const [allSlotTime, setAllSlotTime] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [enableBooking, setEnableBooking] = useState(false);

  const availableTimeSlot = trainerDetails?.availableTimeSlot;
  const day = [];
  for (const data of availableTimeSlot) {
    day.push(data.day);
  }

  const formatTime = (time) =>
    time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    const selectedDayName = getDayName(getDay(date));
    const getTimeSlot = trainerDetails?.availableTimeSlot;
    for (let item of getTimeSlot) {
      if (item.day === selectedDayName) {
        const slot = item.slot;
        const startingTime = new Date(
          `2023-01-01T${trainerDetails.startingTime}:00`
        );

        const slotDuration = 60 * 60 * 1000;

        const timeSlots = Array.from({ length: slot }, (_, index) => {
          const slotStartTime = new Date(
            startingTime.getTime() + index * slotDuration
          );
          const slotEndTime = new Date(slotStartTime.getTime() + slotDuration);

          return {
            start: formatTime(slotStartTime),
            end: formatTime(slotEndTime),
          };
        });
        setAllSlotTime(timeSlots);
      }
    }
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      setEnableBooking(true);
      // console.log(enableBooking);
    } else {
      setEnableBooking(false);
    }
  }, [selectedDate, selectedTime]);

  // console.log(selectedDate, selectedTime);

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

  const disabledDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 for accurate date comparison
    const dayOfWeek = getDay(date);
    const isUnavailableDay = !day.includes(getDayName(dayOfWeek));
    const isBeforeToday = date < today;
    return isUnavailableDay || isBeforeToday;
  };

  return (
    <>
      {/* rounte label */}
      <RouteLabel label={"Read full Blog"}></RouteLabel>
      <Helmet>
        <title>SpinFit | Trainer details</title>
      </Helmet>
      <div className="container mx-auto px-4 pb-20">
        {/* become a trainer button */}
        <Link to="/newTrainer">
          <Button label={"become a trainer"}></Button>
        </Link>

        <div className="grid grid-cols-2 mt-10 gap-20 justify-center items-start">

          {/* left side   */}
          <div className="flex ">
            {trainerDetails && (
              <div className="card items-start w-full justify-start bg-base-100  mt-10 rounded-none py-5  text-lg">
                <div className="card-body w-full px-0">
                  <div className=" flex flex-col items-start gap-2">
                    {/* full name */}
                    <h2 className="card-title text-4xl text-[#dde244] font-oswald capitalize">
                      {trainerDetails?.fullName}
                    </h2>
                    {/* experience */}
                    <span className="text-gray-300 font-roboto">
                      Experience: {trainerDetails?.yearsOfExperience}+
                    </span>
                    {/* age */}
                    <span className="text-gray-300 font-roboto">
                      Age:{trainerDetails?.age}
                    </span>
                  </div>
                  {/* about me */}
                  <div>
                    <h2 className=" font-oswald text-3xl text-[#dde244] font-medium tracking-wider ">
                      About Me
                    </h2>
                    <p className="font-roboto text-gray-300">
                      {trainerDetails?.bio}
                    </p>
                  </div>
                  {/* skills */}
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
                  {/* booking time */}
                  <div className="form-control w-full my-6">
                    <label className="label">
                      <span className="label-text text-white font-roboto">
                        Book Your time
                      </span>
                    </label>
                    <select
                      className="select select-bordered rounded-none z-50"
                      name="category"
                      value={selectedTime || ""}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option disabled selected>
                        Select your time
                      </option>
                      {allSlotTime.map((slot, index) => (
                        <option value={`${slot.start} - ${slot.end}`}>
                          {slot.start} - {slot.end}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* button */}
                  {enableBooking ? (
                    <Link
                      to={`/booknow?date=${selectedDate}&time=${selectedTime}&email=${trainerDetails.email}`}
                      className="w-full"
                    >
                      <button className="uppercase tracking-widest w-full text-black btn border-none btn-outline bg-[#dde244] rounded-none">
                        <span className="mr-6">get you package</span>{" "}
                        <FaArrowRightLong></FaArrowRightLong>
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="uppercase tracking-widest w-full text-black btn border-none btn-outline bg-[#dde244] rounded-none"
                    >
                      <span className="mr-6">get you package</span>{" "}
                      <FaArrowRightLong></FaArrowRightLong>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* right side  */}
          <div className=" flex flex-col justify-centerend items-end">
            {/* image */}
            <figure className="w-full">
              <img
                src={trainerDetails.profileImage}
                alt="Shoes"
                className="w-full"
              />
            </figure>
            {/* specialization */}
            <div className=" mb-4 mt-2 badge badge-outline w-fit rounded-none px-5 py-3 border-[#dde244] font-medium uppercase text-[#dde244]">
              {trainerDetails?.specialization}
            </div>
            {/* starting time */}
            <div className="flex gap-4 items-center my-1">
              {/* <FaClock className="  text-[#dde244] text-2xl" /> */}
              <p className=" font-roboto text-[#dde244]  capitalize mr-2">
                Starting time : {trainerDetails?.startingTime}
              </p>
            </div>
            {/* available on */}
            <div className="flex gap-4 items-center my-1">
              {/* <FaClock className=" text-2xl text-[#dde244] " /> */}
              <span className="font-roboto text-[#dde244]">
                Available on :{" "}
              </span>
              <div className="flex justify-start items-center  ">
                {trainerDetails?.availableTimeSlot?.map((item) => (
                  <p className=" font-roboto text-[#dde244]  capitalize mr-2">
                    {item?.day} /
                  </p>
                ))}
              </div>
            </div>
            {/* time slot */}
            <div className="flex gap-4 items-center my-1">
              {/* <FaClock className=" text-2xl  text-[#dde244] " /> */}
              <div className="flex justify-start items-center  ">
                <p className=" font-roboto text-[#dde244]  capitalize mr-2">
                  Weekly available : {trainerDetails?.weeklyAvailableTime} slot
                </p>
              </div>
            </div>
            {/* calender */}
            <Calendar
              className="mt-5 bg-[#dde2444]"
              date={selectedDate || new Date()}
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
