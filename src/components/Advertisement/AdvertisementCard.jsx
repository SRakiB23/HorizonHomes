import React from "react";
import { FaLocationArrow, FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AdvertisementCard({ property }) {
  const {
    property_name,
    image,
    price_range,
    location,
    verification_status,
    _id,
  } = property;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img className="h-64 w-full" src={image} alt="property" />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl font-bold">{property_name}</h2>
          <p className="flex items-center gap-1 text-base">
            <FaLocationDot /> {location}
          </p>
          <p className="divider"></p>
          <div className="card-actions flex justify-between items-center">
            <p className="text-lg font-bold">{price_range}</p>
            <Link to={`propertyDetails/${_id}`}>
              <button className="btn bg-[#Ed2027] text-white">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertisementCard;
