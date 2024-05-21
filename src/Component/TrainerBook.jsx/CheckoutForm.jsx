import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const CheckoutForm = ({ price, bookingInfo }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const packageData = { ...bookingInfo, ...price };

    if (packageData.packagePrice != undefined) {
      axios
        .post("https://server-psi-tawny-84.vercel.app/create-payment-intent", packageData)
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => console.log(error));
    }
  }, [price, bookingInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !price.packagePrice) {
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
            name: bookingInfo?.traineeName || "anonymous",
            email: bookingInfo?.traineeEmail || "anonymous",
          },
        },
      });

    if (confirmError) {
      setSuccess("");
      setError(confirmError.message);

    } else {
      if (paymentIntent.status === "succeeded") {
        axios
          .post("https://server-psi-tawny-84.vercel.app/bookings", { ...bookingInfo, ...price })
          .then((res) => {
            setSuccess("Your Trainer booking payment is successfully done");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-oswald text-[#dde244] ">Payment Details</h1>
      <div className="font-roboto my-6 text-white">
        <div className="text-xl">
          <span className="capitalize">
            Your Name : {bookingInfo?.traineeName}
          </span>
        </div>
        <div className="text-xl">
          <span className="">Your Email : {bookingInfo?.traineeEmail}</span>
        </div>
        <div className="text-xl">
          <span className="capitalize">
            Trainer Name : {bookingInfo?.trainerName}
          </span>
        </div>
        <div className="text-xl">
          <span className="">Trainer Email : {bookingInfo?.trainerEmail} </span>
        </div>
        <div className="text-xl">
          <span className="">Slot : {bookingInfo?.trainingTime}</span>
        </div>
        <div className="text-xl">
          <span className="">Date : {bookingInfo?.trainingDate}</span>
        </div>
        <div className="text-xl">
          <span className="">Package : {price?.packageName}</span>
        </div>
        <div className="text-xl">
          <span className="">Price : ${price?.packagePrice}</span>
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
          className="uppercase btn-sm mt-5   tracking-widest text-black btn border-none btn-outline bg-[#dde244] rounded-none"
        >
          Comfirm Payment
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
