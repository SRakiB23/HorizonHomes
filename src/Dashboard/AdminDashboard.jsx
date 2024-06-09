import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAgent from "../hooks/useAgent";
import useGetUser from "../hooks/useGetUser";

function AdminDashboard() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 text-center font-bold text-black text-xl">
        <Link to="/profile">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Admin Profile</h3>
          </div>
        </Link>
        <Link to="/manageproperty">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Manage Property</h3>
          </div>
        </Link>
        <Link to="/manageuser">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Manage Users</h3>
          </div>
        </Link>
        <Link to="/managereviews">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Manage Reviews</h3>
          </div>
        </Link>
        <Link to="/advertiseproperty">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>Adverstise Property</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
