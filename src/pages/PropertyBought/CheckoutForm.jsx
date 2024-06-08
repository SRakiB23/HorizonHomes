import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/wishlist/${id}`);
        const wishlistItem = response.data;
        const offeredPrice = parseFloat(wishlistItem.offered_price || 0);

        const paymentIntentResponse = await axiosSecure.post(
          "/create-payment-intent",
          { offered_price: offeredPrice }
        );
        setClientSecret(paymentIntentResponse.data.clientSecret);
      } catch (error) {
        console.error(
          "Error fetching wishlist item or creating payment intent:",
          error
        );
        setError("Error creating payment intent. Please try again later.");
      }
    };

    fetchData();
  }, [axiosSecure, id, stripe, elements]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axiosSecure.get(`/wishlist/${id}`);
    const wishlistItem = response.data;
    console.log(wishlistItem.offered_price);

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment method error:", error);
      setError(error.message || "An error occurred during payment processing.");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error:", confirmError);
      setError(
        confirmError.message || "An error occurred during payment confirmation."
      );
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // Patch the transaction ID to the database
      try {
        await axiosSecure
          .patch(`/wishlistt/${id}`, {
            status: "bought",
            transcation_id: paymentIntent.id,
            sold_price: wishlistItem.offered_price,
          })
          .then((res) => {
            if (res.data?.success) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment Successfull!!!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/propertybought");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          });
      } catch (error) {
        console.error("Error patching transaction ID to the database:", error);
        setError("Error patching transaction ID to the database.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              backgroundColor: "rgba(255,255,255,1)",
              fontSize: "24px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
