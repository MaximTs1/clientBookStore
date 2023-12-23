import { Route, Routes } from "react-router-dom";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
} from "./pages";
import FavoriteProducts from "./pages/Products/FavoriteProducts";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup.js";
import UserInfo from "./pages/Auth/UserInfo";
import ChangePassword from "./pages/Auth/ChangePassword/ChangePassword";
import OrderHistoryPage from "./pages/OrderHistory/OrderHistoryPage ";
import LegalInfo from "./pages/About&Home/LegalInfo.js";
import   PurchaseInfo from "./pages/About&Home/PurchaseInfo.js";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="legalinfo" element={<LegalInfo />} />
      <Route path="purchaseinfo" element={<PurchaseInfo />} />
      <Route path="cart" element={<Cart />} />
      <Route path="userInfo" element={<UserInfo />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<SingleProduct />} />
      <Route path="favoriteproducts" element={<FavoriteProducts />} />
      <Route path="orderhistorypage" element={<OrderHistoryPage />} />
      <Route path="changepassword" element={<ChangePassword />} />

      <Route
        path="checkout"
        element={
          <Checkout />
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
