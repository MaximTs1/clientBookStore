import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import logo from "../../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";
import { FaTimes } from "react-icons/fa";
import { links } from "../../utils/constants";
import styled from "styled-components";
import CartButtons from "../Cart/CartButtons";
import { useUserContext } from "../../context/user_context";
import { GeneralContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../context/cart_context.js";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext();
  const { myUser } = useUserContext();
  const { setLoading, snackbar, setUser, user } = useContext(GeneralContext);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef(null);
  const { total_items, clearCart } = useCartContext();
  const navigate = useNavigate();

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setIsAccountDropdownOpen(false);
      }
    };

    if (isAccountDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  return (
    <SidebarContainer>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <img src={logo} className="logo" alt="ariella books" />
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
          <li>
            <Link to="/cart" onClick={closeSidebar}>
              <span style={{ marginRight: "10px" }}>Cart</span>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/Login" onClick={closeSidebar}>
              <span style={{ marginRight: "10px" }}>Login</span>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/favoriteproducts" onClick={closeSidebar}>
                <span style={{ marginRight: "10px" }}>Favorite Products</span>
                <FontAwesomeIcon icon={faHeart} />
              </Link>
              <div className="account-dropdown" ref={accountDropdownRef}>
                <Link to="#" onClick={toggleAccountDropdown}>
                  <span style={{ marginRight: "10px" }}>My Account</span>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                {isAccountDropdownOpen && (
                  <div className="dropdown-menu">
                    {/* Add your dropdown links here */}
                    <Link to="/userInfo" onClick={closeSidebar}>
                      User Info
                    </Link>
                    <Link to="/changepassword" onClick={closeSidebar}>
                      My Password
                    </Link>
                    <Link to="/orderhistorypage" onClick={closeSidebar}>
                      My Orders
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {
                        clearCart();
                        closeSidebar();
                        localStorage.clear("token");
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      Log Out
                    </Link>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
  .cart_buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-left: 1rem;
    width: 90%;
  }
`;

export default Sidebar;
