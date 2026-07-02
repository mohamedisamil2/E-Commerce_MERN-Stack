import Catogries from "../components/Catogries";
import FeatureProducts from "../components/FeatureProducts";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
      <Catogries />
      <FeatureProducts/>
      <Footer />
    </div>
  );
}

export default Home;
