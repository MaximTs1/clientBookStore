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
  {featured.slice(-6).reverse().map((product) => {
    return <Product key={product.id} {...product} />;
  })}
</div>

      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);

  .section-center{
    min-width:55%;
    max-width: 60%;
  }
  .featured {
    margin: 2rem auto;
    display: grid;
    width: 65vw;
    gap: 2.5rem;
    img {
      height: 100%;
      width:100%;
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
