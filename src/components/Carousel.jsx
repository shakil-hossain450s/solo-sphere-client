// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

import bgImg1 from '../assets/images/carousel1.jpg';
import bgImg2 from '../assets/images/carousel2.jpg';
import bgImg3 from '../assets/images/carousel3.jpg';

export default function Carousel() {
  return (
    <div className='container mx-auto px-6 py-4'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide>
          <Slide image={bgImg1} text="Get your Development Projects Done in minute"></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgImg2} text="Get your Graphics Design Projects Done in minute"></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgImg3} text="Start your Digital Marketing Campagin up n running"></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
