import React from "react";
import { FaLocationArrow, FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

function AllPropertyCard({ property }) {
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
  } = property;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="card card-compact w-[400px] h-[550px] bg-base-100 shadow-xl">
        <figure>
          <img className="h-52 w-full" src={image} alt="property" />
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
            ${price_range.min}-${price_range.max}
          </p>
          <p className="divider"></p>
          <div className="avatar flex items-center gap-2">
            <div className="w-12 rounded-full flex">
              <img src={agent_image} />
            </div>
            <p className="text-lg font-bold">{agent_name}</p>
            <Link to={`/propertyDetails/${_id}`}>
              <button className="btn bg-[#Ed2027] text-white">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPropertyCard;
