import React from "react";
import Slider from "react-slick";
import s1 from "../../assets/images/support1.jpg";
import s2 from "../../assets/images/support2.jpg";
import s3 from "../../assets/images/support3.jpg";
import s4 from "../../assets/images/support4.jpg";
import s5 from "../../assets/images/support5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroAnim = () => {
  const images = [s1, s2, s3, s4, s5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 15000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroAnim;
