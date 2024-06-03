import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center pt-10 pb-5 text-4xl font-bold ">
        Welcome to <span className="text-[#ED2027]">Dashboard!</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-6 text-center font-bold text-black text-xl">
        <Link to="/profile">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>My Profile</h3>
          </div>
        </Link>
        <Link to="/wishlist">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>WishList</h3>
          </div>
        </Link>
        <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
          <h3>Property Bougth</h3>
        </div>
        <Link to="/reviews">
          <div className="bg-slate-100 shadow-xl p-5 rounded-xl border-4 border-b-[#ED2027]">
            <h3>My Reviews</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
