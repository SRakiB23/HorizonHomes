import React from "react";
import useAgentAddProperty from "../../hooks/useAgentAddProperty";
import AddedPropertiesCard from "./AddedPropertiesCard";

function AddedProperties() {
  const [property] = useAgentAddProperty();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold">
        <span className="text-[#ED2027]">My</span> Added
        <span className="text-[#ED2027]"> Properties</span>
      </h2>
      <div>
        {property.map((item) => (
          <AddedPropertiesCard key={item._id} item={item}></AddedPropertiesCard>
        ))}
      </div>
    </div>
  );
}

export default AddedProperties;
