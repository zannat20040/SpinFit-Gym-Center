import axios from "axios";
import React, { useContext, useState } from "react";
import { SlDislike, SlLike } from "react-icons/sl";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const Dislike = ({details}) => {
    const { user } = useContext(AuthContext);
    const existingDislikedUser = [...details?.dislikedUser];
    const existingLikedUser = [...details?.likedUser];

    const isDisliked =  existingDislikedUser.includes(user?.email) || existingLikedUser.includes(user?.email) ;
  
    if (!isDisliked) {
        existingDislikedUser.push(user?.email);
    }
  
    const updatedDislike = {
      increaseDislike: details?.dislike + 1,
      dislikedUser: existingDislikedUser,
    };
  
    const HandleDislikeClick = async () => {
      await axios
        .patch(`https://server-psi-tawny-84.vercel.app/blog/${details?._id}`, {updatedDislike,dislike:true})
        .then((res) => {
        })
        .error((error) => {
          console.log(error);
        });
    };
  
    return (
      <>
        {user && !isDisliked ? (
          <button
            className="btn  bg-[#dde244] cursor-pointer "
            onClick={HandleDislikeClick}
          >
            <SlDislike className="text-black text-xl" />
          </button>
        ) : (
          <button disabled className="btn bg-[#dde244] cursor-pointer ">
            <SlDislike className="text-xl teext-white " />
          </button>
        )}
      </>
    );
};

export default Dislike;