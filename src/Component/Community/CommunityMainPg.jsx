import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { SlCalender } from "react-icons/sl";

const CommunityMainPg = ({ forum }) => {
  return (
    <div className="card w-96 bg-gray-500 rounded-none group ">
      <figure className="h-[250px]">
        <img
          src={forum.postDetail?.image}
          alt="Shoes"
          className="group-hover:scale-125  duration-300  transition ease-in-out delay-150"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between flex-wrap gap-3">
          <div className="badge badge-outline w-fit rounded-none px-5 py-3 border-[#dde244] font-medium uppercase text-[#dde244]">
            {forum.postDetail?.category}
          </div>
          <div className="font-medium uppercase text-black flex gap-3 items-center">
            <SlCalender></SlCalender>
            <span>{forum?.postDetail?.date.split("T")[0]}</span>
          </div>
        </div>
        <h2 className="card-title text-2xl font-bold font-oswald  duration-300  transition ease-in-out delay-150 group-hover:text-[#dde244] mt-5">
          {forum?.postDetail?.title}
        </h2>
        {forum?.postDetail?.post.split(" ").length > 20 ? (
          <p className="text-white font-roboto">
            {forum?.postDetail?.post.split(" ").slice(0, 20).join(" ")}{" "}
            <span className="font-bold text-[#dde244]">... </span>
            <Link
              to={`/community/${forum?._id}`}
              className="uppercase  text-[#dde244] font-medium rounded-none flex gap-3 items-center py-3"
            >
              <span className="inline">Read More</span>
              <FaArrowRightLong className="inline"></FaArrowRightLong>
            </Link>
          </p>
        ) : (
          <>
            <p className="text-white font-roboto">{forum?.postDetail?.post}</p>
            <Link
              to={`/community/${forum?._id}`}
              className="uppercase  text-[#dde244] font-medium rounded-none flex gap-3 items-center py-3"
            >
              <span className="inline">Read More</span>
              <FaArrowRightLong className="inline"></FaArrowRightLong>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityMainPg;
