import React from "react";
import useReviews from "../../hooks/useReview";
import ReviewCard from "./ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Reviews() {
  const [reviews] = useReviews();

  // Slick settings
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll
  };

  return (
    <div className="text-center pt-14 pb-6">
      <h2 className="text-base font-bold text-[#ED2027]">TOP REVIEWS</h2>
      <h2 className="text-4xl">What’s People Say’s</h2>
      <div className="mt-6">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Reviews;
