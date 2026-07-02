import { useAddToCartMutation } from "../slices/cartApiSlice";
import { toast } from "react-toastify";

function CardProducts({ product }) {
  const [addToCart] = useAddToCartMutation();

  const handleCart = async () => {
    try {
      await addToCart({
        productId: product._id,
      }).unwrap();
      toast.success("Poduct added Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  // console.log(handleCart);

  // console.log(product.img);
  return (
    <div className="card bg-base-100 shadow-sm w-full ">
      <figure>
        <img src={product.img} alt={product.title} />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{product.title}</h1>
        <p className="">{product.desc}</p>
        <div className="flex justify-between items-center">
          <span>${product.price}</span>
          {/* <Link> */}
          <button className="btn btn-success" onClick={handleCart}>
            Add TO Cart
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default CardProducts;
