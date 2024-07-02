import React from "react";
import { useProductsContext } from "../../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "../General/Error";
import Loading from "../General/Loading";
import Product from "./Product";
const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    products: featured,
  } = useProductsContext();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Newest Books</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured
          .slice(-6)
          .reverse()
          .map((product) => {
            return <Product key={product.id} {...product} />;
          })}
      </div>

      <Link style={{ backgroundColor: "blue" }} to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #fffff9db;

  h2 {
    color:#49597c;
  }

  .underline {
    color : purple !important;
  }

  .section-center {
    min-width: 250px;
    max-width: 1800px;
  }
  .featured {
    margin: 2rem auto;
    display: grid;
    width: 65vw;
    gap: 2.5rem;

    img {
      height: 20rem;
      // width: 100%;
      object-fit: cover !important;
      object-position: center;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
