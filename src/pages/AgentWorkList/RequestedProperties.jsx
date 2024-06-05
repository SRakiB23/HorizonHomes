import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useWishlisted from "../../hooks/useWishlisted";
import handleUpdateStatus from "../../hooks/useHandleUpdateStatus";

function RequestedProperties() {
  const { id } = useParams();
  const [wishlist, refetch] = useWishlisted();

  const handleAccepted = async (itemId) => {
    try {
      const response = await handleUpdateStatus(itemId, "accepted");
      if (response.success) {
        Swal.fire({
          title: "Success",
          text: "Property accepted successfully!",
          icon: "success",
        });
        refetch(); // Refetch the data to update the UI
      } else {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to accept the property",
        icon: "error",
      });
    }
  };

  const handleRejected = async (itemId) => {
    try {
      const response = await handleUpdateStatus(itemId, "rejected");
      if (response.success) {
        Swal.fire({
          title: "Success",
          text: "Property rejected successfully!",
          icon: "success",
        });
        refetch(); // Refetch the data to update the UI
      } else {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to reject the property",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center py-5">
        Requested <span className="text-[#ED2027]">Properties</span>
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Property Name</th>
                <th>Location</th>
                <th>Buyer Email</th>
                <th>Buyer Name</th>
                <th>Offered Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.property_name}</td>
                  <td>{item.location}</td>
                  <td>{item.email}</td>
                  <td>{item.user_name}</td>
                  <td>${item.offered_price}</td>
                  <td className="text-[#Ed2027]">{item.status}</td>
                  <td>
                    {item.status === "pending" ? (
                      <>
                        <button
                          className="btn btn-ghost btn-sm text-white bg-[#ED2027]"
                          onClick={() => handleAccepted(item._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-ghost btn-sm text-white bg-[#ED2027]"
                          onClick={() => handleRejected(item._id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`status ${
                          item.status === "accepted"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RequestedProperties;
