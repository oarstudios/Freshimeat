import React, { useState, useEffect } from "react";
import "./AboutUs.css";

import aboutUsDesktop from "../../assets/about.png"; // Desktop image
import aboutUsTablet from "../../assets/about.png"; // Tablet image
import aboutUsMobile from "../../assets/aboutusmobile.png"; // Mobile image

export default function AboutUs() {
  const [imageSrc, setImageSrc] = useState(aboutUsDesktop);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 480) {
        setImageSrc(aboutUsMobile); // Use mobile image
      } else if (window.innerWidth <= 768) {
        setImageSrc(aboutUsTablet); // Use tablet image
      } else {
        setImageSrc(aboutUsDesktop); // Use desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updateImage); // Cleanup event listener
    };
  }, []);

  return (
    <div className="about-us">
      <img src={imageSrc} alt="About Us" className="about-us-img" />
    </div>
  );
}
