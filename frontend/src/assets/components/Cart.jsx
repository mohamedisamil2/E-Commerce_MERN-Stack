import { ShoppingCart } from "lucide-react";
import { useGetAllItemCartQuery } from "../slices/cartApiSlice";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

function Cart() {
  // qty in cart
  const { data: cart = [] } = useGetAllItemCartQuery();
  // const { cartItems } = useSelector((state) => state.cart);
  console.log("Cart=", cart);
  console.log("isArray=", Array.isArray(cart));

  // const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  let totalItems = 0;

  if (Array.isArray(cart)) {
    totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  }

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
          <span className="text-xl font-bold text-red-600  ">{totalItems}</span>
        )}
      </div>
    </div>
  );
}

export default Cart;
