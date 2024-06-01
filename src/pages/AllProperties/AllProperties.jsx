import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProperties from "../../hooks/useProperties";
import AllPropertyCard from "./AllPropertyCard";
import AdvertisementCard from "../../components/Advertisement/AdvertisementCard";

function AllProperties() {
  const axiosPublic = useAxiosPublic();
  const [properties] = useProperties();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-6 text-center">
        <h2 className="text-sm text-[#ED2027] font-semibold">ALL PROPERTIES</h2>
        <h2 className="text-4xl font-bold pt-2">Find Your Desired Property</h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5">
        {properties.map((property) => (
          <AllPropertyCard
            key={property._id}
            property={property}
          ></AllPropertyCard>
        ))}
      </div>
    </div>
  );
}

export default AllProperties;
