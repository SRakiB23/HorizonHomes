import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Date formatting function
const formatDate = (isoString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

function MyReviewsCard({ review, refetch }) {
  const {
    property_name,
    agent_name,
    review_time,
    review_description,
    image,
    agent_image,
  } = review;

  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="card card-compact w-[400px] h-[400px] bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{property_name}</h2>
          </div>
          <p className="divider"></p>
          <p>
            <span className="text-base font-bold pr-2">Review:</span>
            {review_description}
          </p>
          <p className="divider"></p>

          <div className="avatar flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-400">Agent:</h2>
            <p className="text-lg font-bold">{agent_name}</p>
          </div>
          <p className="text-gray-500 text-sm">
            Reviewed on: {formatDate(review_time)}
          </p>
          <button
            onClick={() => handleDelete(review._id)}
            className="btn text-white text-lg mx-auto bg-[#Ed2027] w-36"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyReviewsCard;
