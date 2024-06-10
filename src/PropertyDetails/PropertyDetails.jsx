import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const { id } = useParams(); // Use 'id' to match the route parameter
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  // console.log(user);

  useEffect(() => {
    if (id) {
      fetch(`https://horizon-homes-lilac.vercel.app/properties/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPropertyDetails(data);
          return fetch(`https://horizon-homes-lilac.vercel.app/reviews/${id}`);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((reviewsData) => {
          setReviews(reviewsData);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmitReview = async (e, data) => {
    e.preventDefault();

    // Get the current date and time in ISO format
    const reviewTime = new Date().toISOString();
    const formData = new FormData(e.target);
    const reviewData = {
      property_name: formData.get("property_name"),
      agent_name: propertyDetails.agent_name,
      reviewer_name: formData.get("reviewer_name"),
      review_description: formData.get("review_description"),
      reviewer_image: user?.photoURL,
      email: user?.email,
      review_time: reviewTime,
    };
    console.log(reviewData);
    fetch("https://horizon-homes-lilac.vercel.app/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire("Submitted!", "Your Review is Submitted", "success");
        }
      });
  };

  const handleWishList = async (e, data) => {
    e.preventDefault;

    // Validate and combine min_price and max_price
    const minPrice = propertyDetails.price_range.min;
    const maxPrice = propertyDetails.price_range.max;

    const wishList = {
      property_name: propertyDetails.property_name,
      image: propertyDetails.image,
      verification_status: propertyDetails.verification_status,
      agent_image: propertyDetails.agent_image,
      agent_name: propertyDetails.agent_name,
      agent_email: propertyDetails.agent_email,
      price_range: { min: minPrice, max: maxPrice },
      location: propertyDetails.location,
      user_image: user?.photoURL,
      user_name: user?.displayName,
      email: user?.email,
    };
    fetch("https://horizon-homes-lilac.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(wishList),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Added to wishlist",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
  };

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
          <div className="">
            <img
              className="w-full h-[700px] rounded-lg"
              src={propertyDetails.image}
              alt=""
            />
            <div className="max-w-7xl text-black mx-auto bg-white rounded-xl ">
              <div className="flex items-center justify-between py-10">
                <h3 className="text-4xl font-bold">
                  {propertyDetails.property_name}
                </h3>
                <h3 className="text-2xl font-bold">
                  ${propertyDetails.price_range.min} - $
                  {propertyDetails.price_range.max}
                </h3>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-slate-600 font-bold">LOCATION</p>
                  <p className="text-xl py-2 mb-4 font-bold flex items-center">
                    <FaLocationDot /> {propertyDetails.location}
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleWishList}
                    className="btn bg-[#ED2027] text-white"
                  >
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
                    <img src={propertyDetails.agent_image} alt="Agent" />
                  </div>
                  <p className="text-xl pl-4 font-bold">
                    {propertyDetails.agent_name}
                  </p>
                </div>
              </div>
              {/* Review Section */}
              <div className="pt-10">
                <p className="text-xl font-bold pb-4">Guest Review</p>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="review-card p-4 border rounded-lg bg-gray-100 mb-4"
                    >
                      <h4 className="text-lg font-bold">
                        {review.reviewer_name}
                      </h4>
                      <p className="text-gray-600">
                        {review.review_description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available.</p>
                )}
                <div>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn bg-[#ED2027] text-white"
                    onClick={() =>
                      document.getElementById("reviewModal").showModal()
                    }
                  >
                    Add a Review
                  </button>
                  <dialog id="reviewModal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Add a Review</h3>
                      <form onSubmit={handleSubmitReview}>
                        <div className="py-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Property Name
                          </label>
                          <input
                            type="text"
                            name="property_name"
                            className="input w-full border-black"
                            value={propertyDetails.property_name}
                            readOnly
                          />
                        </div>
                        <div className="py-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="reviewer_name"
                            className="input w-full border-black"
                            value={user?.displayName}
                            readOnly
                          />
                        </div>
                        <div className="py-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Review
                          </label>
                          <textarea
                            className="textarea w-full border-black"
                            name="review_description"
                            required
                            rows="4"
                            placeholder="Write your review here..."
                          ></textarea>
                        </div>
                        <div className="modal-action">
                          <button
                            type="submit"
                            className="btn bg-[#ED2027] text-white"
                            onClick={() =>
                              document.getElementById("reviewModal").close()
                            }
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                      <div className="">
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById("reviewModal").close()
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
