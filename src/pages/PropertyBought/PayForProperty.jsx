import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import useWishlist from "../../hooks/useWishlist";
import useWishlistId from "../../hooks/useWishlistId";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

function PayForProperty() {
  const { id } = useParams();
  const [wishlist] = useWishlistId(id);
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold py-5">
        Pay For <span className="text-[#ED2027]">Property</span>
      </h2>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
}

export default PayForProperty;
