import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
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
import usersData from "../Custom hooks/usersData";

const TrainerDetails = () => {
  const { data: userInfo } = usersData();

  const trainerDetails = useLoaderData();
  const [allSlotTime, setAllSlotTime] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [enableBooking, setEnableBooking] = useState(false);

  const navigate =useNavigate()
  // slot day get
  const availableTimeSlot = trainerDetails?.availableTimeSlot;
  const day = [];
  for (const data of availableTimeSlot) {
    day.push(data.day);
  }

  // slot time formate
  const formatTime = (time) =>
    time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // date select with slot time handle
  const handleSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    const selectedDayName = getDayName(getDay(date));
    const getTimeSlot = trainerDetails?.availableTimeSlot;
    for (let item of getTimeSlot) {
      if (item.day === selectedDayName) {
        const slot = item.slot;
        const startingTime = new Date(
          `2024-01-01T${trainerDetails.startingTime}:00`
        );

        const slotDuration = 60 * 60 * 1000;

        const allSlotTime = [];

        for (let index = 0; index < slot; index++) {
          const slotStartTime = new Date(
            startingTime.getTime() + index * slotDuration
          );
          const slotEndTime = new Date(slotStartTime.getTime() + slotDuration);

          allSlotTime.push({
            start: formatTime(slotStartTime),
            end: formatTime(slotEndTime),
          });
          setAllSlotTime(allSlotTime);
        }
      }
    }
  };

  // button enable & disable
  useEffect(() => {
    if (selectedDate && selectedTime) {
      setEnableBooking(true);
    } else {
      setEnableBooking(false);
    }
  }, [selectedDate, selectedTime]);


  // get slot day
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

  // calender date disable
  const disabledDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 for accurate date comparison
    const dayOfWeek = getDay(date);
    const isUnavailableDay = !day.includes(getDayName(dayOfWeek));
    const isBeforeToday = date < today;
    return isUnavailableDay || isBeforeToday;
  };

  // booking information
  const HandleBook = (name, email) => {
    const bookingdetails = {
      trainerName: name,
      trainerEmail: email,
      traineeName: userInfo.name,
      traineeEmail: userInfo.email,
      trainingDate: selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ,
      trainingTime:selectedTime
    };

    navigate('/booknow', { state: { bookingdetails } })
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
          <Button label={"be a trainer"}></Button>
        </Link>

        <div className="flex flex-col-reverse lg:grid  lg:grid-cols-2 mt-10 gap-0 lg:gap-20 justify-center items-start">
          {/* left side   */}
          <div className="w-full ">
            {trainerDetails && (
              <div className="card items-start w-full justify-start bg-base-100 mt-10 rounded-none py-5  text-lg">
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
                  <div className="mt-10 w-full">
                    {trainerDetails.skills?.map((item) => (
                      <>
                        <p className="capitalize text-gray-300 font-roboto">
                          {item?.skill}
                        </p>
                        <progress
                          className="progress w-full "
                          value={item?.value}
                          max="100"
                        ></progress>
                      </>
                    ))}
                  </div>
                  {/* calender */}
                  <Calendar
                    className="mt-5 w-full  overflow-x-scroll"
                    date={selectedDate || new Date()}
                    disabledDay={disabledDay}
                    onChange={handleSelect}
                    width={100}
                  />
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
                    <button
                      className="uppercase tracking-widest w-full text-black btn border-none btn-outline bg-[#dde244] rounded-none"
                      onClick={() =>
                        HandleBook(
                          trainerDetails.fullName,
                          trainerDetails.email
                        )
                      }
                    >
                      <span className="mr-6">get you package</span>{" "}
                      <FaArrowRightLong></FaArrowRightLong>
                    </button>
                  ) : (
                    // <Link
                    //   to={`/booknow?date=${selectedDate}&time=${selectedTime}&email=${trainerDetails.email}`}
                    //   className="w-full"
                    // >

                    // </Link>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerDetails;
