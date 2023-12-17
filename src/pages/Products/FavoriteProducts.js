import React from "react";
import styled from "styled-components";
import {
  Filters,
  FavoriteProductList,
  Sort,
  PageHero,
} from "../../components/General";
const FavoriteProducts = () => {
  return (
    <main>
      <PageHero title="Favorite products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <FavoriteProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default FavoriteProducts;
