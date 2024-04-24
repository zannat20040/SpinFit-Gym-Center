import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../Common/PageTitle";
import { useQuery } from "@tanstack/react-query";
import usersData from "../../Custom hooks/usersData";
import axios from "axios";
import { FaCalendarDays } from "react-icons/fa6";
import SlotModal from "./SlotModal";

const ManageSlot = () => {
  const { data: userInfo } = usersData();
  const {
    data: mySlots,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/application/${userInfo?.email}`
      );
      return response.data;
    },
  });

  // Toggle State and Function
  const [isActive, setIsActive] = useState(null);
  const [modalInfo, setModalInfo] = useState(null);

  const handleToggle = (idx) => {
    setIsActive((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const formatTime = (hour, minute) => {
    let formattedHour = hour % 12 || 12; // Ensure hour is in 1-12 range
    const amOrPm = hour < 12 ? "AM" : "PM"; // Determine AM or PM
    const formattedMinute = minute?.toString().padStart(2, "0"); // Add leading zero if minute is less than 10
    formattedHour = formattedHour < 10 ? `0${formattedHour}` : formattedHour; // Add leading zero if hour is less than 10
    return `${formattedHour}:${formattedMinute} ${amOrPm}`;
  };

  const HandleSlotModal = (i, day, startTime, endTime) => {
    document.getElementById(`my_modal_${i}`).showModal();
    setModalInfo({ day, startTime, endTime });
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>SpinFit | Manage class</title>
      </Helmet>
      <PageTitle title={"Manage slot"} />
      <div
        className={`my-10 overflow-hidden ${
          isActive === mySlots?.availableTimeSlot?.length - 1 ? "" : ""
        }`}
      >
        {mySlots &&
          mySlots?.availableTimeSlot?.map((dayData, idx) => {
            const slots = [];
            const [startingHour, startingMinute] = mySlots?.startingTime
              .split(":")
              .map((part) => parseInt(part)); // Extract starting hour and minute
            for (let i = 0; i < parseInt(dayData.slot); i++) {
              const startTimeHour = startingHour + i; // Calculate start hour
              const amOrPm = startTimeHour < 12 ? "AM" : "PM"; // Determine AM or PM
              const startTime = formatTime(startTimeHour, startingMinute); // Format start time
              const endTimeHour = startTimeHour + 1; // Calculate end hour
              const endTime = formatTime(endTimeHour, startingMinute); // Format end time
              slots.push(
                <div
                  key={i}
                  className="w-full text-white py-4 pl-16 pr-4 transition-all duration-500  hover:bg-slate-700 border-l-4  border-white hover:border-[#dde244] font-roboto flex justify-between items-center"
                >
                  <span>
                    <span className="font-bold"> Slot no. {i + 1} :</span>{" "}
                    {`${startTime} - ${endTime}`}
                  </span>
                  <button
                    onClick={() =>
                      HandleSlotModal(i, dayData.day, startTime, endTime)
                    }
                    className=" uppercase  tracking-widest text-black btn-md border-none btn-outline bg-[#dde244] rounded"
                  >
                    <span className="">See details</span>{" "}
                  </button>

                  <dialog id={`my_modal_${i}`} className="modal">
                    <div className="modal-box rounded p-10">
                      <h3 className="font-bold text-3xl text-[#dde244] mb-6 text-center ">
                        See who booked this Slot
                      </h3>
                      {modalInfo && <SlotModal modalInfo={modalInfo} />}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              );
            }
            return (
              <div key={idx}>
                <div
                  onClick={() => handleToggle(idx)}
                  className="relative flex cursor-pointer items-center gap-6 bg-slate-800 p-5"
                >
                  <FaCalendarDays className="text-[#dde244]" />
                  <h5 className="text-white font-medium uppercase font-roboto tracking-widest">
                    {dayData?.day}
                  </h5>
                  <span className="w-0 h-0 border-b-[15px] border-b-[#dde244] border-r-[15px] border-r-transparent absolute -bottom-[7px] left-10 -rotate-45"></span>
                </div>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive === idx
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">{slots}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManageSlot;
