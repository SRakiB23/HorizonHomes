import React, { useState } from "react";
import useVerifiedProperties from "../../hooks/useVerifiedProperty";
import AllPropertyCard from "./AllPropertyCard";

function AllProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // State to track sorting order
  const [properti] = useVerifiedProperties();

  // Function to handle sorting based on price range
  const sortProperties = (properties) => {
    if (sortOrder === "ascending") {
      return [...properties].sort(
        (a, b) => a.price_range.min - b.price_range.min
      );
    } else if (sortOrder === "descending") {
      return [...properties].sort(
        (a, b) => b.price_range.min - a.price_range.min
      );
    } else {
      return properties; // Return properties as is if no sorting order is selected
    }
  };

  // Filter properties based on search term
  const filteredProperties = properti.filter((property) =>
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered properties based on sorting order
  const sortedProperties = sortProperties(filteredProperties);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-6 text-center">
        <h2 className="text-sm text-[#ED2027] font-semibold">ALL PROPERTIES</h2>
        <h2 className="text-4xl font-bold pt-2">Find Your Desired Property</h2>
        <div className="md:flex items-center justify-center gap-10">
          {/* Search input */}
          <div className="my-6">
            <h2 className="text-[#ED2027]">Search</h2>
            <input
              type="text"
              placeholder="Search by location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="my-2 p-2 border border-gray-300 rounded-md w-full md:w-auto"
            />
          </div>
          {/* Sort dropdown */}
          <div className="my-6">
            <h2 className="text-[#ED2027]">Sort By</h2>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="my-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Sort by Price Range</option>
              <option value="ascending">Price: Low to High</option>
              <option value="descending">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5">
        {/* Display sorted and filtered properties */}
        {sortedProperties.map((property) => (
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
