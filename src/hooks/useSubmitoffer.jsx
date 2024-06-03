import Swal from "sweetalert2";

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
    status: "pending",
  };
  console.log(reviewData);

  fetch(`http://localhost:5000/wishlist/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire("Submitted!", "Your Offered Price is Submitted", "success");
      }
    });
};

export default submitReview;
