import asyncHandler from "express-async-handler";
import Orders from "../Models/ordersModel.js";
import Carts from "../Models/cartsModel.js";

//
const createOrders = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;

  const cart = await Carts.findOne({ user: req.user._id });
  console.log("user:", req.user._id);

  console.log("items:", cart.cartItems);
  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    res.status(400);
    throw new Error("Cart is Empty");
  }

  // count price
  const totalPrice = cart.cartItems.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  // create orders
  const order = await Orders.create({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalPrice,
    shippingAddress,
  });

  console.log("order", order);
  // clear the cart after request

  cart.cartItems = [];
  await cart.save();

  res.status(201).json(order);
  console.log(order);
});

//
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({
    user: req.user._id,
  }).sort("-CreatedAt");
  res.status(200).json(orders);
});

export { createOrders, getOrders };
