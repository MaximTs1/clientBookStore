import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";
import { formatPrice } from "../../utils/helpers";
import { Loading, Error, AddToCart, PageHero } from "../../components/General";
import { GeneralContext } from "../../App";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { useFavoriteContext } from "../../context/favorite_context";
import "./SingleProductPage.css";

const SingleProductPage = () => {
  const { isFavorite } = useFavoriteContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  const { setUser, user } = useContext(GeneralContext);

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    name,
    author,
    category,
    price,
    image,
    condition,
    book_parts,
    stock,
    hand,
    publishing_year,
    translation,
    publisher,
    description,
  } = product;

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <img src={`data:image/jpeg;base64,${image}`} alt={name} />
          <section className="content">
            <h2>{name}</h2>
            <h3>{author}</h3>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="info">
              <span>Category: </span>
              {category}
            </p>{" "}
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock " : "out of stock"}
            </p>
            <p className="info">
              <span>Hand :</span>
              {hand}
            </p>
            <p className="info">
              <span>Publishing Year :</span>
              {publishing_year}
            </p>
            <p className="info">
              <span>Translation :</span>
              {translation}
            </p>
            <p className="info">
              <span>Publisher :</span>
              {publisher}
            </p>
            <p className="info">
              <span>Description :</span>
              {description}
            </p>
            <hr />
            <div className="button-container">
              {stock > 0 && <AddToCart product={product} />}
              <span>
                {user && (
                  <BsFillHeartFill
                    className="Heart"
                    size={26}
                    style={{
                      color: user.likedBooks?.includes(id)
                        ? "red"
                        : "rgb(51, 49, 49)",
                    }}
                    onClick={() => isFavorite(id, user, setUser)}
                  />
                )}
              </span>
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .button-container {
    display: flex; /* Display children in a row */
    align-items: end; /* Vertically center children */
    gap: 55px; /* Adjust the gap between the buttons */
  }
  .product-center img {
    max-width: 50vw;
    max-height: 50vh;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }

  span:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;

export default SingleProductPage;
