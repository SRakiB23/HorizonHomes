import React from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div>
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

export default UserDashboard;
