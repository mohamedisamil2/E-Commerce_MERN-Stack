import { useGetAllItemCartQuery } from "../slices/cartApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkOutSchema } from "../schemas/checkOutSchema";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";

function CheckOut() {
  const { data: cart = [] } = useGetAllItemCartQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  // Total Items
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checkOutSchema) });

  //
  const submitHandler = async (data) => {
    try {
      await createOrder({
        shippingAddress: data,
      }).unwrap();
      toast.success("Order Created Successfully");
      navigate("/orders");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="conatiner mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-2">CheckOut</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

        <div className="flex flex-col gap-2">
          <label>Adress</label>
          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            className="input input-bordered w-full"
            {...register("city")}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label>Country</label>
          <input
            type="text"
            placeholder="Country"
            className="input input-bordered w-full"
            {...register("country")}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </div>

        <button className="btn btn-primary w-full" disabled={isLoading}>
          Place Order
        </button>
      </form>
      {/* Summary */}

      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.product} className="flex justify-between mb-3">
            <div className="flex gap-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 rounded"
              />

              <div>
                <h3>{item.name}</h3>

                <p>
                  {item.qty} × ${item.price}
                </p>
              </div>
            </div>

            <span>${item.qty * item.price}</span>
          </div>
        ))}

        <hr className="my-5" />

        <div className="flex justify-between">
          <span>Total Items</span>

          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between mt-3">
          <span>Total Price</span>

          <span className="font-bold">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
