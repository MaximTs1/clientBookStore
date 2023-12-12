import React from "react";
import { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaUserMinus,
  FaUserPlus,
  FaInfo,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import { useCartContext } from "../../context/cart_context";
import { useUserContext } from "../../context/user_context";
import { GeneralContext } from "../../App";

const CartButton = () => {
  const { closeSidebar } = useProductsContext();
  const { total_items, clearCart } = useCartContext();
  const { myUser, logout } = useUserContext();
  const navigate = useNavigate();
  const { setLoading, snackbar, setUser, user } = useContext(GeneralContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn1" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>{" "}
      {user ? (
        <div className="row">
          <Link className="cart-btn2" onClick={toggleDropdown}>
            My Account
          </Link>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/userInfo"
                className="dropdown-item"
                onClick={closeSidebar}
              >
                User Info
              </Link>
              <Link
                to="/orderhistorypage"
                className="dropdown-item"
                onClick={closeSidebar}
              >
                My Orders
              </Link>
              <Link
                to="/"
                className="dropdown-item"
                onClick={() => {
                  clearCart();
                  localStorage.clear("token");
                  window.location.reload();
                }}
              >
                LogOut
              </Link>
            </div>
          )}
          <Link to="/favoriteproducts" className="cart-btn3">
            💚
          </Link>
        </div>
      ) : (
        <button
          type="button"
          className="auth-btn"
          onClick={() => navigate("/login")}
        >
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  .cart-btn1 {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
    width: 5.5vw;
  }
  .cart-btn2 {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
    width: 7.5vw;
  }
  .cart-btn3 {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
    justify-content: center; // Center the content
    width: 2.5vw;
    height: 2.5vw; // Make height equal to the width for a perfect circle
    margin-left: 2vw;
    border: 0.5px solid var(--clr-primary-10);
    border-radius: 50%;
    padding: 3px;
  }

  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 3px;
    }
    margin-right: 5px;
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%; // Position just below the button
    // left: 0; // Align with the left edge of the parent .row
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    z-index: 10;
    width: 7.5vw;
  }
  .dropdown-item {
    padding: 5px 10px;
    text-align: center;
    color: var(--clr-grey-1);
    &:hover {
      background-color: #f1f1f1;
    }
  }
  .row {
    position: relative;
    display: flex;
    align-items: center;
  }
`;
export default CartButton;
