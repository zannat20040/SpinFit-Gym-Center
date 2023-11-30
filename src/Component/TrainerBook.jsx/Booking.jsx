import React, { useEffect, useState } from "react";
import RouteLabel from "../../Shared Component/RouteLabel";
import axios from "axios";
import TrainerDetails from "../../Layout/TrainerDetails";
import Button from "../../Shared Component/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation, useParams } from "react-router-dom";
import usersData from "../../Custom hooks/usersData";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";

const Booking = () => {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const email = searchParams.get("email");
  
  const {data:userInfo} = usersData()

  const [pricing, setPricing] = useState([]);
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

  const HandleJoinNow=(planName,planPrice)=>{
    const packageData = {
      bookingUser: userInfo.name,
      userEmail: userInfo.email,
      bookingDate: date ,
      bookingTime: time ,
      packagePrice: planPrice ,
      packagePame: planName ,
      trainerName: email ,
    }
    console.log(packageData)

    axios
    .post("http://localhost:5000/bookings", packageData)
    .then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        swal(
          "Congratulations!",
          "Trainer booked successfully",
          "success"
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });


  }
  return (
    <div>
      <Helmet>
        <title>SpinFit | Booking</title>
      </Helmet>
      <RouteLabel label={"Book you package now"}></RouteLabel>
      <div className="container mx-auto px-4 pb-32">
        <div className="flex gap-10  justify-center">
          {pricing.map((item, index) => (
            <div className="card  bg-gray-900 rounded-none ">
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
                <div className="card-actions justify-center w-full mt-7">
                  <button onClick={()=>HandleJoinNow(item.name,item.price)} className="uppercase tracking-widest text-black btn border-none btn-outline bg-[#dde244] rounded-none w-full">
                    <span className="mr-6">Join now</span>
                    <FaArrowRightLong></FaArrowRightLong>
                  </button>
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
