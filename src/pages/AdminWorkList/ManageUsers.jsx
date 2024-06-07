import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useGetUser from "../../hooks/useGetUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { FaLock } from "react-icons/fa6";

const MangeUser = () => {
  const [users, refetch] = useGetUser();
  const axiosSecure = useAxiosSecure();

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.displayName} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleMakeAgent = (user) => {
    axiosSecure.patch(`/users/agent/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.displayName} is an Agent Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMarkFraud = (user) => {
    axiosSecure.patch(`/users/agentt/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.displayName} is Marked as FRAUD!!!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className=" text-center my-6">
        <h2 className="text-3xl font-bold">
          Manage <span className="text-[#ED2027]">Users</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.displayName}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : user.role === "fraud" ? (
                    "Fraud"
                  ) : (
                    <div>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm bg-[#ED2027] text-white"
                      >
                        <RiAdminLine className="text-2xl" />
                        Make Admin
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {user.role === "agent" && <span>Agent</span>}
                  {user.role === "agent" && (
                    <button
                      onClick={() => handleMarkFraud(user)}
                      className="btn btn-sm bg-[#ED2027] text-white ml-2"
                    >
                      <FaLock className="text-xl" />
                      Mark as Fraud
                    </button>
                  )}
                  {user.role === "fraud" && <span>Fraud</span>}
                  {user.role !== "agent" && user.role !== "fraud" && (
                    <div>
                      <button
                        onClick={() => handleMakeAgent(user)}
                        className="btn btn-sm bg-[#ED2027] text-white"
                      >
                        <FaUsers
                          className="text-white 
                                        text-2xl"
                        ></FaUsers>
                        Make Agent
                      </button>
                    </div>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center py-6">
        <Link to="/dashboard">
          <button className="btn bg-[#ED2028] text-white w-60">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default MangeUser;
