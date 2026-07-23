import { ShoppingCart } from "lucide-react";
import { useGetAllItemCartQuery } from "../slices/cartApiSlice";

function Cart() {

  // qty in cart
  const { data: cart = [] } = useGetAllItemCartQuery();

  console.log("isArray=", Array.isArray(cart));

  let totalItems = 0;

  if (Array.isArray(cart)) {
    totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  }


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
