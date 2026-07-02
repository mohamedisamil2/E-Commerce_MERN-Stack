import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Products",
          required: true,
        },
        name: String,
        img: String,
        desc: String,
        price: Number,
        qty: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Carts = mongoose.model("Carts", cartSchema);

export default Carts;
