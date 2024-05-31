import React from "react";
import { Parallax } from "react-parallax";

const Banner = () => {
  return (
    <div className="relative h-[700px]">
      <Parallax
        bgImage="https://i.ibb.co/L1p9yhH/r-architecture-0t-KCSy-LXq-QM-unsplash.jpg"
        strength={400} // Adjust strength as needed
        blur={1} // Adjust blur as needed
        className="w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
      </Parallax>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-center">
          <span className="text-white text-7xl font-bold">
            Find Your Perfect Home
          </span>
          <br />
          <span className="text-white text-xl font-semibold">
            We are a real estate agency that will help you find the best
            residence you <br /> dream of, let’s discuss for your dream house?
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
