import React, { useEffect, useState } from "react";
import usersData from "../../Custom hooks/usersData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Allmember = () => {
  const { data: userInfo } = usersData();
  const [myMember, setMyMember] = useState();
  const {
    data: allmembers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allmembers"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/bookings");
      return response.data;
    },
  });

  console.log(allmembers);
  useEffect(() => {
    if (allmembers) {
      const data = allmembers.filter(
        (item) => item.trainerName === userInfo.email
      );
      setMyMember(data);
    }
  }, [allmembers]);

  console.log(myMember);
  return (
    <div>
      <Helmet>
        <title>SpinFit | all member</title>
      </Helmet>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-200 font-roboto text-[#dde244]">
                <th>No.</th>
                <th>Name</th>
                <th>Booking date</th>
                <th>Booking time</th>
                <th>Package</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myMember?.map((item, index) => (
                <tr className="text-white font-roboto">
                  <th>{index + 1}</th>
                  <td>{item?.bookingUser}</td>
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

export default Allmember;
