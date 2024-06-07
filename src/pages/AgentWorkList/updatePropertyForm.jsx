import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useParams } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatePropertyForm = ({ item }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { property_name } = item;
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

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

    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const propertyItem = {
        property_name: data.property_name,
        price_range: priceRange,
        location: data.location,
        image: res.data.data.display_url,
        verification_status: "pending",
        agent_name: user?.displayName,
        agent_email: user?.email,
        agent_image: user?.photoURL,
      };
      console.log(propertyItem);

      const propertyRes = await axiosSecure.patch(
        `/properties/${id}`,
        propertyItem
      );
      console.log(propertyRes.data);
      if (propertyRes.data.modifiedCount > 0) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.property_name} is Updated Successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
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
              <span className="label-text">Property Title*</span>
            </label>
            <input
              type="text"
              placeholder="Property Name"
              defaultValue={item.property_name}
              {...register("property_name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* location */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Property Location*</span>
              </label>
              <input
                type="text"
                defaultValue={item.location}
                placeholder="Location"
                {...register("location", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Min Price*</span>
              </label>
              <input
                type="number"
                placeholder="Min Price"
                defaultValue={item.price_range?.min}
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
                defaultValue={item.price_range?.max}
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
              <span className="label-text text-xl">Update Image</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn w-full bg-[#ED2027] text-white font-bold text-lg">
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyForm;
