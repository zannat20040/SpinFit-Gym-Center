import React from "react";
import usersData from "../../Custom hooks/usersData";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const SlotModal = ({ modalInfo }) => {
  console.log(modalInfo);

  const { data: userInfo } = usersData();
  const {
    data: getBbookingSlot,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookingsinfo"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/bookings/${userInfo?.email}`
      );
      return response.data;
    },
  });

  // Filter booking data based on modalInfo day and time
  const filteredBookings = getBbookingSlot?.filter((booking) => {
    return (
      booking?.trainingDate.split(",")[0].toLowerCase().toLowerCase() ===
        modalInfo.day.toLowerCase() &&
      booking.trainingTime === modalInfo.startTime + " - " + modalInfo.endTime
    );
  });

  console.log(filteredBookings);
  return (
    <div>
        
    </div>
  );
};

export default SlotModal;
