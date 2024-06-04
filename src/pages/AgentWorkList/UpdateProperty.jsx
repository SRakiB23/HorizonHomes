import React from "react";
import useAgentAddProperty from "../../hooks/useAgentAddProperty";
import UpdatePropertyForm from "./updatePropertyForm";

function UpdateProperty() {
  const [property] = useAgentAddProperty();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center py-4">
        Update <span className="text-[#ED2027]">Property</span>
      </h2>
      <div>
        {property.map((item) => (
          <UpdatePropertyForm key={item._id} item={item}></UpdatePropertyForm>
        ))}
      </div>
    </div>
  );
}

export default UpdateProperty;
