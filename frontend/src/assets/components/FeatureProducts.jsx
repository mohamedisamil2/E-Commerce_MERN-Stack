import { useGetProductsQuery } from "../slices/productApiSlice";
import CardProducts from "./CardProducts";

function FeatureProducts() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">Featured Products</h2>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
        {products.slice(0, 6).map((product) => (
          <CardProducts key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeatureProducts;
