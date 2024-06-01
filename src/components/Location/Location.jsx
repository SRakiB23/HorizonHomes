// AutoplaySlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AutoplaySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 6, // Show all 6 images at once
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "50px", // Padding for the center image
    cssEase: "ease-in-out", // Transition effect
    blurFirstAndLast: true, // Blur the first and last images
    blurAmount: "5px", // Amount of blur
    responsive: [
      {
        breakpoint: 768, // Breakpoint for smaller screens
        settings: {
          slidesToShow: 1,
          centerPadding: "20px", // Adjust padding for smaller screens
        },
      },
    ],
  };

  // Array of image URLs
  const images = [
    "https://i.ibb.co/wg7HbXX/1.jpg+1",
    "https://i.ibb.co/wg7HbXX/1.jpg+2",
    "https://i.ibb.co/wg7HbXX/1.jpg+3",
    "https://i.ibb.co/wg7HbXX/1.jpg+4",
    "https://i.ibb.co/wg7HbXX/1.jpg+5",
    "https://i.ibb.co/wg7HbXX/1.jpg+6",
  ];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="slick-slide" style={{ padding: "0 10px" }}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              filter:
                index === 0 || index === images.length - 1
                  ? "blur(1px)"
                  : "none",
              width: "100%",
            }}
          />
        </div>
      ))}
    </Slider>
  );
}

export default AutoplaySlider;
