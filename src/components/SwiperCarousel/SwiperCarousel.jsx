import classes from "./SwiperCarousel.module.css";
import SessionTemplate from "../SessionTemplate/SessionTemplate";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
const SwiperCarousel = ({ slides }) => {
  return (
    <Swiper
      effect="coverflow"
      className={classes.SwiperCarousel}
      spaceBetween={10}
      modules={[EffectCoverflow, Pagination]}
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      centeredSlides={true}
      centeredSlidesBounds={true}
      pagination={true}
      loop={true}
      speed={500}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <SessionTemplate template={slide} key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;
