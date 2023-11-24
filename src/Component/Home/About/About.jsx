import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../Shared Component/Navbar/Button";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const About = () => {
  return (
    <div className="text-neutral-content ">
      <div className="max-w-md text-start ">
        <p className="mb-5 text-[#dde244] font-roboto tracking-widest text-base uppercase ">
          Since 2008
        </p>
        <h1 className="mb-5 text-6xl font-bold font-oswald">
          Welcome to <span className="text-6xl text-[#dde244]">SpinFit</span>!
        </h1>
        <p className="mb-5 font-roboto">
          We dedicated a premier fitness facility to helping individuals achieve
          their health and wellness goals. Our gym has become a community hub
          for fitness enthusiasts of all levels. With state-of-the-art
          equipment, expert trainers, and a supportive environment, we provide
          the perfect space for you to embark on your fitness journey.
        </p>
        <h1 className="mb-5 text-2xl text-[#dde244] font-bold font-oswald">
          Vision & mission
        </h1>
        <div className="space-y-4 ml-6 mb-5">
          <p className="flex gap-7 items-start">
            <VscActivateBreakpoints className="text-[#dde244] text-lg" />
            <span>
              {" "}
              Excellence in all aspects of fitness, service, and community
              engagement.
            </span>
          </p>
          <p className="flex gap-7 items-start">
            <VscActivateBreakpoints className="text-[#dde244] text-lg" />
            <span>Creating a welcoming and supportive environment</span>
          </p>
          <p className="flex gap-7 items-start">
            <VscActivateBreakpoints className="text-[#dde244] text-lg" />
            <span> Upholding the highest ethical standards and honesty </span>
          </p>
          <p className="flex gap-7 items-start">
            <VscActivateBreakpoints className="text-[#dde244] text-lg" />
            <span>
              {" "}
              Embracing innovation in fitness technology, training methods
            </span>
          </p>
        </div>
      </div>
      <div className="flex  gap-3 mt-10">
        <Link>
          <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
            <FaFacebookF />
          </span>
        </Link>
        <Link>
          <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
            <FaGoogle />
          </span>
        </Link>
        <Link>
          <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
            <AiFillInstagram />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default About;
