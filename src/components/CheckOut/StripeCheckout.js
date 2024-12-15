import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
// import { loadStripe } from "@stripe/stripe-js";
// import { CardElement, Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useCartContext } from "../../context/cart_context";
import { formatPrice } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";
import "./StripCheckout.css";
import { validations } from "./formValidation";

// const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [showCreditCardInput, setShowCreditCardInput] = useState(false);
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [setClientSecret] = useState("");
  const { setUser, user, snackbar } = useContext(GeneralContext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "",
    cardNumber: "",
    cardFullName: "",
    expDate: "",
    cvv: "",
  });

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const [errors, setErrors] = useState({});

  // const createPaymentIntent = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "/.netlify/functions/create-payment-intent",

  //       JSON.stringify({ cart, shipping_fee, total_amount })
  //     );
  //     setClientSecret(data.clientSecret);
  //   } catch (error) {
  //     // console.log(error.response)
  //   }
  // };

  useEffect(() => {
    // createPaymentIntent();
    const bootstrapStyle = document.createElement("link");
    bootstrapStyle.href =
      "http://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    bootstrapStyle.rel = "stylesheet";
    bootstrapStyle.type = "text/css";
    document.head.appendChild(bootstrapStyle);

    return () => {
      document.head.removeChild(bootstrapStyle);
    };
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const newErrors = {};

    validations.forEach(({ field, validate, errorMessage }) => {
      // Skip credit card related fields if credit card is not selected
      if (
        showCreditCardInput ||
        (!showCreditCardInput &&
          !["cardNumber", "cardFullName", "expDate", "cvv"].includes(field))
      ) {
        if (!validate(deliveryInfo[field])) {
          newErrors[field] = errorMessage;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await updateProductStock();
      await updateUserOrdersHistory();
      setError(null);
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 1500);
    }
  };

  const updateProductStock = async () => {
    const itemsToUpdate = cart.map((item) => ({
      customId: item.id,
      amount: item.amount,
    }));

    await axios.post(
      "http://localhost:3001/book/update-stock",
      itemsToUpdate
    );
  };

  const updateUserOrdersHistory = async () => {
    const simplifiedCart = cart.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      amount: item.amount,
      price: item.price,
    }));

    const updatedPaymentMethod = showCreditCardInput ? "CreditCard" : "Cash";
    const updatedDeliveryInfo = {
      ...deliveryInfo,
      paymentMethod: updatedPaymentMethod,
    };

    const newOrder = {
      cart: simplifiedCart,
      date: new Date().toDateString(), // Corrected to call the function
      orderStatus: "Placed",
      info: updatedDeliveryInfo,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/user/update-order-history/${user.customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const updatedUser = await response.json();

      setUser((user) => ({ ...user, likedBooks: updatedUser.likedBooks }));
      snackbar("Purchase was successfully updated!");
    } catch (error) {}
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  return (
    <div className="checkout_frame">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
        integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
        crossOrigin="anonymous"
      />
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body">
                <ol className="activity-checkout mb-0 px-4 mt-3">
                  <li className="checkout-item">
                    <div className="avatar checkout-icon p-1">
                      <div className="avatar-title rounded-circle bg-primary">
                        <i className="bx bxs-receipt text-white font-size-20"></i>
                      </div>
                    </div>
                    <div className="feed-item-list">
                      <div>
                        <h5 className="font-size-16 mb-1">Delivery Info</h5>
                        <p className="text-muted text-truncate mb-4">
                          Fill in the following details for shipment
                        </p>
                        <div className="mb-3">
                          <form>
                            <div>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="billing-name"
                                    >
                                      Full Name
                                    </label>
                                    <input
                                      type="text"
                                      name="fullName"
                                      value={deliveryInfo.fullName}
                                      onChange={handleDeliveryInfoChange}
                                      className="form-control"
                                      id="billing-name"
                                      placeholder="Enter name"
                                    />
                                    {errors.fullName && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.fullName}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="billing-email-address"
                                    >
                                      Email Address
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      value={deliveryInfo.email}
                                      onChange={handleDeliveryInfoChange}
                                      className="form-control"
                                      id="billing-email-address"
                                      placeholder="Enter email"
                                    />
                                    {errors.email && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.email}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="billing-phone"
                                    >
                                      Phone
                                    </label>
                                    <input
                                      type="text"
                                      name="phone"
                                      value={deliveryInfo.phone}
                                      onChange={handleDeliveryInfoChange}
                                      className="form-control"
                                      id="billing-phone"
                                      placeholder="Enter Phone no."
                                    />
                                    {errors.phone && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.phone}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="billing-address"
                                >
                                  Address
                                </label>
                                <textarea
                                  className="form-control"
                                  id="billing-address"
                                  rows="3"
                                  placeholder="Enter full address"
                                  name="address"
                                  value={deliveryInfo.address}
                                  onChange={handleDeliveryInfoChange}
                                ></textarea>
                                {errors.address && (
                                  <div
                                    style={{ color: "red", marginTop: "10px" }}
                                  >
                                    {errors.address}
                                  </div>
                                )}
                              </div>

                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="mb-4 mb-lg-0">
                                    <label
                                      className="form-label"
                                      htmlFor="billing-city"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      name="city"
                                      value={deliveryInfo.city}
                                      onChange={handleDeliveryInfoChange}
                                      className="form-control"
                                      id="billing-city"
                                      placeholder="Enter City"
                                    />
                                    {errors.city && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.city}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4">
                                  <div className="mb-0">
                                    <label
                                      className="form-label"
                                      htmlFor="zip-code"
                                    >
                                      Zip / Postal code
                                    </label>
                                    <input
                                      type="text"
                                      name="postalCode"
                                      value={deliveryInfo.postalCode}
                                      onChange={handleDeliveryInfoChange}
                                      className="form-control"
                                      id="postalCode"
                                      placeholder="Enter Postal code"
                                    />
                                    {errors.postalCode && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.postalCode}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="checkout-item">
                    <div className="avatar checkout-icon p-1">
                      <div className="avatar-title rounded-circle bg-primary">
                        <i className="bx bxs-wallet-alt text-white font-size-20"></i>
                      </div>
                    </div>
                    <div className="feed-item-list">
                      <div>
                        <h5 className="font-size-16 mb-1">Payment Info</h5>
                        <p className="text-muted text-truncate mb-4">
                          Choose a payment method
                        </p>
                      </div>
                      <div>
                        <h5 className="font-size-14 mb-3">Payment method :</h5>
                        <div className="row">
                          <div className="col-lg-3 col-sm-6">
                            <div data-bs-toggle="collapse">
                              <label className="card-radio-label">
                                <input
                                  type="radio"
                                  name="pay-method"
                                  id="pay-methodoption1"
                                  className="card-radio-input"
                                  onChange={() => setShowCreditCardInput(true)}
                                />
                                <span className="card-radio py-3 text-center text-truncate">
                                  <i className="bx bx-credit-card d-block h2 mb-3"></i>
                                  Credit Card
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-3 col-sm-6">
                            <div>
                              <label className="card-radio-label">
                                <input
                                  type="radio"
                                  name="pay-method"
                                  id="pay-methodoption2"
                                  className="card-radio-input"
                                  onChange={() => setShowCreditCardInput(false)}
                                />
                                <span className="card-radio py-3 text-center text-truncate">
                                  <i className="bx bx-money d-block h2 mb-3"></i>
                                  Cash
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-3 col-sm-6">
                            <div>
                              <label className="card-radio-label">
                                <input
                                  type="radio"
                                  name="pay-method"
                                  id="pay-methodoption3"
                                  className="card-radio-input"
                                  // checked=""
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        {showCreditCardInput && (
                          <div
                            id="collapseCC"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionPayment"
                          >
                            <div className="accordion-body">
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="mb-4 mb-lg-0">
                                    <label className="form-label">
                                      Card number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter card number"
                                      name="cardNumber"
                                      value={deliveryInfo.cardNumber}
                                      onChange={handleDeliveryInfoChange}
                                      id="cardNumber"
                                    />
                                    {errors.cardNumber && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.cardNumber}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4">
                                  <div className="mb-4 mb-lg-0">
                                    <label className="form-label">
                                      Name on card
                                    </label>
                                    <input
                                      type="text"
                                      name="cardFullName"
                                      value={deliveryInfo.cardFullName}
                                      onChange={handleDeliveryInfoChange}
                                      className="form-control"
                                      id="billing-name"
                                      placeholder="Enter name"
                                    />
                                    {errors.cardFullName && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.cardFullName}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="mb-0">
                                    <label className="form-label">
                                      Expiry date
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter expiry date"
                                      name="expDate"
                                      value={deliveryInfo.expDate}
                                      onChange={handleDeliveryInfoChange}
                                      id="exp-Date"
                                    />
                                    {errors.expDate && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.expDate}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mb-0">
                                    <label className="form-label">
                                      CVV Code
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter CVV code"
                                      name="cvv"
                                      value={deliveryInfo.cvv}
                                      onChange={handleDeliveryInfoChange}
                                      id="cvv"
                                    />
                                    {errors.cvv && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "3px",
                                        }}
                                      >
                                        {errors.cvv}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="card checkout-order-summary">
              <div className="card-body">
                <div className="p-3 bg-light mb-3">
                  <h5 className="font-size-16 mb-0">Order Summary</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-centered mb-0 table-nowrap">
                    <thead>
                      <tr>
                        <th className="border-top-0" scope="col">
                          Product
                        </th>
                        <th className="border-top-0" scope="col">
                          Amount
                        </th>
                        <th className="border-top-0" scope="col">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              className="img"
                              src={`data:image/jpeg;base64,${item.image}`}
                              alt={item.name}
                            />
                            <p className="font-size-16 text-truncate">
                              {item.name}
                            </p>
                          </td>
                          <td>{item.amount}</td>
                          <td>₪{item.price * item.amount}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="2">
                          <h5 className="font-size-14 m-0">Sub Total :</h5>
                        </td>
                        <td>₪{subtotal}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <h5 className="font-size-14 m-0">
                            Shipping Charge :
                          </h5>
                        </td>
                        <td>₪{shipping_fee}</td>
                      </tr>
                      <tr className="bg-light">
                        <td colSpan="2">
                          <h5 className="font-size-14 m-0">Total:</h5>
                        </td>
                        <td>₪{total_amount + shipping_fee}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-4 justify-content-center">
            <div className="col-auto continue_shopping_button ">
              <a href="products.html" className="btn btn-link text-muted">
                <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping{" "}
              </a>
            </div>
            <div className="col-auto pay_button">
              <form id="payment-form" onSubmit={handleSubmit}>
                <button
                  id="submit"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
