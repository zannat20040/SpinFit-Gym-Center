import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PaymentTable = () => {

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


      console.log(allBookings)
  return (
    <div className="overflow-x-auto bg-slate-800 text-white mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-[#dde244] text-center">
            <th className="p-6">No.</th>
            <th className="p-6">Trainer Name</th>
            <th className="p-6">Trainee Name</th>
            <th className="p-6">Package Name</th>
            <th className="p-6">Package Price</th>
          </tr>
        </thead>
        <tbody>

            {
                allBookings?.map((booking,index)=>(
                    <tr className="hover text-center">
                    <th>{index+1}</th>
                    <td>{booking?.trainerName}</td>
                    <td>{booking?.traineeName}</td>
                    <td>{booking?.packageName}</td>
                    <td>{booking?.packagePrice}</td>
                  </tr>
                ))
            }
          
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
