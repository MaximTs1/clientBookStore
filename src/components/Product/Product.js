import React, { useState, useContext } from "react";
import { GeneralContext } from "../../App";
import styled from "styled-components";
import { formatPrice } from "../../utils/helpers";
import { FaSearch, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cart_context";
import { useFavoriteContext } from "../../context/favorite_context";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";

const Product = ({ image, name, author, price, id, stock }) => {
  const { addToCart } = useCartContext();
  const { isFavorite } = useFavoriteContext();
  const { setUser, user } = useContext(GeneralContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const navigate = useNavigate();

  const handleCartClick = () => {
    setSelectedItem({ id, image, name, author, price, stock });
    setIsModalOpen(true);
  };

  const continueShopping = (id) => {
    setIsModalOpen(false);
    addToCart(id, 1, selectedItem);
  };

  const addToCartAndGoToCart = (id) => {
    setIsModalOpen(false);
    addToCart(id, 1, selectedItem);
    navigate("/cart");
  };

  return (
    <Wrapper>
      <div className="container">
        <img src={`data:image/jpeg;base64,${image}`} alt={name} />
        <div className="links">
          <Link
            to="#"
            className="link"
            onClick={(e) => {
              e.preventDefault();
              handleCartClick();
            }}
          >
            <FaShoppingCart />
          </Link>
          <Link to={`/products/${id}`} className="link">
            <FaSearch />
          </Link>
          {user && (
            <Link className="link">
              <FaRegHeart
                style={{
                  color: user.likedBooks?.includes(id.toString())
                    ? "red"
                    : "grey",
                }}
                onClick={() => isFavorite(id, user, setUser)}
              />
            </Link>
          )}
        </div>
        <div className="column">
          <h5>{name}</h5>
          <h5>{author}</h5>
          <p>{formatPrice(price)}</p>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        itemDetails={selectedItem}
        onContinueShopping={continueShopping}
        onAddToCartAndGoToCart={addToCartAndGoToCart}
      />
    </Wrapper>
  );
};
const Wrapper = styled.article`
  .container {
    position: relative;
    border-radius: var(--radius);
    border: 0.5px solid #ddd;
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }

  .links {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: var(--transition);
  }

  .container:hover .links {
    opacity: 1;
  }

  .link {
    flex: 1;
    text-align: center;
    padding: 2.5rem 0rem 3.5rem;
    transition: var(--transition);
    border-radius: 50%;
    width: 0rem;
    height: 1.5rem;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
      transition: var(--transition);
    }
  }

  .link:hover {
    background: var(--clr-primary-5);
  }

  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
  }
  .column h5 {
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: none !important;
  }
  footer h5 {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
    margin-bottom: 2rem;
  }
`;
export default Product;
