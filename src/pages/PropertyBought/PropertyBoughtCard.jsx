import { FaLocationArrow, FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

function PropertyBoughtCard({ item, refetch }) {
  const {
    property_name,
    _id,
    image,
    offered_price,
    location,
    status,
    agent_name,
    agent_image,
  } = item;
  return (
    <div>
      <div className="card card-compact w-[420px] max-hh-[700px] bg-base-100 shadow-xl">
        <figure>
          <img className="h-72 w-full" src={image} alt="property" />
        </figure>
        <div className="card-body">
          <div className="flex items-center  gap-4">
            <h2 className="text-2xl font-bold">{property_name}</h2>
          </div>
          <div className="flex justify-evenly">
            <p className="flex items-center gap-1 text-base">
              <FaLocationDot /> {location}
            </p>
            <p
              className={`text-lg flex items-center ${
                status === "accepted" || status === "bought"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <MdVerified /> {status}
            </p>
          </div>
          <p className="text-xl py-2 font-bold">
            Offered Amount: ${offered_price}
          </p>
          <p className="divider"></p>
          <div className="avatar flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-400">Agent:</h2>
            <div className="w-14 rounded-full flex">
              <img src={agent_image} />
            </div>
            <p className="text-lg font-bold">{agent_name}</p>
          </div>
          {status === "accepted" ? (
            <div className="pt-4 mx-auto">
              <Link to={`/payment/${_id}`}>
                <button className="btn text-white bg-[#Ed2027] w-36">
                  Pay
                </button>
              </Link>
            </div>
          ) : status === "bought" && item?.transcation_id ? (
            <div className="pt-4 mx-auto">
              <span className="text-blue-700 text-lg">
                Transaction ID: {item?.transcation_id}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PropertyBoughtCard;
