import React from "react";
import styled from "styled-components";
import { PageHero } from "../../components/General";
const PurchaseInfo = () => {
  return (
    <main>
      <PageHero title="Purchase Info" />
      <Wrapper className="page section section-center">
        <article>
          <div className="title">
            <h2>Purchase Information</h2>
            <div className="underline"></div>
          </div>
          <p>
            Order Process: <br /> Purchasing on [Your Website Name] is designed
            to be quick and user-friendly. After selecting your desired
            products, you can proceed to checkout. You'll be asked to provide
            shipping information and choose a payment method. Once you confirm
            your order, an acknowledgment email will be sent to you, detailing
            the products ordered, payment method, cost, and shipping
            information. <br />
            <br /> Payment Methods: <br /> We accept a variety of payment
            methods, including credit/debit cards, PayPal, and other digital
            wallets. All transactions are secured and encrypted to ensure your
            financial data is protected. Please note that the availability of
            certain payment methods may vary based on your region.
            <br />
            <br /> Pricing and Taxes: <br /> All prices displayed on [Your
            Website Name] are inclusive of applicable sales tax. However, please
            be aware that international shipments may incur additional customs
            duties and taxes, which are the responsibility of the customer.{" "}
            <br />
            <br />
            Shipping and Delivery: <br /> We strive to dispatch orders promptly
            and efficiently. Shipping costs and delivery times vary depending on
            the destination and shipping method selected. You can track your
            order through the tracking information provided in the shipping
            confirmation email.
            <br />
            <br /> Order Modification and Cancellation: <br />
            To modify or cancel your order, please contact our customer service
            team immediately. Orders that have already been dispatched cannot be
            modified or cancelled. <br />
            <br /> Customer Support: <br /> Our dedicated customer support team
            is here to assist you with any inquiries or issues related to your
            purchase. Please contact us at [Your Contact Information] for
            assistance.
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
    max-width: 65em;
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
export default PurchaseInfo;
