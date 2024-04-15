import { CardElement, Elements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import TrainerPayment from "../../Component/TrainerPayment/TrainerPayment";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment);


const AllTrainer = () => {

  const {
    data: trainers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const response = await axios.get(
        "https://server-psi-tawny-84.vercel.app/users"
      );
      return response.data?.filter(trainer => trainer.role === 'trainer');
    },
  });
  // console.log(trainers);



  const isButtonDisabled = (joiningDate) => {
    const currentDate = new Date();
    const joinedDate = new Date(joiningDate);
    const diffInMilliseconds = currentDate - joinedDate;
    const diffInMonths = diffInMilliseconds / (30 * 24 * 60 * 60 * 1000);

    if (diffInMonths >= 1) {
      return false;
    } else {
      return true;
    }
  };
 
  
  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>SpinFit | all trainer</title>
      </Helmet>
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
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="bg-[#dde244] w-full text-black btn"
                  disabled={isButtonDisabled(item?.salaryMonth)}
                  onClick={() =>
                    document.getElementById(`my_modal_${index}`).showModal()
                  }
                >
                  {isButtonDisabled(item?.salaryMonth) ? "Paid" : "Pending"}
                </button>

                <dialog id={`my_modal_${index}`} className="modal">
                  <div className="modal-box p-10 rounded-none ">
                    <h1 className="text-3xl font-oswald text-[#dde244] ">
                      Salary Details
                    </h1>
                    <div className="modal-action ">
                    <Elements stripe={stripePromise}>
                          <TrainerPayment item={item} refetch={refetch} />
                        </Elements>
                    </div>
                  </div>

                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainer;
