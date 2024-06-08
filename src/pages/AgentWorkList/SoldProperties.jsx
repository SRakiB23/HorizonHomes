import React from "react";
import useWishlisted from "../../hooks/useWishlisted";

function SoldProperties() {
  const [wishlist] = useWishlisted();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-4xl py-5">
        My Sold <span className="text-[#Ed2027]">Properties</span>
      </h2>
      <div>
        {wishlist.filter(
          ((item) => item?.status === "bought").map((item) => (
            <div className="card card-compact w-[400px] h-[600px] bg-base-100 shadow-xl">
              <figure>
                <img className="h-[220px] w-full" src={image} alt="property" />
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SoldProperties;
