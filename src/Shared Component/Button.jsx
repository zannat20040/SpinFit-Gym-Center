import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const Button = ({ label }) => {
  return (
    <button className="uppercase  tracking-widest text-black btn border-none btn-outline bg-[#dde244] rounded-none">
      <span className="mr-6">{label}</span>{" "}
      <FaArrowRightLong></FaArrowRightLong>
    </button>
    
    
  );
};

export default Button;
