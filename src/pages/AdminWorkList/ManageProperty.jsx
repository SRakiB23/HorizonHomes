import React from "react";
import useProperties from "../../hooks/useProperties";
import Swal from "sweetalert2";
import handleVerifyStatus from "../../hooks/useHandleVerifyStatus";
import { Link, useParams } from "react-router-dom";

function ManageProperty() {
  const { _id } = useParams();
  const [properties, refetch] = useProperties();

  const handleAccepted = async (itemId) => {
    const response = await handleVerifyStatus(itemId, "verified");
    console.log(response);
    if (response.success) {
      refetch();
      Swal.fire({
        title: "Success",
        text: "Property verify successfully!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: response.message,
        icon: "error",
      });
    }
  };

  const handleRejected = async (itemId) => {
    try {
      const response = await handleVerifyStatus(itemId, "rejected");
      console.log(response);
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
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center py-4">
        Manage <span className="text-[#ED2027]">Property</span>
      </h2>
      <div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Property Name</th>
                  <th>Location</th>
                  <th>Agent Name</th>
                  <th>Agent Email</th>
                  <th>Offered Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.property_name}</td>
                    <td>{item.location}</td>
                    <td>{item.agent_name}</td>
                    <td>{item.agent_email}</td>
                    <td>{item.price_range}</td>
                    <td>{item.verification_status}</td>
                    <td>
                      {item.verification_status === "pending" ? (
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
                            item.verification_status === "verified"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.verification_status.charAt(0).toUpperCase() +
                            item.verification_status.slice(1)}
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
      <div className="text-center py-6">
        <Link to="/dashboard">
          <button className="btn bg-[#ED2027] text-white">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default ManageProperty;
