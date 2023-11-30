import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllSubscriber = () => {
  const {
    data: subscribers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/subscribers");
      return response.data;
    },
  });

 
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200 font-roboto text-[#dde244]">
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              subscribers?.map((item, index) => (
                <tr className="text-white font-roboto">
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
