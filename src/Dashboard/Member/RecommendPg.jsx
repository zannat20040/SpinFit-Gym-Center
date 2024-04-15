import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Shared Component/Button';
import { Helmet } from 'react-helmet-async';

const RecommendPg = () => {
    const [myRecommended, setMyRecommended] = useState();

    const { isLoading, data: classes } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
          const res = await fetch(`https://server-psi-tawny-84.vercel.app/classes`);
          return res.json();
        },
      });

      useEffect(() => {
        if (classes) {
          const data = classes.filter(
            (item) => item.classDuration <25
          );

          setMyRecommended(data);
        }
      }, [classes]);
    
      // console.log(classes)
    return (
        <div>
          <Helmet>
        <title>SpinFit | Recommended</title>
      </Helmet>
             <div className="grid grid-cols-3 gap-5">
            {myRecommended?.map((item) => (
              <div className="card bg-slate-500 rounded-none text-primary-content">
                <div className="card-body">
                  <h2 className="card-title text-[#dde244] text-3xl font-bold font-oswald  capitalize ">
                    {item?.name}
                  </h2>
                  <span className="capitalize text-gray-300 font-roboto">
                    {item?.trainerName}
                  </span>
                  <span className="text-[#dde244] capitalize border font-roboto px-3 py-1 inline">
                    {item?.category}
                  </span>
                  <p className="font-roboto text-white">{item?.details}</p>
                  <p className="font-roboto text-white">
                    Class Duration:{" "}
                    <span className="text-[#dde244]">
                      {item?.classDuration} minutes
                    </span>
                  </p>

                  <div className="card-actions justify-start">
                    <Link to="/trainer">
                      <Button label={"join now"}></Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
};

export default RecommendPg;