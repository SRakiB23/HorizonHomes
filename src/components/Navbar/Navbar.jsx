import { Link, NavLink } from "react-router-dom";
import "animate.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext) || {};
  const [showName, setShowName] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        // console.log(result);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const toggleName = () => {
    setShowName(!showName);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/assignments">All Properties</NavLink>
      </li>
      <li>
        <NavLink to="/createassignment">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/pendingassignment">Login</NavLink>
      </li>
    </>
  );

  const navLinks2 = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/assignments">All Properties</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Registration</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar md:max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user ? navLinks : navLinks2}
            </ul>
          </div>

          <div className="animate__animated animate__backInLeft">
            <Link to="/" className="flex items-center">
              <img
                className="w-12 h-10"
                src="https://i.ibb.co/hM5f1qB/Screenshot-2024-05-31-at-9-02-02-PM.png"
                alt=""
              />
              <p className="text-2xl font-bold ml-1">HorizonHomes</p>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? navLinks : navLinks2}
          </ul>
        </div>
        <div className="md:pl-8">
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
              onChange={(e) => {
                if (e.target.checked) {
                  document.body.setAttribute("data-theme", "dark");
                  document.body.classList.add("text-white");
                  document.body.classList.remove("text-black");
                } else {
                  document.body.setAttribute("data-theme", "light");
                  document.body.classList.add("text-black");
                  document.body.classList.remove("text-white");
                }
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
        <div className="navbar-end flex items-center">
          {user?.email ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <img src={user ? user?.photoURL : ""} alt="user profile" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <NavLink to="/attemptedassignment">
                        My Attempted Assignments
                      </NavLink>
                    </li>
                    <li className="font-bold text-xl">
                      <button className="btn bg-red-400" onClick={handleLogOut}>
                        LogOut
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // <Link to="/login" className="btn bg-yellow-400 ml-2 font-bold">
            //   Login
            // </Link>
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
