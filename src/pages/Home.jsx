import Carousel from "../components/Carousel";
import TabCategories from "../components/TabCategories";

const Home = () => {
  return (
    <section className="p-2 md:p-6">
      <Carousel />
      <TabCategories />
    </section>
  );
};

export default Home;