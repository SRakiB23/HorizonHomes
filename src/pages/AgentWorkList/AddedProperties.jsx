import React from "react";
import useAgentAddProperty from "../../hooks/useAgentAddProperty";
import AddedPropertiesCard from "./AddedPropertiesCard";
import { Link } from "react-router-dom";

function AddedProperties() {
  const [property, refetch] = useAgentAddProperty();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold pb-8">
        <span className="text-[#ED2027]">My</span> Added
        <span className="text-[#ED2027]"> Properties</span>
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
        {property.map((item) => (
          <AddedPropertiesCard
            key={item._id}
            item={item}
            refetch={refetch}
          ></AddedPropertiesCard>
        ))}
      </div>
      <div className="text-center py-6">
        <Link to="/dashboard">
          <button className="btn bg-[#ED2027] text-white">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default AddedProperties;
