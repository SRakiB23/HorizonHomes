import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AdvertisementCard from "./AdvertisementCard";
import useProperties from "../../hooks/useProperties";
import useVerifiedProperties from "../../hooks/useVerifiedProperty";
import useAdvertiseProperty from "../../hooks/useAdvertiseProperty";

function Advertisement() {
  const axiosPublic = useAxiosPublic();
  const [properties] = useAdvertiseProperty();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-6 text-center">
        <h2 className="text-sm text-[#ED2027] font-semibold">
          FEATURED PROPERTIES
        </h2>
        <h2 className="text-4xl font-bold pt-2">
          Recommended For <span className="text-[#ED2027]">You</span>
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10">
        {properties.map((property) => (
          <AdvertisementCard
            key={property._id}
            property={property}
          ></AdvertisementCard>
        ))}
      </div>
    </div>
  );
}

export default Advertisement;
