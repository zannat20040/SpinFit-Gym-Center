import React from "react";

const Feature = ({ feature }) => {
  return (
    <div
      className="hero border group relative overflow-hidden transition-transform duration-300 transform scale-100 group-hover:scale-105"
      style={{ backgroundImage: `url(${feature.image})` }}
    >
      <div className="hero-overlay bg-opacity-70 bg-black  "></div>
      <div className="hero-content text-center  text-black ">
        <div className="bg-[#dde2448f] p-5 overflow-hidden transition-transform duration-300 transform scale-100 group-hover:scale-105">
          <h1 className="mb-3 text-xl font-bold py-5 px-2 font-oswald tracking-wider">{feature.title}</h1>
          <p className=" font-roboto  opacity-0 group-hover:block h-0 overflow-hidden  group-hover:h-auto group-hover:opacity-100 transition duration-300 ease-out group-hover:ease-in">{feature.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
