import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
const Button = ({label}) => {
    return (
        <div>
            <button className="uppercase tracking-widest  btn btn-outline bg-[#dde244] rounded-none"><span className='mr-6'>{label}</span> <FaArrowRightLong></FaArrowRightLong></button>
        </div>
    );
};

export default Button;