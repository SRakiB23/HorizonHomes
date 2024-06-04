import React, { useEffect, useState } from "react";
import useWishListId from "../../hooks/useWishlistId";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import getTodayDate from "../../hooks/useCalender";
import submitReview from "../../hooks/useSubmitoffer";

function MakeOffer() {
  const { id } = useParams();
  const [wishlist] = useWishListId(id);
  const [offeredAmount, setOfferedAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState(getTodayDate());

  // Function to handle change in offered amount input
  const handleOfferedAmountChange = (e) => {
    setOfferedAmount(e.target.value);
  };

  // Function to handle offer submission
  const handleSubmitOffer = async (e, user) => {
    e.preventDefault();
    // Parse the price range to extract min and max values
    const [minPrice, maxPrice] = wishlist.price_range
      .split(" - ")
      .map((price) => {
        return parseFloat(price.replace(/\$|,/g, ""));
      });
    // Convert offered amount to number
    const amount = parseFloat(offeredAmount);
    // Check if the offered amount is within the price range
    if (amount >= minPrice && amount <= maxPrice) {
    } else {
      // Offer is not within range, display an error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Offered amount must be between ${minPrice} and ${maxPrice}. Please enter a valid amount.`,
      });
    }
    const formData = new FormData(e.target);
    try {
      await submitReview(formData, wishlist, id); // Call the submitReview function
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold py-4">
        Make <span className="text-[#Ed2027]">OFFER</span>
      </h2>
      <div>
        <form onSubmit={handleSubmitOffer}>
          {/*propertyName and Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Property Name</span>
              </label>
              <input
                type="text"
                defaultValue={wishlist?.property_name}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                defaultValue={wishlist?.location}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/*agent buyer */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Agent Name</span>
              </label>
              <input
                type="text"
                defaultValue={wishlist?.agent_name}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Buyer Name</span>
              </label>
              <input
                type="text"
                defaultValue={wishlist?.user_name}
                readOnly
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Buyer Email</span>
              </label>
              <input
                type="text"
                defaultValue={wishlist?.email}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Buying Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={buyingDate}
                name="buyingDate"
                readOnly // Make the input field read-only
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price Range</span>
              </label>
              <input
                type="text"
                defaultValue={wishlist?.price_range}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#ED2027]">Offered Price</span>
              </label>
              <input
                type="number"
                placeholder="Please Input Your Offered Price"
                name="offered_price"
                required
                value={offeredAmount}
                onChange={handleOfferedAmountChange}
                className="input input-bordered"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn my-10 bg-[#ED2027] w-1/2 text-white"
          >
            Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
}

export default MakeOffer;