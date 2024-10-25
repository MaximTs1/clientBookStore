import React from "react";
import styled from "styled-components";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";

const ListView = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, image, name, author, price, description } = product;

        return (
          <div className="list-container">
            <article key={id} >
              <img src={`data:image/jpeg;base64,${image}`} alt={name} />
              <div>
                <h4>{name}</h4>
                <h5>{author}</h5>
                <h5 className="price">{formatPrice(price)}</h5>
                <p className="des">{description.substring(0, 150)}...</p>
                <Link to={`/products/${id}`} className="btn">
                  Details
                </Link>
              </div>
            </article>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  
  article {
    background: #22262d !important;
    box-shadow: 2px 4px 10px 2px #00000080;
    border-radius: 8px;
    width: 80%;
    margin: auto;
    padding: 10px;
  }
 
  .list-container {
    padding: 0px 0px 30px 0px;
  } 

  img {
    width: 100%;
    display: block;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: #79fb82;
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }

  .des {
    color: rgb(252, 248, 192) !important;
  }
  .btn {
    background-color: #576489e8 !impotant;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
