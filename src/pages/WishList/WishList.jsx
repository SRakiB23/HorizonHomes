import React from "react";
import useWishlist from "../../hooks/useWishlist";
import WishListCard from "./WishListCard";

function WishList() {
  const [wishlist] = useWishlist();
  return (
    <div>
      <h2 className="text-4xl font-bold text-center py-4">
        My <span className="text-[#ED2027]">Wishlist</span>
      </h2>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-4 sm: grid-cols-1">
        {wishlist.map((item) => (
          <WishListCard key={item._id} item={item}></WishListCard>
        ))}
      </div>
    </div>
  );
}

export default WishList;
