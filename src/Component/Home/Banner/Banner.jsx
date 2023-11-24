import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Button from "../../../Shared Component/Navbar/Button";
import { gymSliderContents } from "../../../Utils";

const Banner = () => {
 

  return (
    <div>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
       {
        gymSliderContents.map((content,index)=>(
          <SwiperSlide key={index}>
          <div
          className="hero h-[550px]"
          style={{
            backgroundImage:
              `url(${content.image})`,
          }}
        >
          <div className="hero-overlay bg-opacity-80 bg-black"></div>
          <div className="text-neutral-content container mx-auto px-4">
            <div className="max-w-lg text-start">
              <h1 className="mb-5 text-6xl font-bold text-[#dde244] font-oswald">{content.title}</h1>
              <p className="mb-5 font-roboto">
              {content.description}
              </p>
              <Button label={'Join to our Classes'}></Button>
            </div>
          </div>
        </div>
          </SwiperSlide>
        )) 
       }
      
      </Swiper>

 
    </div>
  );
};

export default Banner;
