// src/api/updateStatus.js

import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";

const handleUpdateStatus = async (id, newStatus) => {
  const axiosSecure = useAxiosSecure();
  try {
    const response = await axiosSecure.patch(`/wishlistt/${id}`, {
      status: newStatus,
    });
    if (response.data.success) {
      return { success: true, status: newStatus };
    } else {
      return { success: false, message: "Failed to update status" };
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Error updating status" };
  }
};

export default handleUpdateStatus;
