// src/api/updateStatus.js

import axios from "axios";

const handleAdvertiseStatus = async (axiosInstance, id, newStatus) => {
  try {
    const response = await axiosInstance.patch(`/propertyadvertise/${id}`, {
      advertisement: newStatus,
    });
    if (response.data.success) {
      return { success: true, advertisement: newStatus };
    } else {
      return { success: false, message: "Failed to update status" };
    }
  } catch (error) {
    console.error("Error advertisement status:", error);
    return { success: false, message: "Error updating status" };
  }
};

export default handleAdvertiseStatus;
