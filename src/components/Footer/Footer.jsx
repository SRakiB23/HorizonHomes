import { BsBuildingFillCheck } from "react-icons/bs";
import { FaPhone, FaRegCopyright, FaVoicemail } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="p-10 py-20 mt-10 bg-[#0E1A30] text-white">
      <footer className="footer max-w-7xl mx-auto">
        <div>
          <div className="flex gap-1 items-center">
            <img className="w-16" src="logo.png" alt="" />
            <p className="text-3xl font-bold">HorizonHomes</p>
          </div>
          <p className="">
            Explore endless searching and boundless finding <br />
            with our property collection <br /> Join our vibrant community!
          </p>
          <p className="text-gray-500 flex items-center gap-2">
            <FaRegCopyright />
            2024 All rights reserved by HorizonHomes.
          </p>
        </div>
        <nav>
          <h6 className="footer-title text-xl">Contact Info</h6>
          <a className="link link-hover">Dhanmondi, Dhaka</a>
          <a className="link link-hover flex items-center gap-2">
            <FaPhone /> (+88) 01254879954
          </a>
          <a className="link link-hover flex items-center gap-2">
            <HiOutlineMailOpen className="text-xl" /> hello@horizonhomes.com
          </a>
        </nav>
        <nav>
          <h6 className="footer-title text-xl">Recent Listing</h6>
          <a className="link link-hover">Investment in Real State</a>
          <a className="link link-hover">Property buying guidance</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.twitter.com/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="https://www.facebook.com/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
          <p className="text-xl font-bold">Join Us!</p>
          <form>
            <input
              type="text"
              placeholder="Email address"
              className="w-1/2 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
