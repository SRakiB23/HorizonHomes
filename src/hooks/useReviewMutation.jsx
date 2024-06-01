// useReviewMutation.js
import { useMutation } from "@tanstack/react-query";

const useReviewMutation = () => {
  const mutation = useMutation(async (reviewData) => {
    const response = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    return response.json();
  });

  return mutation.mutate; // Return the mutate function directly
};

export default useReviewMutation;
