import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./assets/pages/Home.jsx";
import Login from "./assets/pages/Login.jsx";
import Register from "./assets/pages/Register.jsx";
import Products from "./assets/pages/Products.jsx";
import Carts from "./assets/pages/Carts.jsx";
import Profile from "./assets/pages/Profile.jsx";
import Orders from "./assets/pages/Orders.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import CheckOut from "./assets/pages/CheckOut.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<Products />} />
      <Route path="/carts" element={<Carts />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/orders" element={<Orders />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
);
