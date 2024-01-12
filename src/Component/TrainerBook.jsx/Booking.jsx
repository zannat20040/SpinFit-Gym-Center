import React, { useEffect, useState } from "react";
import RouteLabel from "../../Shared Component/RouteLabel";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation} from "react-router-dom";
import usersData from "../../Custom hooks/usersData";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment);

const Booking = () => {

  const location = useLocation()
  const bookingInfo = location.state.bookingdetails

  const [pricing, setPricing] = useState([]);
  const [price, setPrice] = useState([]);

  useEffect(() => {
    axios
      .get("./pricing.json")
      .then((res) => {
        setPricing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleJoinNow = async (planName, planPrice) => {
    document.getElementById("my_modal_2").showModal();

    const priceInfo = {
      packagePrice: planPrice,
      packageName: planName,
    };
    setPrice(priceInfo);
  };

  return (
    <div>
      <Helmet>
        <title>SpinFit | Booking</title>
      </Helmet>
      <RouteLabel label={"Book you package now"}></RouteLabel>
      <div className="container mx-auto px-4 pb-32">
        <div className="flex gap-10  justify-center">
          {pricing.map((item, index) => (
            <div className="card  bg-gray-900 rounded-none " key={index}>
              <div className=" bg-[#dde244] ">
                <h2 className="card-title text-4xl py-2font-oswald capitalize text-black justify-center py-12 px-5">
                  {item.name}
                </h2>
              </div>
              <div className="card-body px-0 pt-0 pb-0">
                <p className="capitalize flex-grow-0 text-gray-300 font-roboto text-5xl text-center bg-[#dde24459] py-4">
                  ${item?.price} <span className="text-basel">/month</span>
                </p>
                <div className="px-10 flex-grow">
                  {item?.features?.map((feature) => (
                    <p className=" font-roboto  capitalize mr-2 text-center text-lg  mt-3">
                      {feature}
                    </p>
                  ))}
                </div>
                <div className="bg-[#dde24463]  ">
                  <p className="capitalize text-lg font-oswald flex-grow text-gray-300 text-center  py-4">
                    <span className=" capitalize text-lg font-oswald flex-grow text-gray-300 text-center  py-4">
                      You will get
                    </span>
                  </p>
                </div>
                <div className="px-10 flex-grow">
                  {item?.classes?.map((classes) => (
                    <p className=" text-slate-400 capitalize mr-2 text-center text-lg font-roboto font-normal mt-3">
                      {classes}
                    </p>
                  ))}
                </div>
                <div className="card-actions  justify-center w-full mt-7">
                  {/* Open the modal using document.getElementById('ID').showModal() method */}

                  <button
                    onClick={() => HandleJoinNow(item.name, item.price)}
                    className="uppercase tracking-widest text-black btn border-none btn-outline bg-[#dde244] rounded-none w-full"
                  >
                    <span className="mr-6">Join now</span>
                    <FaArrowRightLong></FaArrowRightLong>
                  </button>
                  <dialog id="my_modal_2" className="modal  ">
                    <div className="modal-box rounded-none p-10">
                      <Elements stripe={stripePromise}>
                        
                        {bookingInfo && (
                          <CheckoutForm
                            price={price}
                            bookingInfo={bookingInfo}
                          />
                        )}
                      </Elements>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
