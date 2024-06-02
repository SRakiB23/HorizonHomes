const submitReview = async (formData, wishlist, id) => {
  const reviewData = {
    property_name: wishlist?.property_name,
    image: wishlist?.image,
    location: wishlist?.location,
    agent_name: wishlist?.agent_name,
    agent_image: wishlist?.agent_image,
    verification_status: wishlist?.verification_status,
    buyingDate: formData.get("buyingDate"),
    price_range: wishlist?.price_range,
    user_name: wishlist?.user_name,
    email: wishlist?.email,
    offered_price: formData.get("offered_price"),
  };
  console.log(reviewData);

  try {
    const response = await fetch(`http://localhost:5000/wishlist/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    console.log("Review submitted successfully!");
    alert("Review submitted successfully!");
    // Optionally return any data from the response
    return response.json();
  } catch (error) {
    console.error("Error submitting review:", error.message);
    throw error; // Propagate the error
  }
};

export default submitReview;
