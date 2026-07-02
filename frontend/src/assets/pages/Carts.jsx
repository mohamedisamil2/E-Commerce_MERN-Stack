import { useDispatch } from "react-redux";
import CartItems from "../components/CartItems";
import {
  useClearItemCartMutation,
  useGetAllItemCartQuery,
} from "../slices/cartApiSlice";
import { toast } from "react-toastify";
import { clearCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

function Carts() {
  const { data: cart } = useGetAllItemCartQuery();
  console.log("cart:", cart);

  // Clear
  const [clearAll] = useClearItemCartMutation();
  // const { clearedCart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClear = async () => {
    try {
      await clearAll().unwrap();
      dispatch(clearCart);
      toast.success("Cart Cleared Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="flex flex-col w-full md:w-2/5 p-4 bg-white shadow-md gap-6 mx-auto mt-20 rounded-md">
      {cart?.length > 0 ? (
        <>
          {cart?.map((item) => (
            <CartItems key={item._id} item={item} />
          ))}

          <span className="text-xl font-semibold">Items: {totalItems}</span>

          <span className="text-xl font-semibold">
            TotalPrice: ${totalPrice}
          </span>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
          <button
            className="btn btn-error w-full mx-auto text-2xl font-semibold"
            onClick={handleClear}
          >
            Clear
          </button>
        </>
      ) : (
        <h2 className="text-xl font-semibold py-10">Your cart is empty</h2>
      )}
    </div>
  );
}

export default Carts;
