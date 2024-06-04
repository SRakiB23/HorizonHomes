import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import useAgent from "../hooks/useAgent";
import AgentDashBoard from "./AgentDashBoard";
import UserDashboard from "./UserDashboard";

function Dashboard() {
  const [isAgent] = useAgent();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center pt-10 pb-5 text-4xl font-bold ">
        Welcome to <span className="text-[#ED2027]">Dashboard!</span>
      </h2>
      {isAgent ? (
        <AgentDashBoard></AgentDashBoard>
      ) : (
        <UserDashboard></UserDashboard>
      )}
    </div>
  );
}

export default Dashboard;
