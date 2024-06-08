import React from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import useWishlisted from "../../hooks/useWishlisted";
import { FaLocationDot } from "react-icons/fa6";

function SoldProperties() {
  const [wishlist] = useWishlisted();

  // Filter bought properties once
  const soldProperties = wishlist.filter((item) => item?.status === "bought");

  // Calculate total sold amount
  const totalSoldAmount = soldProperties.reduce((total, item) => {
    return total + parseFloat(item.sold_price);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-4xl py-5">
        My Sold <span className="text-[#Ed2027]">Properties</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>Property Name</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Sold Price</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-xl">
            {soldProperties.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.property_name}</td>
                <td>{item.location}</td>
                <td>{item.user_name}</td>
                <td>{item.email}</td>
                <td>${item.sold_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-center font-bold text-2xl mt-6">
        Total Sold Amount:{" "}
        <span className="text-[#Ed2027] font-bold text-3xl">
          {" "}
          ${totalSoldAmount.toFixed(2)}
        </span>
      </h2>
      <div className="text-center py-6">
        <Link to="/dashboard">
          <button className="btn bg-[#ED2027] text-white">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default SoldProperties;
