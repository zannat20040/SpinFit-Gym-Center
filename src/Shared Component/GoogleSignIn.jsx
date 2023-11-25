import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaArrowRightLong } from "react-icons/fa6";
import swal from "sweetalert";

const GoogleSignIn = ({label}) => {
  const { googleSignIn } = useContext(AuthContext);
  const HandleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result)
        swal("Congratulations!", 'You have taken the first step towards an amazing journey' , "success");
      })
      .catch((error) => {
        swal("Sorry!", error.message , "error");
      });
  };

  return (
    
      <button className="uppercase tracking-widest  btn btn-outline bg-[#dde244] rounded-none" onClick={HandleGoogleSignin}>
        <span className="mr-6">{label}</span>{" "}
        <FaArrowRightLong></FaArrowRightLong>
      </button>
   
  );
};

export default GoogleSignIn;
