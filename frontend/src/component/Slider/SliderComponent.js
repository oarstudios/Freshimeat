import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import desktopImage from "../../assets/Black Yellow Bold Simple Restaurant Promotion Landscape Banner 1.png"; // Desktop image
import mobileImage from "../../assets/Freshi Meat website c (750 x 480 px).png"; // Mobile image
import "./SliderComponent.css";

const SliderComponent = () => {
  const [currentImage, setCurrentImage] = useState(desktopImage);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 480) {
        setCurrentImage(mobileImage); // Use mobile image for small screens
      } else {
        setCurrentImage(desktopImage); // Use desktop image for larger screens
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updateImage); // Cleanup event listener
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={currentImage} alt="Freshness of Local Market" className="slider-image" />
        </div>
        <div className="slide">
          <img src={currentImage} alt="Doorstep Delivery" className="slider-image" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
