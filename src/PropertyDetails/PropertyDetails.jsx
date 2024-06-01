import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams(); // Changed _id to id for consistency
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/properties/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPropertyDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching property details: {error}</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-[#ED2027] font-bold text-3xl text-center py-4">
        Property Details
      </h2>
      {propertyDetails && (
        <div>
          <div>
            <img
              className="w-full h-[700px] rounded-lg relative"
              src={propertyDetails.image}
              alt=""
            />
            <div className="max-w-7xl text-black mx-auto bg-white rounded-xl absolute md:-bottom-[500px] right-0 left-0 px-10 ">
              <div className="flex items-center justify-between py-10">
                <h3 className="text-4xl font-bold">
                  {propertyDetails.property_name}
                </h3>
                <p>{propertyDetails.price_range}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-slate-600 font-bold">LOCATION</p>
                  <p className="text-xl py-2 mb-4 font-bold flex items-center">
                    <FaLocationDot /> {propertyDetails.location}
                  </p>
                </div>
                <div>
                  <button className="btn bg-[#ED2027] text-white">
                    Add to WishList
                  </button>
                </div>
              </div>
              <p className="text-slate-600 font-bold text-xl">Description</p>
              <p className="text-lg">{propertyDetails.description}</p>
              <div className="pt-10">
                <p className="text-xl text-slate-600 font-bold pb-4">
                  Meet Our Agent
                </p>
                <div className="avatar flex items-center gap-2">
                  <div className="w-24 rounded-full flex">
                    <img src={propertyDetails.agent_image} />
                  </div>
                  <p className="text-xl pl-4 font-bold">
                    {propertyDetails.agent_name}
                  </p>
                </div>
              </div>
              {/*Review Section*/}
              <p className="text-xl font-bold py-10">Guest Review</p>
              {}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
