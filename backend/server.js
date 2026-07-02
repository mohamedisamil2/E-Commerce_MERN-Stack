import express from "express";
//morgan import
import morgan from "morgan";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usersRoute from "./Routes/usersRoute.js";
import productsRoute from "./Routes/productsRoute.js";
import cartsRoute from "./Routes/cartsRoute.js";
import ordersRoute from "./Routes/ordersRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const port = process.env.PORT;

connectDB();
console.log("MONGO URL:", process.env.MONGO_URL);

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();

// images
app.use(
  "/images",
  express.static(path.join(__dirname, "backend", "public", "images")),
);
console.log(path.join(__dirname, "backend", "public", "images"));
app.get("/", (req, res) => {
  res.send("Server is Ready");
});

// Users Router
app.use("/api/users", usersRoute);

// Products Router
app.use("/api/products", productsRoute);

// Carts Router
app.use("/api/carts", cartsRoute);

// Orders Router
app.use("/api/orders", ordersRoute);

// Error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
