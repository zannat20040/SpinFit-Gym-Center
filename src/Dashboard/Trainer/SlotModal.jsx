import React from "react";
import usersData from "../../Custom hooks/usersData";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const SlotModal = ({ modalInfo }) => {
  const { data: userInfo } = usersData();
  const {
    data: getBbookingSlot,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookingsinfo"],
    queryFn: async () => {
      const response = await axios.get(
        `https://server-psi-tawny-84.vercel.app/bookings/${userInfo?.email}`
      );
      return response.data;
    },
  });

  // Filter booking data based on modalInfo day and time
  const filteredBookings = getBbookingSlot?.filter((booking) => {
    // console.log(booking.trainingTime === modalInfo.startTime + " - " + modalInfo.endTime)
    return (
      booking?.trainingDate.split(",")[0].toLowerCase() ===
        modalInfo.day.toLowerCase() &&
      booking.trainingTime === modalInfo.startTime + " - " + modalInfo.endTime
    );
  });

  return (
    <div>
      {filteredBookings && filteredBookings.length < 1 ? (
        <p className="px-6 py-4 text-center">You don't have any bookings today</p>
      ) : (
        filteredBookings?.map((booking,i) => (
          <div className=" hover:bg-slate-700 py-4 px-6  rounded transition-all duration-200">
            <p>
              <span>{i + 1}. </span>
              {booking?.traineeName}
            </p>
            <p>Booking date: {booking?.trainingDate}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SlotModal;
