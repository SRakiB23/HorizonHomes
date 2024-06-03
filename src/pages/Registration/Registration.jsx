import { useContext, useEffect, useState } from "react";
import AOS from "aos";
import { useForm } from "react-hook-form";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser } = useContext(AuthContext); // Assuming AuthContext handles Firebase interaction
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null); // State for server errors
  const useAxios = useAxiosPublic(); // Assuming useAxiosPublic is the hook instance

  useEffect(() => {
    AOS.init();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const displayName = form.get("displayName");
    const email = form.get("email");
    const photoURL = form.get("photoURL");
    const password = form.get("password");

    // Password validation
    const validatePassword = (password) => {
      const upperCase = /[A-Z]/;
      const lowerCase = /[a-z]/;
      const length = /^.{6,}$/; // Check if the password meets all requirements
      const hasUppercase = upperCase.test(password);
      const hasLowercase = lowerCase.test(password);
      const hasMinLength = length.test(password);
      return hasUppercase && hasLowercase && hasMinLength;
    };

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      // **1. Create User in Firebase Authentication:**
      const firebaseUser = await createUser(email, password); // Assuming createUser handles Firebase

      // **2. Prepare User Data for MongoDB:**
      const userData = {
        displayName,
        email,
        photoURL,
        // Include any additional user data you want to store in MongoDB
      };

      // **3. Save User Data in MongoDB:**
      const mongoResponse = await useAxios.post("/users", userData);
      console.log("MongoDB response:", mongoResponse.data);

      // **4. Optional: Create User Context (if using Context API):**
      // If you're using Context API for user state management, create a user object and dispatch it to the context provider.
      // This example assumes you have a `setUser` function in your AuthContext.

      // const user = {
      //   displayName,
      //   email,
      //   // Include any additional user data you want to manage in context
      // };
      // setUser(user);

      toast.success("Registration Successful");
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.error("Registration error:", error);
      setServerError("Registration failed, please try again.");
    }
  };

  return (
    <div className="">
      <div className="hero min-h-screen bg-opacity-65 bg-white">
        <div data-aos="fade-down" data-aos-duration="1500">
          <div className="hero-content">
            <div className="text-center lg:text-left">
              <h1 className="text-6xl font-bold">
                Register Now <span className="text-[#ED2027]">!</span>
              </h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl">
              <form onSubmit={handleRegister} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    name="displayName"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo Url</span>
                  </label>
                  <input
                    type="text"
                    name="photoURL"
                    placeholder="PhotoURL"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered"
                    required
                  />
                  <span
                    className="relative bottom-8 left-72"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-[#ED2027] text-white">
                    Register
                  </button>
                </div>
                <p>
                  Have an Account! Please
                  <Link
                    to="/login"
                    className="underline pl-2 text-blue-600 font-bold"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
