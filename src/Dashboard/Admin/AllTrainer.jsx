import { CardElement, Elements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import TrainerPayment from "../../Component/TrainerPayment/TrainerPayment";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

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
      return response.data?.filter((trainer) => trainer.role === "trainer");
    },
  });

  const [remainingBalance, setRemainingBalance] = useState(0);

  // Fetch remaining balance from backend when the component mounts
  useEffect(() => {
    const fetchRemainingBalance = async () => {
      const response = await axios.get("http://localhost:5000/balance");
      setRemainingBalance(response.data.totalRemainingBalance);
    };
    fetchRemainingBalance();
  }, []);

  // Check if the remaining balance is greater than the payment amount
  const isPaymentAllowed = (paymentAmount) => {
    return remainingBalance >= paymentAmount;
  };

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

  const handlePaymentButtonClick = (index, salaryMonth) => {
    if (isPaymentAllowed(salaryMonth)) {
      document.getElementById(`my_modal_${index}`).showModal();
    } else {
      toast.success("Payment is not allowed because of insufficient balance.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>SpinFit | all trainer</title>
      </Helmet>

      <div className="overflow-x-auto bg-slate-800 text-white ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-[#dde244] text-center">
              <th className="p-6">No.</th>
              <th className="p-6">Name</th>
              <th className="p-6">Email</th>
              <th className="p-6">Joining Date</th>
              <th className="p-6">Salary</th>
            </tr>
          </thead>
          <tbody>
           
          {trainers?.map((item, index) => (
            <tr className="hover text-center font-roboto">
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
                    handlePaymentButtonClick(index, item?.salaryMonth)
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
   
    </div>
  );
};

export default AllTrainer;
