import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

function AgentDashBoard() {
  const [users] = useGetUser();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Access logged-in user from AuthContext

  useEffect(() => {
    if (users && user) {
      const isLoggedInUserFraudulent = users.some(
        (userItem) =>
          userItem.email === user.email && userItem.fraud === "fraud"
      );

      if (isLoggedInUserFraudulent) {
        // Potentially use navigate to redirect if fraud is detected
      } else {
      }
    }
  }, [users, user]); // Dependencies for updates

  const handleAddPropertyClick = (event) => {
    const isLoggedInUserFraudulent = users.some(
      (userItem) => userItem.email === user.email && userItem.fraud === "fraud"
    );

    if (isLoggedInUserFraudulent) {
      event.preventDefault(); // Prevent navigation
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You have been marked as fraud and cannot add properties.",
      });
    } else {
      // Navigate to Add Property page
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
        <Link to="/addproperty" onClick={handleAddPropertyClick}>
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Add Properties</h3>
          </div>
        </Link>
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
