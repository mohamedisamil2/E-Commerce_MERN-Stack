import { HeadphonesIcon, PackageOpen, Shield, Truck } from "lucide-react";
import { useGetOrderQuery } from "../slices/orderApiSlice";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useGetOrderQuery();
  console.log("orders", orders);

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center transition hover:scale-110">
            <PackageOpen
              className="text-blue-400"
              size={70}
              strokeWidth={1.5}
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            No Orders Yet
          </h2>

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
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div
              className="
              flex
               items-center
        gap-4
        p-6
        bg-white
        rounded-2xl
        shadow-sm
        border
    "
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <Shield className="text-blue-600" />
              </div>

              <div>
                <h3 className="font-semibold">Secure Payment</h3>

                <p className="text-gray-500 text-sm">100% secure & trusted</p>
              </div>
            </div>
            <div
              className="
              flex
               items-center
        gap-4
        p-6
        bg-white
        rounded-2xl
        shadow-sm
        border
    "
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <HeadphonesIcon className="text-blue-600" />
              </div>

              <div>
                <h3 className="font-semibold">24/7 Support</h3>

                <p className="text-gray-500 text-sm">We're here to help</p>
              </div>
            </div>
            <div
              className="
              flex
               items-center
        gap-4
        p-6
        bg-white
        rounded-2xl
        shadow-sm
        border
    "
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <Truck className="text-blue-600" />
              </div>

              <div>
                <h3 className="font-semibold">Fast Delivery</h3>

                <p className="text-gray-500 text-sm">Get Your Orders Quickly</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow-md p-6 mb-6">
            <h2>Order ID: {order._id}</h2>

            <p>Total: ${order.totalPrice}</p>

            <p>Status: {order.status}</p>

            <p>{order.shippingAddress.address}</p>

            <button className="btn btn-primary">View Details</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
