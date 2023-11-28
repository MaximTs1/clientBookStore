import { Route, Routes } from "react-router-dom";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
} from "./pages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<SingleProduct />} />
      <Route
        path="checkout"
        element={
          // <PrivateRoute>
          <Checkout />
          // </PrivateRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
