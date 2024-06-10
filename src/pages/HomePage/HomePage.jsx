import Advertisement from "../../components/Advertisement/Advertisement";
import Banner from "../../components/Banner/Banner";
import ExtraSectionOne from "../../components/ExtraSectionOne/ExtraSectionOne";
import ExtraSectionTwo from "../../components/ExtraSectionOne/ExtraSectionTwo";
import Location from "../../components/Location/Location";
import Reviews from "../../components/Reviews/Reviews";

function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <Advertisement></Advertisement>
      <Reviews></Reviews>
      <ExtraSectionOne></ExtraSectionOne>
      <ExtraSectionTwo></ExtraSectionTwo>
      {/* <Location></Location> */}
    </div>
  );
}

export default HomePage;
