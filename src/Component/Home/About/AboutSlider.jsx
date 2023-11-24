import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

const AboutSlider = () => {
    return (
        <>
          <div className='border-[20px] border-[#dde244]'>
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          <SwiperSlide>
            <img src="https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.pexels.com/photos/3836861/pexels-photo-3836861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.pexels.com/photos/4164512/pexels-photo-4164512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </SwiperSlide>
       
          </Swiper>
          </div>
        </>
      );
};

export default AboutSlider;
