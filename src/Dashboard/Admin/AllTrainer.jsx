import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllTrainer = () => {
  const {
    data: trainers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/users");
      return response.data;
    },
  });
  console.log(trainers);

  const isButtonDisabled = (joiningDate) => {
    const currentDate = new Date();
    const joinedDate = new Date(joiningDate);
    const diffInMonths =
      (currentDate.getFullYear() - joinedDate.getFullYear()) * 12 +
      (currentDate.getMonth() - joinedDate.getMonth());

    return diffInMonths < 1;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-200 font-roboto text-[#dde244]">
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joining Date</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {trainers?.map((item, index) => (
            <tr className="text-white font-roboto">
              <th>{index + 1}</th>
              <td className="capitalize">{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.roleAssignmnetDate}</td>
              <td>
                <button
                  className="bg-[#dde244] text-black btn"
                  disabled={isButtonDisabled(item?.roleAssignmnetDate)}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainer;
