// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import {
  useDeleteItemCartMutation,
  useUpdateQtyMutation,
} from "../slices/cartApiSlice";

function CartItems({ item }) {
  // console.log("item:", item);

  const [removeItem] = useDeleteItemCartMutation();

  // const navigate = useNavigate()

  const handleRemove = async () => {
    await removeItem(item.product).unwrap();
  };
  // console.log(handleRemove);

  const [updateQty] = useUpdateQtyMutation();

  console.log(item.product);
  console.log(item.qty + 1);
  const handleIncreaseQty = async () => {
    await updateQty({
      productId: item.product,
      qty: item.qty + 1,
    }).unwrap();
  };

  console.log(item.qty - 1);
  const handleDecreaseQty = async () => {
    try {
      if (item.qty <= 1) return;
      await updateQty({
        productId: item.product,
        qty: item.qty - 1,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  // const { qty, setIncrease } = useState(item.qty);

  // const handleIncrease = () => {
  //   setIncrease((prevQty) => prevQty + 1);
  // };
  // const handleDecrease = () => {
  //   if (qty > 1) {
  //     setIncrease((prevQty) => prevQty - 1);
  //   }
  // };

  return (
    <div className="flex flex-row items-center gap-4 space-x-20 p-6 ">
      <img src={item.img} alt={item.name} className="w-40 h-48" />
      <div className="flex flex-col gap-2 ">
        <h1>{item.name}</h1>
        <p>{item.desc}</p>
        <p>${item.price}</p>
        <p>{item.qty}</p>
        <div className="flex flex-row space-x-4 shadow-sm">
          <button className="btn btn-danger" onClick={handleDecreaseQty}>
            -
          </button>
          <p>{item.qty}</p>
          <button
            className="btn btn-success flex justify-end"
            onClick={handleIncreaseQty}
          >
            +
          </button>
        </div>

        <button className="btn btn-error" onClick={handleRemove}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItems;
