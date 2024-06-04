import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const propertyItem = {
        property_name: data.property_name,
        price_range: parseFloat(data.price_range),
        location: data.location,
        image: res.data.data.display_url,
        verification_status: "pending",
        agent_name: user?.displayName,
        agent_email: user?.email,
        agent_image: user?.photoURL,
        description: data.description,
      };

      const propertyRes = await axiosSecure.post("/properties", propertyItem);
      console.log(propertyRes.data);
      if (propertyRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.property_name} is added to the menu.`,
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

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price_range", { required: true })}
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
