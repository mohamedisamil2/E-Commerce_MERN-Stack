import asyncHandler from "express-async-handler";
import Products from "../Models/productsModel.js";

// get all product
const getAllProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;

  let filter = {};

  if (keyword) {
    filter = {
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          categories: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    };
  }
  const product = await Products.find(filter);
  res.status(200).json(product);
  console.log(product);
});

// get product By Id
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ title: req.params.title });

  if (product) {
    res.json(product);
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});

export { getAllProducts, getProductsById };
