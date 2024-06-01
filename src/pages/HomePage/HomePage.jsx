import Advertisement from "../../components/Advertisement/Advertisement";
import Banner from "../../components/Banner/Banner";
import Location from "../../components/Location/Location";
import Reviews from "../../components/Reviews/Reviews";

function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <Advertisement></Advertisement>
      <Reviews></Reviews>
      {/* <Location></Location> */}
    </div>
  );
}

export default HomePage;
