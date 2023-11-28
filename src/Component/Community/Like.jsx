import axios from "axios";
import React, { useContext, useState } from "react";
import { SlLike } from "react-icons/sl";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Like = ({ details }) => {
  const { user } = useContext(AuthContext);
  const existingDislikedUser = [...details?.dislikedUser];
  const existingLikedUser = [...details?.likedUser];

  const isLiked =  existingDislikedUser.includes(user?.email) || existingLikedUser.includes(user?.email) ;

  if (!isLiked) {
    existingLikedUser.push(user?.email);
  }

  const updatedLike = {
    increaselike: details?.like + 1,
    likedUser: existingLikedUser,
  };

  const handleLikeClick = async () => {
    await axios
      .patch(`http://localhost:5000/blog/${details?._id}`, {updatedLike, like:true})
      .then((res) => {
        console.log(res.data);
      })
      .error((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {user && !isLiked ? (
        <button
          className="btn  bg-[#dde244] cursor-pointer "
          onClick={handleLikeClick}
        >
          <SlLike className="text-black text-xl" />
        </button>
      ) : (
        <button disabled className="btn bg-[#dde244] cursor-pointer ">
          <SlLike className="text-xl teext-white " />
        </button>
      )}
    </>
  );
};

export default Like;
