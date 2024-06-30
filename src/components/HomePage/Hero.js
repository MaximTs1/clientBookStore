import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import heroBcg from "../../assets/books-picture-2.jpg";
import heroBcg2 from "../../assets/book-river.jpg";
const Hero = () => {
  return (
    <Wrapper className="section-center" style={{ backgroundColor: "#101724e3", padding: "10px" }}>
      <article className="content">
        <header>
          <h1>
            Ariella's <br />
            Book Store
          </h1>
        </header>
        <p>
          Hey ! My name is Ariela and this is my bookstore 😊 <br /> Over the
          years I have read thousands of books,  <br />and now they are looking for new
          owners who will enjoy them as much as I did. <br /> Come visit and
          shop at my new store 🤩
        </p>
        <div className="btn-container">
          <Link style={{ backgroundColor: "blue" }} to="/products" className="btn hero-btn">
            shop now
          </Link>
        </div>
      </article>
      <article className="img-container">
        <img src={heroBcg} alt="book and plant" className="main-img" />
        <img src={heroBcg2} alt="person reading" className="accent-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 40vh;
  max-height: 55vh;
  min-width: 100%;
  max-width: 100%;
  margin-top: 10px;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
h1{
  text-align:center;
  color: #f3f8d6;
  font-size: 2.25rem;}
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color:#f5f5f5;
    font-size: 1rem;
    text-align:center;
  }
  .btn-container {
    display: flex;
    justify-content: center; /* Center horizontally */
    /* Add any additional styling as necessary */
}

  @media (min-width: 992px) {
    max-height: 60vh;
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
      font-size: 2.25rem;
      text-align: left;      

    }
    p {
      font-size: 1rem;
      text-align: left;      

      
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 45vh;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }

  @media (max-width: 992px) {
`;

export default Hero;
