import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-date-range";

const WeeklySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const {
    data: weekSchedule,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["weekSchedule"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/application?role=trainer"
      );
      return response.data;
    },
    refetchInterval: 1000,
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
  console.log(saturday);
  console.log(sunday);
  console.log(monday);
  console.log(tuesday);
  console.log(wednesday);
  console.log(thursday);
  console.log(friday);

  return (
    <div>
     bg-gray-900 mt-1 p-2 text-center  <div className="overflow-x-auto">
        <table className="table bg-slate-600 p-4 text-center
         rounded-none mt-10">
          <thead className="text-[#dde244]">
            <tr>
              {daysOfWeek.map((day, index) => (
                <th>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-roboto text-white">
            <tr>
              <td>
                {saturday.length < 1 ? 'No trainer available' : saturday.map((sat) => (
                  <span className="flex flex-col capitalize mt-1 p-2 text-center">
                    {sat.trainerName} : {sat.slotRange}
                  </span>
                ))}
              </td>
              <td>
                {sunday.length < 1 ? 'No trainer available' : sunday.map((sat) => (
                  <span className="flex flex-col capitalize mt-1 p-2 text-center">
                    {sat.trainerName} : {sat.slotRange}
                  </span>
                ))}
              </td>
              <td>
                {monday.length < 1 ? 'No trainer available' : saturday.length < 1 ? 'No trainer available' : monday.map((sat) => (
                  <span className="flex flex-col capitalize mt-1 p-2 text-center">
                    {sat.trainerName} : {sat.slotRange}
                  </span>
                ))}
              </td>
              <td>
                {tuesday.length < 1 ? 'No trainer available' : tuesday.map((sat) => (
                  <span className="flex flex-col capitalize mt-1 p-2 text-center">
                    {sat.trainerName} : {sat.slotRange}
                  </span>
                ))}
              </td>
              <td>
                {wednesday.length < 1 ? 'No trainer available' : wednesday.map((sat) => (
                  <span className="flex flex-col capitalize mt-1 p-2 text-center">
                    {sat.trainerName} : {sat.slotRange}
                  </span>
                ))}
              </td>
              <td>
                {thursday.length < 1 ? 'No trainer available' : thursday.map((sat) => (
                  <span className="flex flex-col capitalize mt-1 p-2 text-center">
                    {sat.trainerName} : {sat.slotRange}
                  </span>
                ))}
              </td>
              <td>
                {friday.length < 1 ? 'No trainer available' : friday.map((sat) => (
                  <span className="flex flex-col capitalize mt-1 p-2 text-center">
                    {sat.trainerName} : {sat.slotRange}
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklySchedule;
