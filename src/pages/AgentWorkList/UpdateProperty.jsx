import React, { useEffect, useState } from "react";
import UpdatePropertyForm from "./updatePropertyForm";
import { useParams } from "react-router-dom";

function UpdateProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:5000/property/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center py-4">
        Update <span className="text-[#ED2027]">Property</span>
      </h2>
      <div>
        <UpdatePropertyForm property={property} />
      </div>
    </div>
  );
}

export default UpdateProperty;
