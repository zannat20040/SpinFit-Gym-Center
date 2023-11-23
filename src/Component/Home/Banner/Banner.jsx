import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Button from "../../../Shared Component/Navbar/Button";

const Banner = () => {
  const gymSliderContent = [
    {
      title: "Achieve Your Fitness Goals",
      description:
        "Join our state-of-the-art gym and transform your body. Our expert trainers and top-notch facilities are here to help you achieve your fitness goals.",
      image:
        "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Fun Workouts for Everyone",
      description:
        "Experience a variety of fun and engaging workouts suitable for all fitness levels. From beginners to advanced, our gym offers something for everyone.",
      image:
        "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Premium Facilities, Exceptional Results",
      description:
        "Discover a gym with premium facilities, cutting-edge equipment, and a supportive community. Achieve exceptional results and enjoy the journey to a healthier you.",
      image:
        "https://images.pexels.com/photos/3836861/pexels-photo-3836861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Train with Passion, Train with Us",
      description:
        "At our gym, we are passionate about fitness. Join a community of like-minded individuals and embark on a fitness journey that goes beyond just working out.",
      image:
        "https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

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
        gymSliderContent.map((item,index)=>(
          <SwiperSlide>
          <div
          className="hero h-[550px]"
          style={{
            backgroundImage:
              `url(${item.image})`,
          }}
        >
          <div className="hero-overlay bg-opacity-80 bg-black"></div>
          <div className="text-neutral-content container mx-auto px-4">
            <div className="max-w-lg text-start">
              <h1 className="mb-5 text-6xl font-bold text-[#dde244] font-oswald">{item.title}</h1>
              <p className="mb-5 font-roboto">
              {item.description}
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
