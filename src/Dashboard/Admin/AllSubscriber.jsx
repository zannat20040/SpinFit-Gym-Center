import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet-async";

const AllSubscriber = () => {
  const {
    data: subscribers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const response = await axios.get(
        "https://server-psi-tawny-84.vercel.app/subscribers"
      );
      return response.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>SpinFit | all subscriber</title>
      </Helmet>

      <div className="overflow-x-auto bg-slate-800 text-white ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-[#dde244] text-center">
              <th className="p-4">No.</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((item, index) => (
              <tr className="hover text-center font-roboto">
                <th>{index + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSubscriber;
