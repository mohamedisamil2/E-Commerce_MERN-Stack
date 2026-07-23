import { useDispatch } from "react-redux";
import CartItems from "../components/CartItems";
import {
  useClearItemCartMutation,
  useGetAllItemCartQuery,
} from "../slices/cartApiSlice";
import { toast } from "react-toastify";
import { clearCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function Carts() {
  const { data } = useGetAllItemCartQuery();

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

  const cart = Array.isArray(data) ? data : [];

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
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-36 h-20 rounded-full bg-gray-100 flex items-center justify-center transition hover:scale-110">
            <ShoppingBag
              className="text-blue-400"
              size={70}
              strokeWidth={1.5}
            />
          </div>

          <h2 className="text-xl font-semibold py-10">Your cart is empty</h2>

          <p className="mt-3 text-gray-500 text-center max-w-md">
            You haven't placed any orders yet. Start shopping to discover
            amazing products.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 px-8 py-3 bg-linear-to-r  from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Carts;
