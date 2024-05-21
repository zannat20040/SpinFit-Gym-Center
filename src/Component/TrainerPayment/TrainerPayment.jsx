import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";

const TrainerPayment = ({ item,refetch }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const { _id, roleAssignmnetDate, ...itemWithoutId } = item;

  
  useEffect(() => {
    const paymentInfo = { ...itemWithoutId, salary: 1000 };
    if (item) {
      axios
        .post("https://server-psi-tawny-84.vercel.app/salary-payment-intent", paymentInfo)
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => console.log(error));
    }
  }, [item]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !item.email) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.

      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      setError("");
    }

    // confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: item?.name || "anonymous",
            email: item?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setSuccess("");
      setError(confirmError.message);

    } else {
      if (paymentIntent.status === "succeeded") {
        axios
          .post("https://server-psi-tawny-84.vercel.app/salaries", { ...itemWithoutId, salary: 1000 })
          .then((res) => {
            
            const currentDate = new Date().toISOString().split('T')[0];
            axios.patch(`https://server-psi-tawny-84.vercel.app/users?email=${itemWithoutId?.email}`, {
                salaryMonth: currentDate,
            })
            .then((res) => {
              refetch()
            })
            .catch((error) => {
              console.log("Error updating salary date:", error);
            });

            setSuccess("Your Trainer salary payment is successfully done");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="font-roboto my-6 text-white">
        <div className="text-xl">
          <span className="capitalize">Trainer Name : {item?.name}</span>
        </div>
        <div className="text-xl">
          <span className="">Trainer Email : {item?.email}</span>
        </div>
        <div className="text-xl">
          <span className="">Salary Date : {item?.salaryMonth}</span>
        </div>

        <div className="text-xl">
          <span className="">Salary : 1000$</span>
        </div>
      </div>
      <CardElement
        className="text-white input-bordered input p-3 rounded-none"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "white",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error != "" && <p className="font-roboto my-2">{error}</p>}
      {success != "" && (
        <p className="text-[#dde244] font-roboto my-2">{success}</p>
      )}

      <div className="text-right">
        <button
          disabled={!stripe || !clientSecret}
          type="submit"
          className="w-full uppercase btn mt-2   tracking-widest text-black rounded border-none btn-outline bg-[#dde244] "
        >
         Pay $1000
        </button>
      </div>
    </form>
  );
};

export default TrainerPayment;
