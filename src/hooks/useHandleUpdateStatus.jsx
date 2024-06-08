// src/api/updateStatus.js

import axios from "axios";

const handleUpdateStatus = async (axiosInstance, id, newStatus) => {
  try {
    const response = await axiosInstance.patch(`/wishlistR/${id}`, {
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
