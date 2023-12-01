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
import FavoriteProducts from "./pages/Products/FavoriteProducts";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import UserInfo from "./pages/Auth/UserInfo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="cart" element={<Cart />} />
      <Route path="userInfo" element={<UserInfo />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<SingleProduct />} />
      <Route path="favoriteproducts" element={<FavoriteProducts />} />

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
