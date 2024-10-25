import React from "react";
import styled from "styled-components";
import { PageHero } from "../../components/General";
import aboutImg from "../../assets/books-picture-4.jpg";
const AboutPage = () => {
  return (
    <main style={{paddingBottom:'60px'}}>
      <PageHero title="about"/>
      <div style={{height:'60px'}}></div>
      <Wrapper className="page section section-center" >
        <img src={aboutImg} alt="books and coffee" />
        <article >
          <div className="title">
            <h2>my story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Hello, <br />
            My name is Ariella and this is my online book inventory. <br />
            I am a huge fan of reading and almost all my life you can find me in
            the evening catching up with my favorite authors and the latest
            books they have published.
            <br /> In recent years, I tried to reduce a little the stock of
            books accumulated in my house (over 3000 books 🫠), but on Facebook
            and Yad2 I found myself a little stuck and unable to find new owners
            for all the books that I love so much. <br />
            That's why I decided to create an attractive and modern website for
            my entire collection, so that anyone who is interested in one or
            several of the books, can easily add the books they like to the
            shopping cart and make a purchase, make a convenient and simple
            transfer via Paybox/Bit.
            <br /> After quick confirmation of the order by SMS that everything
            has been completed successfully - the order will be sent by a
            courier company straight to you! <br /> <br /> I hope for better and
            calmer times and that you can enjoy all the wealth of the content
            that I love so much. <br />
          </p>
        </article>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 750px;
    object-fit: cover;
  }

  h2 {
   color:#b4b4ff;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }

  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
