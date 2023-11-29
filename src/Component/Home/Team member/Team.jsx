import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Team = ({ member }) => {
  // console.log(member)
  return (
    <div
      className="hero border group relative overflow-hidden transition-transform duration-300 transform scale-100 group-hover:scale-105"
      // style={{ backgroundImage: `url(${member.image})` }}
    >
      <div>
        <img src={member.profileImage} alt="" className=" h-[200px] w-full" />
      </div>
      <div className=" group-hover:bg-[#0000009c] group-hover:hero-overlay "></div>
      <div className="hero-content text-center  text-black ">
        <div className="bg-[#dde2448f] w-full  group-hover:-bottom-2 absolute p-5 transition-transform duration-300 transform -translate-y-40 group-hover:-translate-y-1">
          <h1 className=" text-xl font-bold py-2 px-2 font-oswald tracking-wider">
            {member.fullName}
          </h1>
          <p className=" font-roboto ">{member.specialization}</p>
        </div>
        <div>
          <div className="flex transition-transform duration-300 transform opacity-0 group-hover:opacity-100 gap-3 ease-in">
            {member.socialIcons.map((item) => (
              <Link to={item?.link} key={item?.platform}>
                <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
                  {item?.platform === "Facebook" && <FaFacebookF />}
                  {item?.platform === "Linkedin" && <FaLinkedinIn />}
                  {item?.platform === "Instagram" && <AiFillInstagram />}
                </span>
              </Link>
            ))}
           
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
