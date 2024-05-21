import { useQuery } from "@tanstack/react-query";
import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import CommunityMainPg from "../Component/Community/CommunityMainPg";
import { Helmet } from "react-helmet-async";

const Community = () => {
  const {
    isLoading,
    error,
    data: forums,
  } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await fetch("https://server-psi-tawny-84.vercel.app/blog");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>SpinFit | community</title>
      </Helmet>
      <RouteLabel label={"Forum"}></RouteLabel>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forums.length > 0 &&
            forums?.map((forum) => (
              <CommunityMainPg key={forum._id} forum={forum}></CommunityMainPg>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
