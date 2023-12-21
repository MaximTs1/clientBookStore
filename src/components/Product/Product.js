import React from "react";
import styled from "styled-components";
import { formatPrice } from "../../utils/helpers";
import { FaSearch, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
const Product = ({ image, name, category, price, id }) => {
  return (
    <Wrapper>
      <div className="container">
        <img src={`data:image/jpeg;base64,${image}`} alt={name} />
        <div className="links">
          <Link to={`/products/${id}`} className="link">
            <FaShoppingCart />
          </Link>
          <Link to={`/products/${id}`} className="link">
            <FaSearch />
          </Link>
          <Link to={`/products/${id}`} className="link">
            <FaRegHeart />
          </Link>
        </div>
      </div>
      <footer>
        <div className="column">
          <h5>{name}</h5>
          <h5>{category}</h5>
        </div>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  );
};
const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  // .link {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   background: var(--clr-primary-5);
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 2.5rem;
  //   height: 2.5rem;
  //   border-radius: 50%;
  //   transition: var(--transition);
  //   opacity: 0;
  //   cursor: pointer;
  //   svg {
  //     font-size: 1.25rem;
  //     color: var(--clr-white);
  //   }
  // }

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
    align-items: flex-start;
  }
  .column h5 {
    margin-bottom: 0.5rem;
    font-weight: 400;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
