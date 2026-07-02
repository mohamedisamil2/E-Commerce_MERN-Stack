import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

const Products = mongoose.model("Products", productSchema);

export default Products;
