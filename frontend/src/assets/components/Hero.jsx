import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="">
      <div className="container mx-auto grid lg:grid-cols-2 items-center min-h-[85vh] px-6">
        {/* left */}
        <div className="space-y-4">
          <span className="badge badge-primary badge-lg">
            NEW COLLECTION 2026
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Upgrade <br />
            Your Style
          </h1>

          <p className="text-gray-400 text-lg max-w-lg">
            Discover premium fashion with high quality, affordable prices, and
            fast delivery worldwide.
          </p>

          <div className="flex gap-4">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            <Link to="/products" className="btn btn-outline btn-accent btn-lg">
              Explore
            </Link>
          </div>
        </div>
        {/* Right */}
        <div className="flex justify-center">
          <img
            src="/Hero.jpg"
            alt="Hero"
            className="max-w-xl drop-shadow-2xl"
            // width={36}
            // height={36}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
