import React, { useEffect, useState } from "react";
import usersData from "../../Custom hooks/usersData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Activity = () => {
  const { data: userInfo } = usersData();
  const [myBooking, setMyBooking] = useState();
  const {
    data: allBookings,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/bookings");
      return response.data;
    },
  });

  useEffect(() => {
    if (allBookings) {
      const data = allBookings.filter(
        (item) => item.userEmail === userInfo.email
      );

      const today = new Date();
      console.log(today);
      console.log(data);
      const filterByDate = data.filter((item) => {
        const itemDateString = item.bookingDate.toString().slice(4, 15);
        const todayDateString = today.toString().slice(4, 15);
        return itemDateString === todayDateString;
      });
      setMyBooking(filterByDate);
    }
  }, [allBookings]);

  console.log(myBooking);
  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-200 font-roboto text-[#dde244]">
                <th>No.</th>
                <th>Trainer Email</th>
                <th>Booking date</th>
                <th>Booking time</th>
                <th>Package</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myBooking?.map((item, index) => (
                <tr className="text-white font-roboto">
                  <th>{index + 1}</th>
                  <td>{item?.trainerName}</td>
                  <td>{new Date(item?.bookingDate).toISOString().split('T')[0]}</td>
                  <td>{item?.bookingTime}</td>
                  <td>{item?.packagePame}</td>
                  <td>${item?.packagePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activity;
