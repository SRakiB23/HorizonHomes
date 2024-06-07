import React from "react";
import useReviews from "../../hooks/useReview";
import ManageReviewCard from "./ManageReviewCard";
import { Link } from "react-router-dom";

function ManageReviews() {
  const [reviews, refetch] = useReviews();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-4xl py-4">
        Manage <span className="text-[#ED2027]">Review</span>
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm: grid-cols-1">
        {reviews.map((review) => (
          <ManageReviewCard
            key={review._id}
            review={review}
            refetch={refetch}
          ></ManageReviewCard>
        ))}
      </div>
      <div className="text-center pb-6">
        <Link to="/dashboard">
          <button className="btn bg-[#ED2027] text-white">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default ManageReviews;
