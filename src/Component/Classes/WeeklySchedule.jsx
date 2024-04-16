import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const WeeklySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [isToggoling, setIsToggoling] = useState(false);

  const {
    data: weekSchedule,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["weekSchedule"],
    queryFn: async () => {
      const response = await axios.get(
        "https://server-psi-tawny-84.vercel.app/application?role=trainer"
      );
      return response.data;
    },
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    if (weekSchedule) {
      const newSchedules = [];
      weekSchedule?.forEach((data) => {
        const availableTimeSlot = data.availableTimeSlot || [];
        availableTimeSlot?.forEach((slot) => {
          const daySlot = slot.day;
          const slotRange = slot.slot;
          const trainerName = data.fullName;
          newSchedules.push({ daySlot, trainerName, slotRange });
        });
      });
      setSchedules(newSchedules);
    }
  }, [weekSchedule]);

  const saturday = schedules.filter((day) => day.daySlot === "saturday");
  const sunday = schedules.filter((day) => day.daySlot === "sunday");
  const monday = schedules.filter((day) => day.daySlot === "monday");
  const tuesday = schedules.filter((day) => day.daySlot === "tuesday");
  const wednesday = schedules.filter((day) => day.daySlot === "wednesday");
  const thursday = schedules.filter((day) => day.daySlot === "thursday");
  const friday = schedules.filter((day) => day.daySlot === "friday");
  
  const blockElements = {
    content: "tabs-content",
    panel: "tabs-panel",
    label: "tabs-title",
  };

  return (
    <div className="mt-10">
      {/* sat */}
      <div className="collapse  bg-gray-900 rounded-none mb-2">
        <input type="radio" name="my-accordion-2" value="accordian" />
        <div className="collapse-title text-xl font-medium  bg-slate-950 font-oswald text-white mb-4">
          Saturday
        </div>
        <div className="collapse-content ">
          {saturday.length < 1
            ? <span className="font-roboto capitalize ">
            No trainer today
          </span>
            : saturday.map((data) => (
                <div className="px-5 py-4 mb-1 flex gap-2 justify-between bg-gray-800">
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Trainer: {data.trainerName}
                  </span>
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Avaiable Slot: {data.slotRange}
                  </span>
                </div>
              ))}
        </div>
      </div>
      {/* sun */}
      <div className="collapse  bg-gray-900 rounded-none mb-2">
        <input type="radio" name="my-accordion-2" value="accordian" />
        <div className="collapse-title text-xl font-medium  bg-slate-950 font-oswald text-white mb-4">
          Sunday
        </div>
        <div className="collapse-content ">
          {sunday.length < 1
            ? <span className="font-roboto capitalize ">
            No trainer today
          </span>
            : sunday.map((data) => (
                <div className="px-5 py-4 mb-1 flex gap-2 justify-between bg-gray-800">
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Trainer: {data.trainerName}
                  </span>
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Avaiable Slot: {data.slotRange}
                  </span>
                </div>
              ))}
        </div>
      </div>
      {/* mon */}
      <div className="collapse  bg-gray-900 rounded-none mb-2">
        <input type="radio" name="my-accordion-2" value="accordian" />
        <div className="collapse-title text-xl font-medium  bg-slate-950 font-oswald text-white mb-4">
          Monday
        </div>
        <div className="collapse-content ">
          {monday.length < 1
            ?   <span className="font-roboto capitalize ">
            No trainer today
          </span>
            : monday.map((data) => (
                <div className="px-5 py-4 mb-1 flex gap-2 justify-between bg-gray-800">
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Trainer: {data.trainerName}
                  </span>
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Avaiable Slot: {data.slotRange}
                  </span>
                </div>
              ))}
        </div>
      </div>
      {/* tues */}
      <div className="collapse  bg-gray-900 rounded-none mb-2">
        <input type="radio" name="my-accordion-2" value="accordian" />
        <div className="collapse-title text-xl font-medium  bg-slate-950 font-oswald text-white mb-4">
          Tuesday
        </div>
        <div className="collapse-content ">
          {tuesday.length < 1
            ? <span className="font-roboto capitalize ">
            No trainer today
          </span>
            : tuesday.map((data) => (
                <div className="px-5 py-4 mb-1 flex gap-2 justify-between bg-gray-800">
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Trainer: {data.trainerName}
                  </span>
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Avaiable Slot: {data.slotRange}
                  </span>
                </div>
              ))}
        </div>
      </div>
      {/* wed */}
      <div className="collapse  bg-gray-900 rounded-none mb-2">
        <input type="radio" name="my-accordion-2" value="accordian" />
        <div className="collapse-title text-xl font-medium  bg-slate-950 font-oswald text-white mb-4">
          Wednesday
        </div>
        <div className="collapse-content ">
          {wednesday.length < 1
            ? <span className="font-roboto capitalize ">
            No trainer today
          </span>
            : wednesday.map((data) => (
                <div className="px-5 py-4 mb-1 flex gap-2 justify-between bg-gray-800">
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Trainer: {data.trainerName}
                  </span>
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Avaiable Slot: {data.slotRange}
                  </span>
                </div>
              ))}
        </div>
      </div>
      {/* thurs */}
      <div className="collapse  bg-gray-900 rounded-none mb-2">
        <input type="radio" name="my-accordion-2" value="accordian" />
        <div className="collapse-title text-xl font-medium  bg-slate-950 font-oswald text-white mb-4">
          Thursday
        </div>
        <div className="collapse-content ">
          {thursday.length < 1
            ? <span className="font-roboto capitalize ">
            No trainer today
          </span>
            : thursday.map((data) => (
                <div className="px-5 py-4 mb-1 flex gap-2 justify-between bg-gray-800">
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Trainer: {data.trainerName}
                  </span>
                  <span className="flex flex-col font-roboto text-white capitalize ">
                    Avaiable Slot: {data.slotRange}
                  </span>
                </div>
              ))}
        </div>
      </div>
      {/* fri */}
      <div className="collapse  bg-gray-900 rounded-none mb-2">
        <input type="radio" name="my-accordion-2" value="accordian" />
        <div className="collapse-title text-xl font-medium  bg-slate-950 font-oswald text-white mb-4">
          Friday
        </div>
        <div className="collapse-content ">
          {friday.length < 1 ? (
            <span className="font-roboto capitalize ">
            No trainer today
          </span>
          ) : (
            friday.map((data) => (
              <div className="px-5 py-4 mb-1 flex gap-2 justify-between bg-gray-800">
                <span className="flex flex-col font-roboto text-white capitalize ">
                  Trainer: {data.trainerName}
                </span>
                <span className="flex flex-col font-roboto text-white capitalize ">
                  Avaiable Slot: {data.slotRange}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
