import { ShoppingCart } from "lucide-react";
import { useGetAllItemCartQuery } from "../slices/cartApiSlice";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

function Cart() {
  // qty in cart
  const { data: cart = [] } = useGetAllItemCartQuery();
  // const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  console.log(cart);

  // const navigate = useNavigate();

  // const handleCart = () => {
  //   navigate("/carts");
  // };

  return (
    <div className="relative">
      <ShoppingCart />
      <div className="absolute -top-5 -right-1  ">
        {totalItems > 0 ? (
          <span className="text-xl font-bold text-green-600  ">
            {totalItems}
          </span>
        ) : (
          <span className="text-xl font-bold text-red-600  ">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
}

export default Cart;
