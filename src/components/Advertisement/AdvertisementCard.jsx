import React from "react";
import { FaLocationArrow, FaLocationDot, FaLocationPin } from "react-icons/fa6";

function AdvertisementCard({ property }) {
  const { property_name, image, price_range, location, verification_status } =
    property;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl font-bold">{property_name}</h2>
          <p className="flex items-center gap-1 text-base">
            <FaLocationDot /> {location}
          </p>
          <p className="divider"></p>
          <div className="card-actions flex justify-between items-center">
            <p className="text-lg font-bold">{price_range}</p>
            <button className="btn bg-[#Ed2027] text-white">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertisementCard;
