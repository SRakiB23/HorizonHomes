import React from "react";
import { Link } from "react-router-dom";
import useAgent from "../hooks/useAgent";
import useGetUser from "../hooks/useGetUser";

function AgentDashBoard() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 text-center font-bold text-black text-xl">
        <Link to="/profile">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Agent Profile</h3>
          </div>
        </Link>
        <Link to="/addproperty">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Add Property</h3>
          </div>
        </Link>
        <Link to="/addedproperties">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>My Added Properties</h3>
          </div>
        </Link>
        <Link to="/wishlist">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>My Sold Properties</h3>
          </div>
        </Link>
        <Link to="/wishlist">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Requested Properties</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AgentDashBoard;
