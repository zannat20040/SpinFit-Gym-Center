import React, { useEffect, useState } from "react";
import usersData from "../../Custom hooks/usersData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import PageTitle from "../Common/PageTitle";

const Activity = () => {
  const { data: userInfo } = usersData();
  const [myFilteredBooking, setMyFilteredBooking] = useState();
  const {
    data: myBookings,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const response = await axios.get(
        `https://server-psi-tawny-84.vercel.app/bookings?traineeEmail=${userInfo?.email}`
      );
      return response.data;
    },
  });

  console.log(myBookings);

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateParts = dateString.split(", ");
    const monthIndex = months.indexOf(dateParts[1].split(" ")[0]);
    // const monthIndex =
    console.log(
      "date part:=======> ",
      dateParts,
      "month index:=======> ",
      monthIndex
    );
    return `${dateParts[2]}-${monthIndex + 1 < 10 ? "0" : ""}${
      monthIndex + 1
    }-${dateParts[1].split(" ")[1]}`;
  };

  useEffect(() => {
    if (myBookings) {
      const currentDate = new Date().toISOString().split("T")[0];
      const filteredBookings = myBookings.filter(
        (booking) => currentDate === formatDate(booking.trainingDate)
      );
      setMyFilteredBooking(filteredBookings);
    }
  }, [myBookings]);

  console.log(myFilteredBooking);

  return (
    <div className="container mx-auto h-screen">
      <Helmet>
        <title>SpinFit | Activity</title>
      </Helmet>
      <PageTitle title={"Today's Activity"}></PageTitle>
      <div className="overflow-x-auto bg-slate-800 text-white ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center font-roboto text-[#dde244]">
              <th className="p-6">No.</th>
              <th className="p-6">Trainer Name</th>
              <th className="p-6">Trainer Email</th>
              <th className="p-6">Booking date</th>
              <th className="p-6">Booking time</th>
              <th className="p-6">Package</th>
              <th className="p-6">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myFilteredBooking && myFilteredBooking.length <1 ? <p>You don't have any class today</p>: myFilteredBooking?.map((item, index) => (
              <tr className="hover text-center font-roboto className='p-4'">
                <th className='p-4'>{index + 1}</th>
                <td className='p-4'>{item?.trainerName}</td>
                <td className='p-4'>{item?.trainerEmail}</td>
                <td className='p-4'>{formatDate(item.trainingDate)}</td>
                <td className='p-4'>{item?.trainingTime}</td>
                <td className='p-4'>{item?.packageName}</td>
                <td className='p-4'>${item?.packagePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
