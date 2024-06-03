import React from "react";
import useReviewByEmail from "../../hooks/useReviewByEmail";
import MyReviewsCard from "./MyReviewsCard";

function MyReviews() {
  const [reviews, refetch] = useReviewByEmail();
  // console.log(reviews);
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold">
        My <span className="text-[#ED2027]">Reviews</span>
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm: grid-cols-1">
        {reviews.map((review) => (
          <MyReviewsCard
            key={review._id}
            refetch={refetch}
            review={review}
          ></MyReviewsCard>
        ))}
      </div>
    </div>
  );
}

export default MyReviews;
