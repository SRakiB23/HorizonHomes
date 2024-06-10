import React from "react";
import CountUp from "react-countup";

function ExtraSectionOne() {
  return (
    <div className="max-w-screen-full mx-auto p-8 my-8">
      <div className=" max-w-screen-xl mx-auto ">
        <div className="">
          <div>
            <h2 className="text-[#ED2027] text-xl">Our Services</h2>
            <h3 className=" text-4xl font-bold">What We Do?</h3>
          </div>
          <div className="pt-4 md:flex gap-10 justify-between">
            <div>
              <img className="w-24 " src="buy.png" alt="" />
              <h3 className="text-2xl font-bold py-2">Buy A New Home</h3>
              <p className="text-lg">
                Discover your dream home effortlessly. Explore diverse
                properties and expert guidance for a seamless buying experience.
              </p>
            </div>
            <div>
              <img className="w-24" src="rent.png" alt="" />
              <h3 className="text-2xl font-bold py-2">Rent A House</h3>
              <p className="text-lg">
                Find the ideal rental with ease. Discover a wide range of
                postings that have been carefully customized to meet your
                particular lifestyle requirements.
              </p>
            </div>
            <div>
              <img className="w-24" src="sale.png" alt="" />
              <h3 className="text-2xl font-bold py-2">Sell A House</h3>
              <p className="text-lg">
                With professional advice and practical tactics, you can sell
                with assurance while highlighting the greatest qualities of your
                house for a quick sale.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="divider"></div>
          <div className="md:flex justify-around gap-10">
            <div className="flex items-center">
              <p className="pr-3 text-[#Ed2027] font-medium ">
                <CountUp
                  className="text-5xl font-bold"
                  end={86}
                  duration={20}
                />
              </p>
              <p className="text-xl font-bold">SATISFIED CLIENTS</p>
            </div>
            <div className="flex items-center">
              <p className="pr-3 text-[#Ed2027] font-medium ">
                <CountUp
                  className="text-5xl font-bold"
                  end={111}
                  duration={20}
                />
              </p>
              <p className="text-xl font-bold">AWARD RECIEVED</p>
            </div>
            <div className="flex items-center">
              <p className="pr-3 text-[#Ed2027] font-medium ">
                <CountUp className="text-6xl" end={32} duration={15} />
              </p>
              <p className="text-xl font-bold">SUCCESSFUL TRANSACTIONS</p>
            </div>
            <div className="flex items-center">
              <p className="pr-3 text-[#Ed2027] font-medium flex ">
                <CountUp className="text-6xl" end={100} duration={20} />{" "}
                <span className="text-3xl font-bold">+</span>
              </p>
              <p className="text-xl font-bold">Weekly Traffic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtraSectionOne;
