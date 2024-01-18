import React from "react";
import styled from "styled-components";
import { PageHero } from "../../components/General";
const LegalInfo = () => {
  return (
    <main>
      <PageHero title="Legal Info" />
      <Wrapper className="page section section-center">
        <article>
          <div className="title">
            <h2>Legal Information</h2>
            <div className="underline"></div>
          </div>
          <p>
            1. General Information: <br />
            Welcome to Ariella's Book Shop, an e-commerce platform dedicated to
            providing [describe products/services]. Our website is operated by
            Ariella's Book Shop and is subject to the following terms and
            conditions. By using our website, you agree to these terms.
            <br /> <br /> 2.Intellectual Property Rights: <br />
            The content published on Ariella's Book Shop, including texts,
            graphics, logos, images, as well as the compilation thereof, and any
            software used on the site, is the property of Ariella's Book Shop or
            its suppliers and protected by copyright and intellectual property
            laws.
            <br /> <br /> 3. User Obligations <br /> Users of Ariella's Book
            Shop are expected to use the website lawfully, not to violate any
            applicable laws and regulations, and not to infringe on the rights
            of others or restrict or inhibit their use and enjoyment of the
            website.
            <br /> <br />
            4. Product Information: <br /> Ariella's Book Shop makes every
            effort to ensure that product descriptions and prices are accurate.
            However, errors may occur. If an error in the pricing of products is
            found, Ariella's Book Shop will inform you as soon as possible and
            offer the option of reconfirming your order at the correct price or
            cancelling it. <br />
            <br /> 5. Order Cancellation, Return, and Refund Policy:
            <br />
            Please refer to our detailed [Return and Refund Policy] for
            information about cancelling orders, returning products, and
            receiving refunds. <br />
            <br /> 6. Privacy Policy: <br /> Your privacy is important to us.
            Our [Privacy Policy] explains how we collect, use, protect, and when
            necessary, disclose your personal information. By using our website,
            you agree to the collection and use of information in accordance
            with this policy. <br />
            <br /> 7. Limitation of Liability: <br />
            Ariella's Book Shop will not be liable for any indirect, incidental,
            special, consequential or punitive damages, or any loss of profits
            or revenues, whether incurred directly or indirectly, or any loss of
            data, use, goodwill, or other intangible losses, resulting from your
            access to, use of, or inability to access or use the services.
            <br />
            <br /> 8. Changes to Terms and Conditions:
            <br /> Ariella's Book Shop reserves the right to modify these terms
            at any time. Your continued use of the site will constitute your
            acceptance of the changes to these terms. <br />
            <br />
            9. Governing Law: <br /> These terms shall be governed by and
            construed in accordance with the laws of [Your Country/State].
            <br />
            <br /> 10. Contact Information: <br /> For any questions regarding
            these terms or the services we provide, please contact us at [Your
            Contact Information].
          </p>
        </article>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
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
export default LegalInfo;
