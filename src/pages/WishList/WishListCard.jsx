import React from "react";
import { FaLocationArrow, FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function AllPropertyCard({ item, refetch }) {
  const axiosSecure = useAxiosSecure();
  const {
    property_name,
    _id,
    image,
    price_range,
    location,
    verification_status,
    description,
    agent_name,
    agent_image,
  } = item;

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
        axiosSecure.delete(`/wishlist/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "Your Wishlisted Property Removed Successfully!.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="card card-compact w-[400px] h-full bg-base-100 shadow-xl">
        <figure>
          <img className="h-72 w-full" src={image} alt="property" />
        </figure>
        <div className="card-body">
          <div className="flex items-center  gap-4">
            <h2 className="text-2xl font-bold">{property_name}</h2>
            <p className="flex items-center text-green-600">
              <MdVerified className="text-xl" /> {verification_status}
            </p>
          </div>
          <p className="flex items-center gap-1 text-base">
            <FaLocationDot /> {location}
          </p>
          <p className="text-xl py-2 font-bold">
            ${price_range.min} - ${price_range.max}
          </p>
          <p className="divider"></p>
          <div className="avatar flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-400">Agent:</h2>
            <div className="w-14 rounded-full flex">
              <img src={agent_image} />
            </div>
            <p className="text-lg font-bold">{agent_name}</p>
          </div>
          <div className="flex justify-evenly pt-4">
            <Link to={`/makeoffer/${_id}`}>
              <button className="btn text-white bg-[#Ed2027] w-36">
                Make an Offer
              </button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="btn text-white bg-[#Ed2027] w-36"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPropertyCard;
