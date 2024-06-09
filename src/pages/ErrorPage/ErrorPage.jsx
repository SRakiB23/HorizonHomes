import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <img
        className="max-w-6xl mx-auto"
        src="https://i.ibb.co/qN2w850/20824297-6338750.jpg"
        alt=""
      />
      <div className="text-center">
        <Link to="/">
          <button className="btn bg-[#Ed2027] text-white text-xl">
            GO BACK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
