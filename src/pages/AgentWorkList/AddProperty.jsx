import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (user?.fraud === "fraud") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You have been marked as fraud and cannot add properties.",
      });
      return;
    }

    console.log(data);

    // Validate and combine min_price and max_price
    const minPrice = parseFloat(data.min_price);
    const maxPrice = parseFloat(data.max_price);

    if (
      isNaN(minPrice) ||
      minPrice < 0 ||
      isNaN(maxPrice) ||
      maxPrice < minPrice
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Price Range",
        text: "Please enter a valid price range with min >= 0 and max >= min.",
      });
      return;
    }

    const priceRange = { min: minPrice, max: maxPrice };

    // Image upload to imgbb and then get a URL
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
        // authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
    if (res.data.success) {
      // Send the property item data to the server with the image URL
      const propertyItem = {
        property_name: data.property_name,
        price_range: priceRange,
        location: data.location,
        image: res.data.data.display_url,
        verification_status: "pending",
        agent_name: user?.displayName,
        agent_email: user?.email,
        agent_image: user?.photoURL,
        description: data.description,
      };

      const propertyRes = await axiosPublic.post("/properties", propertyItem);
      console.log(propertyRes.data);
      if (propertyRes.data.insertedId) {
        // Show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.property_name} is added successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Property Name*</span>
            </label>
            <input
              type="text"
              placeholder="Property Name"
              {...register("property_name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* location */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Location*</span>
              </label>
              <input
                type="text"
                placeholder="Location"
                {...register("location", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* price range */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Min Price*</span>
              </label>
              <input
                type="number"
                placeholder="Min Price"
                {...register("min_price", { required: true, min: 0 })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Max Price*</span>
              </label>
              <input
                type="number"
                placeholder="Max Price"
                {...register("max_price", { required: true, min: 0 })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* agent details */}
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Agent Name*</span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={user?.displayName}
                {...register("agent_name", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Agent Email*</span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={user?.email}
                {...register("agent_email", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Description*</span>
            </label>
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn w-full bg-[#ED2027] text-white font-bold text-lg">
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
