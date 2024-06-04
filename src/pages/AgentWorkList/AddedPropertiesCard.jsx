import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

function AddedPropertiesCard({ item }) {
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
  return (
    <div>
      <div>
        <div className="card card-compact w-[400px] bg-base-100 shadow-xl">
          <figure>
            <img className="h-64 w-full" src={image} alt="property" />
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
            <p className="text-xl py-2 font-bold">{price_range}</p>
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
              <button className="btn text-white bg-[#Ed2027] w-36">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedPropertiesCard;