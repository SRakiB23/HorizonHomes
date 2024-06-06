// src/api/updateStatus.js

import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";

const handleVerifyStatus = async (id, newStatus) => {
  const axiosSecure = useAxiosSecure();
  try {
    const response = await axiosSecure.patch(`/propertiess/${id}`, {
      verification_status: newStatus,
    });
    if (response.data.success) {
      return { success: true, verification_status: newStatus };
    } else {
      return { success: false, message: "Failed to verify status" };
    }
  } catch (error) {
    console.error("Error verify status:", error);
    return { success: false, message: "Error verify status" };
  }
};

export default handleVerifyStatus;
