import React from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import useWishlisted from "../../hooks/useWishlisted";
import { FaLocationDot } from "react-icons/fa6";
import useVerifiedProperties from "../../hooks/useVerifiedProperty";
import handleAdvertiseStatus from "../../hooks/useHandleAdvertise";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function AdvertieseProperty() {
  const [properti, refetch] = useVerifiedProperties();
  const axiosSecure = useAxiosSecure();

  const handleAccepted = async (itemId) => {
    try {
      console.log("advertised property with ID:", itemId);
      const response = await handleAdvertiseStatus(
        axiosSecure,
        itemId,
        "advertised"
      );
      console.log("Response from advertised property:", response);
      refetch();
      if (response.success) {
        Swal.fire({
          title: "Success",
          text: "Property advertised successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error advertised property:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to accept the property",
        icon: "error",
      });
    }
  };

  //   // Filter bought properties once
  //   const soldProperties = wishlist.filter((item) => item?.status === "bought");

  //   // Calculate total sold amount
  //   const totalSoldAmount = soldProperties.reduce((total, item) => {
  //     return total + parseFloat(item.sold_price);
  //   }, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-4xl py-5">
        Advertise <span className="text-[#Ed2027]">Properties</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="text-lg">
            <tr>
              <th></th>
              <th>Property Name</th>
              <th>Price Range</th>
              <th>Agent Name</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-xl">
            {properti.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <div className="image">
                    <div className="mask mask-square w-20 h-12">
                      <img src={item.image} alt="image" />
                    </div>
                  </div>
                </td>
                <td>{item.property_name}</td>
                <td>
                  ${item.price_range.min} -$
                  {item.price_range.max}
                </td>
                <td>{item.agent_name}</td>
                <td>
                  <button
                    className="btn btn-sm bg-[#Ed2027] text-white"
                    onClick={() => handleAccepted(item._id)}
                  >
                    Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center py-6">
        <Link to="/dashboard">
          <button className="btn bg-[#ED2027] text-white">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default AdvertieseProperty;
