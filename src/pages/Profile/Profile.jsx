import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useGetUser from "../../hooks/useGetUser";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);
  const [users] = useGetUser();
  const roleCheck = users.find((item) => item?.email === user?.email);
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold py-6">
        Welcome to{" "}
        <span className="text-[#ED2027]">{roleCheck?.role || "User"}</span>
        <span className="]"> Profile</span>
      </h2>
      <div>
        <form className="w-1/2 mx-auto">
          <div className="avatar">
            <div className=" w-44 mask mask-squircle mx-auto">
              <img src={user?.photoURL} />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">User Role</span>
            </label>

            {roleCheck?.role && (
              <input
                type="text"
                defaultValue={roleCheck.role}
                readOnly
                className="input input-bordered"
              />
            )}
          </div>
        </form>
      </div>
      <div className="text-center py-6">
        <Link to="/dashboard">
          <button className="btn bg-[#ED2027] text-white">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
