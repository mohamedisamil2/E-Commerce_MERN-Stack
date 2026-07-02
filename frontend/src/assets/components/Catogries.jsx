import { Link } from "react-router-dom";

const categories = [
  {
    title: "Shoes",
    image: "/images/Sneaker-1.jpg",
  },
  {
    title: "T-Shirts",
    image: "/images/T-Shirt-1.jpg",
  },
  {
    title: "Jackets",
    image: "/images/Jacket-1.jpg",
  },
  {
    title: "Backpacks",
    image: "/images/backpack-1.jpg",
  },
];
function Catogries() {
  // const [searchParams] = useParams()
  // const keyword =

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">Shop By Category</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={`/products?keyword=${category.title}`}
            className="card bg-base-100 shadow-xl hover:scale-105 duration-300"
          >
            <figure>
              <img
                src={category.image}
                alt={category.title}
                className="h-72 w-full object-cover"
              />
            </figure>

            <div className="card-body items-center">
              <h2 className="card-title">{category.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Catogries;
