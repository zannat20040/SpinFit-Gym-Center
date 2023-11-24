import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { LuQuote } from "react-icons/lu";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper/modules";

const Textimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    axios
      .get("./testimonial.json")
      .then((res) => {
        setTestimonials(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="grid grid-cols-2 gap-6">
      <div></div>
        <div className="text-end">
          <h1 className="mb-5 text-6xl font-bold font-oswald text-white">
            Hear from Our <span className="text-6xl text-[#dde244]">Satisfied Clients</span>
          </h1>
          <Swiper
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-slate-900 py-10 ">
                  <LuQuote className="absolute text-9xl top-[-5px] right-20" />
                  <p className="relative mb-5 text-white font-roboto font-light text-xl">
                    {testimonial.testimonial}
                  </p>
                  <p className="mb-5 text-[#dde244] text-base font-roboto tracking-widest ">
                    {testimonial.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Textimonial;
