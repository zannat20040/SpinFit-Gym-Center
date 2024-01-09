import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import usersData from "../../Custom hooks/usersData";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutForm = ({ price }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { data: userInfo } = usersData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const email = searchParams.get("email");

  useEffect(() => {
    const packageData = {
      bookingUser: userInfo.name,
      userEmail: userInfo.email,
      bookingDate: date,
      bookingTime: time,
      packagePrice: price.packagePrice,
      packageName: price.packageName,
      trainerName: email,
    };
    console.log(packageData);

    if (packageData.packagePrice != undefined) {
      axios
        .post("http://localhost:5000/create-payment-intent", packageData)
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => console.log(error));
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("hello");

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
      //   console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userInfo?.name || "anonymous",
            email: userInfo?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setSuccess("");
      console.log("error payment intent", confirmError.message);
    } else {
      // console.log('Payment Intent',paymentIntent)
      if (paymentIntent.status === "succeeded") {
        setSuccess("Your Trainer booking payment is successfully done");
        console.log("Payment success. Transaction ID : ", paymentIntent?.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="text-white"
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
      {error != "" && (
        <p className="font-medium my-2">{error}</p>
      )}
      {success != "" && (
        <p className="text-[#dde244] font-medium my-2">{success}</p>
      )}

      <div className="text-right">
        <button
          disabled={!stripe || !clientSecret}
          type="submit"
          className="uppercase btn-sm mt-10   tracking-widest text-black btn border-none btn-outline bg-[#dde244] rounded-none"
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
