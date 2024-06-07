import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAgentAddProperty from "../../hooks/useAgentAddProperty";

function AddedPropertiesCard({ item, refetch }) {
  //   const [refetch] = useAgentAddProperty();
  const axiosSecure = useAxiosSecure();
  const {
    property_name,
    image,
    _id,
    price_range,
    location,
    verification_status,
    description,
    agent_name,
    agent_image,
  } = item;

  const handleDelete = (_id) => {
    if (!_id) {
      console.error("Property ID is undefined");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/properties/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Property is deleted successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            // Handle deletion errors here
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Deletion failed!",
              text: "An error occurred during deletion.",
            });
          });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="card card-compact w-[400px] h-[600px] bg-base-100 shadow-xl">
          <figure>
            <img className="h-[220px] w-full" src={image} alt="property" />
          </figure>
          <div className="card-body">
            <div className="flex items-center  gap-4">
              <h2 className="text-2xl font-bold">{property_name}</h2>
              <p className="flex items-center text-green-600">
                <MdVerified className="text-xl" /> {verification_status}
              </p>
            </div>
            <p className="flex items-center gap-1 text-base">
              <FaLocationDot /> {location}
            </p>
            <p className="text-xl py-2 font-bold">
              ${price_range.min} - ${price_range.max}
            </p>
            <p className="divider"></p>
            <div className="avatar flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-400">Agent:</h2>
              <div className="w-14 rounded-full flex">
                <img src={agent_image} />
              </div>
              <p className="text-lg font-bold">{agent_name}</p>
            </div>
            <div className="flex justify-evenly pt-4">
              {verification_status !== "rejected" && (
                <Link to={`/updateproperty/${_id}`}>
                  <button className="btn text-white bg-[#Ed2027] w-36">
                    Update
                  </button>
                </Link>
              )}
              <button
                className="btn text-white bg-[#Ed2027] w-36"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedPropertiesCard;
