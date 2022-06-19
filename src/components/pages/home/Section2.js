import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";

import { Link } from "react-router-dom";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";

let Categories = [
  { title: "Hair Style", image: "assets/home/hair.jpg" },
  { title: "Health Care", image: "assets/home/health.jpg" },
  { title: "Beauty", image: "assets/home/beauty.jpg" },
];

export default function Section2() {
  return (
    <div className="home-section2" id="discover">
      <div className="home-section2-title">Discover by Categories</div>
      <div className="home-section2-swiper">
        <Swiper
          className="swiper"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
        >
          {Categories.map((cat, idx) => {
            return (
              <SwiperSlide defaultChecked={idx === 2}>
                <Card key={idx} image={cat.image} title={cat.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="section2-buttons">
          <div className="outline-button">See All Categories</div>
          <Link to="/institutions">
            <div className="line-button">Discover Institutions</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, image }) {
  return (
    <div className="swiper-card">
      <img className="parallax-bg" src={image} alt={title} />
      <div className="swiper-card-title">{title}</div>
    </div>
  );
}
