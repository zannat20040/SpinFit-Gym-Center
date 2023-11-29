import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Dislike from "../Component/Community/Dislike";
import Like from "../Component/Community/Like";
import RouteLabel from "../Shared Component/RouteLabel";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from 'react-date-range';
import { isSunday, isSaturday, isFriday,getDay  } from 'date-fns';
import Button from "../Shared Component/Button";

const TrainerDetails = () => {
  const params = useParams();
  console.log(params)
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


  // get date name::::

  const [disabledDays, setDisabledDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const handleSelect = (date) => {
    console.log(date);
  }

  // const disabledDay = (date) => {
  //   const dayOfWeek = getDay(date);
  //   return disabledDays[getDayName(dayOfWeek)];
  // }

  const getDayName = (dayOfWeek) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayOfWeek];
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  const disabledDay = (date) => {
    const dayOfWeek = getDay(date);
    const availableDays = [ 'monday', 'tuesday',  'thursday', 'friday', ]; // Replace this with your actual available days from the backend
    const bookedDates = ['2023-12-12', '2023-11-23'];
    const formattedDate = formatDate(date)
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  const isUnavailableDay = !availableDays.includes(getDayName(dayOfWeek));
  const isBookedDate = bookedDates.includes(formattedDate);
  const isBeforeToday = date < today;
    return isUnavailableDay || isBookedDate ||  isBeforeToday;
  }

  return (
    <>
      <RouteLabel label={"Read full Blog"}></RouteLabel>
      <div className="container mx-auto px-4 pb-20">
        
       <Calendar
        date={new Date()}
        disabledDay={disabledDay}
        onChange={handleSelect}
      />
      <Link to='/newTrainer'><Button label={'become a trainer'}></Button></Link>
      </div>
    </>
  );
};

export default TrainerDetails;
