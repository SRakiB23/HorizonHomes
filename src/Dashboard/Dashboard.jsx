import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import useAgent from "../hooks/useAgent";
import AgentDashBoard from "./AgentDashBoard";
import UserDashboard from "./UserDashboard";
import useAdmin from "../hooks/useAdmin";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const [isAgent] = useAgent();
  const [isAdmin] = useAdmin();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center pt-10 pb-5 text-4xl font-bold ">
        Welcome to <span className="text-[#ED2027]">Dashboard!</span>
      </h2>
      {isAdmin ? (
        // If user is an admin
        <AdminDashboard />
      ) : isAgent ? (
        // If user is an agent
        <AgentDashBoard />
      ) : (
        // If user is not an admin or an agent (assuming it's a regular user)
        <UserDashboard />
      )}
    </div>
  );
}

export default Dashboard;
