import { Calendar } from 'react-date-range';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Dislike from "../Component/Community/Dislike";
import Like from "../Component/Community/Like";
import RouteLabel from "../Shared Component/RouteLabel";
import { useQuery } from "@tanstack/react-query";

const TrainerDetails = () => {
  const params = useParams();
  console.log(params)
  const [trainer, setTrainer] = useState();

  const { isLoading, data: trainersdetails } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await fetch("./trainer.json");
      return res.json();
    },
  });

  console.log(trainersdetails)
  const getTrainer = trainersdetails.find(item=>item.id===params.id)
  console.log(getTrainer)

  const handleSelect=(date)=>{
    console.log(date); // native Date object
  }
  render()

  return (
    <>
      <RouteLabel label={"Read full Blog"}></RouteLabel>
      <div className="container mx-auto px-4 pb-20">
        {/* {getTrainer && (
          <div className="card lg:card-side rounded-none ">
            <div className="card-body w-1/2">
              <h2 className="card-title text-4xl text-white font-oswald ">
                {getTrainer?.fullName}
              </h2>
             
            </div>
            <figure className="w-1/2">
              <img  alt="Album" />
            </figure>
          </div>
        )} */}
        <Calendar
        date={new Date()}
        onChange={()=>handleSelect(date)}
      />
      </div>
    </>
  );
};

export default TrainerDetails;
