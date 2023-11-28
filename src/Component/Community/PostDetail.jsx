import React, { useContext, useEffect, useState } from "react";
import RouteLabel from "../../Shared Component/RouteLabel";
import { useLoaderData, useParams } from "react-router-dom";
import { SlLike, SlDislike } from "react-icons/sl";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Like from "./Like";
import Dislike from "./Dislike";
const PostDetail = () => {
  const params = useParams();
  const {
    data: details,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["updatedLike"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/blog/${params.id}`
      );
      return response.data;
    },
    refetchInterval: 1000,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10 text-center"><span className="loading loading-ring loading-lg"></span></div>
    );
  }


  return (
    <>
      <RouteLabel label={"Read full Blog"}></RouteLabel>
      <div className="container mx-auto px-4 pb-20">
        {details && (
          <div className="card lg:card-side rounded-none ">
            <div className="card-body ">
              <h2 className="card-title text-4xl text-white font-oswald ">
                {details?.postDetail?.title}
              </h2>
              <div className="badge badge-outline w-fit rounded-none px-5 py-3 border-[#dde244] font-medium uppercase text-[#dde244]">
                {details?.badge}
              </div>
              <p>dvibwdvusdv</p>

              <p className="font-roboto">
                Category:{" "}
                <span className="text-[#dde244] capitalize">
                  {details?.postDetail?.category}
                </span>
              </p>
              <p className="font-roboto">
                Post Date:{" "}
                <span className="text-[#dde244]">
                  {details?.postDetail?.date}
                </span>
              </p>
              <div className="flex gap-5 mt-4">
                <div className="flex items-center flex-col gap-2">
                  <Like details={details}></Like>
                  <span className="font-roboto text-white">
                    {details?.like}
                  </span>
                </div>

                <div className="flex items-center flex-col gap-2">
                  <Dislike details={details}></Dislike>
                  <span className="font-roboto text-white">
                    {details?.dislike}
                  </span>
                </div>
              </div>
            </div>
            <figure>
              <img src={details?.postDetail?.image} alt="Album" />
            </figure>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetail;
