import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Swiper.scss";

export default function App({ children }: { children: ReactNode[] }) {
  return (
    <>
      <Swiper
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      >
        {children.map((slide, index) => {
          return <SwiperSlide key={index}>{slide}</SwiperSlide>;
        })}
      </Swiper>
    </>
  );
}
