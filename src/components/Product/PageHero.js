import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3 style={{fontSize:'50px'}}>
          <Link to="/">Home </Link>
          {product && <Link to="/products">/ Products</Link>}/ {title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 30vh;
  margin-top:50px;
  display: flex;
  align-items: center;
  a {
    color: #b4b4ff;
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: #0f9964;
  }
`;

export default PageHero;
