import React from "react";
import useWishlist from "../../hooks/useWishlist";
import PropertyBoughtCard from "./PropertyBoughtCard";

function PropertyBought() {
  const [wishlist, refetch] = useWishlist();
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h2 className="text-4xl font-bold py-5 text-center">
          Property <span className="text-[#ED2027]">Bought</span>
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 sm: grid-cols-1">
        {wishlist.map((item) => (
          <PropertyBoughtCard
            key={item._id}
            item={item}
            refetch={refetch}
          ></PropertyBoughtCard>
        ))}
      </div>
    </div>
  );
}

export default PropertyBought;
