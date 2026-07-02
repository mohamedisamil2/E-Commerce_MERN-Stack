import { useGetOrderQuery } from "../slices/orderApiSlice";

function Orders() {
  const { data: orders = [], isLoading } = useGetOrderQuery();
  console.log("orders", orders);

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <h2>No Orders Yet</h2>
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
