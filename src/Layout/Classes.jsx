import { useQuery } from "@tanstack/react-query";
import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import Button from "../Shared Component/Button";
import { Link } from "react-router-dom";
import WeeklySchedule from "../Component/Classes/WeeklySchedule";
import { Helmet } from "react-helmet-async";


const Classes = () => {
  const { isLoading, data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`https://server-psi-tawny-84.vercel.app/classes`);
      return res.json();
    },
  });



  return (
    <div>
      <Helmet>
        <title>SpinFit | Classes</title>
      </Helmet>
      <RouteLabel label={"All classes"}></RouteLabel>
      {isLoading ? (
        <div className="container mx-auto mt-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="container mx-auto px-4 ">
          <div className="lg:grid lg:grid-cols-3 justify-between gap-5 flex flex-col-reverse">
            <div className="grid grid-cols-2 md:grid-cols-3 col-span-2 gap-5">
              {classes?.map((item) => (
                <div
                  className="hero h-40 "
                  style={{ backgroundImage: `url(${item?.photo})` }}
                >
                  <div className="hero-overlay bg-opacity-60"></div>
                  <Link to={`/classes/${item._id}`}>
                    <h1 className="font-oswald text-3xl text-white font-bold text-center">
                      {item?.name}
                    </h1>
                  </Link>
                </div>

               
              ))}
            </div>
            <div>
              <h2 className="card-title text-[#dde244] text-4xl font-bold font-oswald  capitalize ">
                Weekly Schedule
              </h2>
              <WeeklySchedule></WeeklySchedule>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
