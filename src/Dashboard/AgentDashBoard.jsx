import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAgent from "../hooks/useAgent";
import useGetUser from "../hooks/useGetUser";
import Swal from "sweetalert2";

function AgentDashBoard() {
  const [users] = useGetUser();
  const navigate = useNavigate();

  // Check if any user is marked as fraud
  const hasFraudulentUser = users.some((user) => user.fraud === "fraud");

  // Function to handle "Add Property" click
  const handleAddPropertyClick = () => {
    // If any user is marked as fraud, show SweetAlert
    if (hasFraudulentUser) {
      Swal.fire({
        icon: "error",
        title: "You have been marked as fraud",
        text: "You are not allowed to add properties.",
      });
    }
    // Otherwise, navigate to the "Add Property" page
    else {
      navigate("/addproperty");
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 text-center font-bold text-black text-xl">
        <Link to="/profile">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Agent Profile</h3>
          </div>
        </Link>
        <div onClick={handleAddPropertyClick}>
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Add Property</h3>
          </div>
        </div>
        <Link to="/addedproperties">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>My Added Properties</h3>
          </div>
        </Link>
        <Link to="/soldproperties">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>My Sold Properties</h3>
          </div>
        </Link>
        <Link to="/requestedproperties">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Requested Properties</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AgentDashBoard;
