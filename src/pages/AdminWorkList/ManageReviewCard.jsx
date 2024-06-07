import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function ManageReviewCard({ review, refetch }) {
  const { _id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    reviewer_name,
    reviewer_image,
    email,
    review_description,
    property_name,
  } = review;

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
      <div className="py-4">
        <div className="card w-96 h-[470px] bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={reviewer_image}
              alt="reviewer_image"
              className="rounded-xl w-40 h-40"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{property_name}</h2>
            <p>
              <span className="text-[#ED2027] font-semibold">Reviewer: </span>{" "}
              {reviewer_name}
            </p>
            <p>
              {" "}
              <span className="text-[#ED2027] font-semibold">Email: </span>
              {email}
            </p>
            <p>{review_description}</p>
            <div className=" mt-4">
              <button
                className="btn bg-[#ED2027] text-white"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageReviewCard;
