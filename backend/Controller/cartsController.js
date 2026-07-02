import asyncHandler from "express-async-handler";
import Products from "../Models/productsModel.js";
import Carts from "../Models/cartsModel.js";

// method   POST /api/carts
// desc     add to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;

  console.log(req.body.productId);
  // find the product by id
  const product = await Products.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  // added to cart
  let cart = await Carts.findOne({ user: req.user._id });

  // create cart is not found cart
  if (!cart) {
    cart = new Carts({
      user: req.user._id,
      cartItems: [],
    });
  }

  const existItem = cart.cartItems.find(
    (item) => item.product && item.product.toString() === productId,
  );

  //
  if (existItem) {
    existItem.qty += qty;
  } else {
    cart.cartItems.push({
      product: product._id,
      img: product.img,
      name: product.title,
      desc: product.desc,
      price: product.price,
      qty: 1,
    });
  }
  console.log(cart.cartItems);

  // save cart item
  const updateCart = await cart.save();
  res.status(201);
  res.json(updateCart);
});

// method   POST /api/carts
// desc     get items from cart
const getItemByIdFromCart = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
  // const { productId } = req.body;

  // let cart = await Carts.findOne({ user: req.user._id });

  // if (!cart) {
  //   res.status(404);
  //   throw new Error("Cart not found");
  // }

  // const items = cart.cartItems.find(
  //   (item) => item.product.toString() === productId,
  // );

  // if (!items) {
  //   res.status(404);
  //   throw new Error(" Cart is empty");
  // }

  // res.json(items);
  // console.log(items);
});

// method   POST /api/carts
// desc     get items from cart
const getAllItemFromCart = asyncHandler(async (req, res) => {
  // const { userId } = req.body;

  let cart = await Carts.findOne({ user: req.user._id });

  if (!cart) {
    return res.json({ cartItems: [] });
  }

  res.json(cart.cartItems);
});

// update qty in cart decrease and increase
const updateQtyInCart = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { productId, qty } = req.body;

  const cart = await Carts.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Carts not found");
  }

  console.log("productId from body:", productId);
  console.log(
    "products in cart:",
    cart.cartItems.map((i) => ({
      product: i.product.toString(),
      qty: i.qty,
    })),
  );

  console.log("productId:", productId);

  cart.cartItems.forEach((el) => {
    console.log(el.product);
  });

  const item = cart.cartItems.find((el) => el.product.toString() === productId);

  if (!item) {
    res.status(404);
    throw new Error("Items not found");
  }

  item.qty = qty;
  await cart.save();

  res.json(cart.cartItems);
});

// remove item from cart
const deleteItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    res.status(400);
    throw new Error("productId is required");
  }

  // 🔥 حذف المنتج مباشرة من قاعدة البيانات
  const result = await Carts.updateOne(
    { user: req.user._id }, // جلب سلة المستخدم
    {
      $pull: {
        cartItems: {
          product: productId, // حذف المنتج المطابق
        },
      },
    },
  );

  // إذا لم يتم العثور على السلة
  if (result.matchedCount === 0) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.json({
    message: "Item removed from cart successfully",
    result,
  });
  // const cart = await Carts.findOne({ user: req.user._id });

  // const beforeLength = cart.cartItems.length;

  // cart.cartItems = cart.cartItems.filter(
  //   (item) => item.product.toString() !== productId,
  // );

  // if (beforeLength === cart.cartItems.length) {
  //   res.status(404);
  //   throw new Error("Product not found in cart");
  // }

  // const updateCart = await cart.save();

  // res.json(updateCart);
});

// Clear Item From Cart
// const { productId } = req.body;
const clearItemFromCart = asyncHandler(async (req, res) => {

  const cart = await Carts.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.cartItems = [];

  const clearCart = await cart.save();

  res.json({
    message: "Cart cleared successfully",
    clearCart,
  });
});

export {
  addToCart,
  getItemByIdFromCart,
  getAllItemFromCart,
  updateQtyInCart,
  deleteItemFromCart,
  clearItemFromCart,
};
