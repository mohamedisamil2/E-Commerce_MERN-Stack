import { useSearchParams } from "react-router-dom";
import CardProducts from "../components/CardProducts";
import { useGetProductsQuery } from "../slices/productApiSlice";

function Products() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const { data: products = [] } = useGetProductsQuery(keyword);
  if (!products)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <CardProducts key={product._id} product={product} />
        //     <>
        //     <a href="" className="hover-3d my-12 mx-2 cursor-pointer">
        //   <div></div>
        //   <div></div>
        //   <div></div>
        //   <div></div>
        //   <div></div>
        //   <div></div>
        //   <div></div>
        //   <div></div>
        //   </>
        // </a>
      ))}
    </div>
  );
}

export default Products;
