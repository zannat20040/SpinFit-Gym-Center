import { useQuery } from "@tanstack/react-query";
import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import CommunityMainPg from "../Component/Community/CommunityMainPg";

const Community = () => {
    const {
        isPending,
        isError,
        isLoading,
        error,
        data: forums,
      } = useQuery({
        queryKey: ["forums"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/blog");
          return res.json();
        },
      });
    
      if (isLoading) {
        return <div className="container mx-auto mt-10 text-center"><span className="loading loading-ring loading-lg"></span></div>;
      }
 

    return (
        <div>
        <RouteLabel label={"Forum"}></RouteLabel>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            {forums.length>0 &&
            forums?.map(forum=> (
               <CommunityMainPg key={forum._id} forum = {forum}></CommunityMainPg>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Community;