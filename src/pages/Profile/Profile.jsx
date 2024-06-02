import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold py-6">
        Welcome to My <span className="text-[#ED2027]">Profile</span>
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
        </form>
      </div>
    </div>
  );
}

export default Profile;
