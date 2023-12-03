import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";
import { formatPrice } from "../../utils/helpers";
import {
  Loading,
  Error,
  AddToCart,
  //Stars,
  PageHero,
} from "../../components/General";
import { GeneralContext } from "../../App";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from 'react-icons/bs';
import "./SingleProductPage.css";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  const { setLoading, snackbar, setUser, user } = useContext(GeneralContext);

  useEffect(() => {
    fetchSingleProduct(id);
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    name,
    price,
    description,
    stock,
    //,
    //reviews,
    id: sku,
    company,
    image,
  } = product;

  const isFavorite = async (id) => {
    console.log("id", id);
    const isAlreadyFavorite = user.likedBooks.includes(id);
    const updatedLikedBooks = isAlreadyFavorite
      ? user.likedBooks.filter((favoriteId) => favoriteId !== id)
      : [...user.likedBooks, id];
    // Construct the data to be sent - assuming you only want to update likedBooks
    const dataToUpdate = {
      likedBooks: updatedLikedBooks,
    };
    console.log("dataToUpdate", dataToUpdate);

    try {
      const response = await fetch(
        `http://185.229.226.27:3001/user/update-likedBooks/${user.customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const updatedUser = await response.json();
      console.log("Updated User:", updatedUser);

      setUser((user) => ({ ...user, likedBooks: updatedUser.likedBooks }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            {/* <Stars stars={stars} reviews={reviews} /> */}
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
            <span> 
              {user && <BsFillHeartFill className='Heart'size={26} style={{ color: user.likedBooks.includes(id) ? 'red' : 'rgb(51, 49, 49)' }} onClick={() => isFavorite(id)} />}
            </span> 



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
`;

export default SingleProductPage;
