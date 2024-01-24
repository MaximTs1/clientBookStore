import { Route, Routes } from "react-router-dom";
import { Home, SingleProduct, Cart, Error, About, Products } from "./pages";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup.js";
import LegalInfo from "./pages/About&Home/LegalInfo.js";
import PurchaseInfo from "./pages/About&Home/PurchaseInfo.js";
import UserEmailInputPage from "./pages/Auth/ForgotMyPassword/UserEmailInputPage.js";
import ChangePasswordLandingPage from "./pages/Auth/ForgotMyPassword/ChangePasswordLandingPage.js";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="legalinfo" element={<LegalInfo />} />
      <Route path="purchaseinfo" element={<PurchaseInfo />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<SingleProduct />} />
      <Route path="forgotmypasswordpage" element={<UserEmailInputPage />} />
      <Route
        path="changepasswordlandingpage"
        element={<ChangePasswordLandingPage />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
