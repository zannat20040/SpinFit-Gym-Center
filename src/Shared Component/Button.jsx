import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const Button = ({ label }) => {
  return (
    <button  className="uppercase text-xs font-roboto font-semibold tracking-widest flex justify-between gap-5 py-3 px-5 text-black border-none btn-outline bg-[#dde244] rounded-none">
      <span className="mr-6">{label}</span>
      <FaArrowRightLong></FaArrowRightLong>
    </button>
    
    
  );
};

export default Button;
