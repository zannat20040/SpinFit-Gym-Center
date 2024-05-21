import React, { useEffect, useState } from "react";
import usersData from "../../Custom hooks/usersData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import PageTitle from "../Common/PageTitle";
import { Link } from "react-router-dom";

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
      const response = await axios.get(`https://server-psi-tawny-84.vercel.app/bookings/${userInfo?.email}`);
      return response.data;
    },
  });


  console.log(allmembers)
  return (
    <div className="container mx-auto h-screen">
      <Helmet>
        <title>SpinFit | all member</title>
      </Helmet>
      <PageTitle title={'your trainee'}></PageTitle>

      <div className="overflow-x-auto bg-slate-800 text-white ">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center font-roboto text-[#dde244]">
                <th className="p-6">No.</th>
                <th className="p-6">Name</th>
                <th className="p-6">Booking date</th>
                <th className="p-6">Booking time</th>
                <th className="p-6">Package</th>
                <th className="p-6">Price</th>
                <th className="text-center p-6 ">Email Instruction</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allmembers?.map((item, index) => (
                <tr className="hover text-center font-roboto">
                  <th className="p-4">{index + 1}</th>
                  <td className="p-4">{item?.traineeName}</td>
                  <td className="p-4">{item?.trainingDate}</td>
                  <td className="p-4">{item?.trainingTime}</td>
                  <td className="p-4">{item?.packageName}</td>
                  <td className="p-4">${item?.packagePrice}</td>
                  <td className="text-center p-4"><a href={`mailto:${item?.traineeEmail}`}><span  className="bg-[#dde244] rounded text-black p-1 px-3 ">send</span></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Allmember;
