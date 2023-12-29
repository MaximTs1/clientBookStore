import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useCartContext } from "../context/cart_context";
import { formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../App";
import "./StripCheckout.css";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [showCreditCardInput, setShowCreditCardInput] = useState(false);
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [setClientSecret] = useState("");
  const { setUser, user } = useContext(GeneralContext);

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create-payment-intent",

        JSON.stringify({ cart, shipping_fee, total_amount })
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      // console.log(error.response)
    }
  };

  useEffect(() => {
    createPaymentIntent();
    const bootstrapStyle = document.createElement("link");
    bootstrapStyle.href =
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    bootstrapStyle.rel = "stylesheet";
    bootstrapStyle.type = "text/css";
    document.head.appendChild(bootstrapStyle);

    return () => {
      document.head.removeChild(bootstrapStyle);
    };
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await updateProductStock();
    await updateUserOrdersHistory();
    setError(null);
    setSucceeded(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 10000);
    // }
  };

  const updateProductStock = async () => {
    const itemsToUpdate = cart.map((item) => ({
      customId: item.id,
      amount: item.amount,
    }));

    await axios.post(
      "http://185.229.226.27:3001/api/update-stock",
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

    const newOrder = {
      cart: simplifiedCart,
      date: new Date().toDateString(), // Corrected to call the function
      orderStatus: "Placed",
    };

    console.log("newOrder: ", newOrder);
    try {
      const response = await fetch(
        `http://185.229.226.27:3001/user/update-order-history/${user.customId}`,
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
      console.log("Updated User:", updatedUser);

      setUser((user) => ({ ...user, likedBooks: updatedUser.likedBooks }));
    } catch (error) {
      console.error("Error:", error);
    }
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
        crossorigin="anonymous"
      />
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div class="container">
        <div class="row">
          <div class="col-xl-8">
            <div class="card">
              <div class="card-body">
                <ol class="activity-checkout mb-0 px-4 mt-3">
                  <li class="checkout-item">
                    <div class="avatar checkout-icon p-1">
                      <div class="avatar-title rounded-circle bg-primary">
                        <i class="bx bxs-receipt text-white font-size-20"></i>
                      </div>
                    </div>
                    <div class="feed-item-list">
                      <div>
                        <h5 class="font-size-16 mb-1">Delivery Info</h5>
                        <p class="text-muted text-truncate mb-4">
                          Fill in the following details for shipment
                        </p>
                        <div class="mb-3">
                          <form>
                            <div>
                              <div class="row">
                                <div class="col-lg-4">
                                  <div class="mb-3">
                                    <label
                                      class="form-label"
                                      for="billing-name"
                                    >
                                      Full Name
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="billing-name"
                                      placeholder="Enter name"
                                    />
                                  </div>
                                </div>
                                <div class="col-lg-4">
                                  <div class="mb-3">
                                    <label
                                      class="form-label"
                                      for="billing-email-address"
                                    >
                                      Email Address
                                    </label>
                                    <input
                                      type="email"
                                      class="form-control"
                                      id="billing-email-address"
                                      placeholder="Enter email"
                                    />
                                  </div>
                                </div>
                                <div class="col-lg-4">
                                  <div class="mb-3">
                                    <label
                                      class="form-label"
                                      for="billing-phone"
                                    >
                                      Phone
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="billing-phone"
                                      placeholder="Enter Phone no."
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="mb-3">
                                <label class="form-label" for="billing-address">
                                  Address
                                </label>
                                <textarea
                                  class="form-control"
                                  id="billing-address"
                                  rows="3"
                                  placeholder="Enter full address"
                                ></textarea>
                              </div>

                              <div class="row">
                                <div class="col-lg-4">
                                  <div class="mb-4 mb-lg-0">
                                    <label
                                      class="form-label"
                                      for="billing-city"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="billing-city"
                                      placeholder="Enter City"
                                    />
                                  </div>
                                </div>

                                <div class="col-lg-4">
                                  <div class="mb-0">
                                    <label class="form-label" for="zip-code">
                                      Zip / Postal code
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="zip-code"
                                      placeholder="Enter Postal code"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="checkout-item">
                    <div class="avatar checkout-icon p-1">
                      <div class="avatar-title rounded-circle bg-primary">
                        <i class="bx bxs-wallet-alt text-white font-size-20"></i>
                      </div>
                    </div>
                    <div class="feed-item-list">
                      <div>
                        <h5 class="font-size-16 mb-1">Payment Info</h5>
                        <p class="text-muted text-truncate mb-4">
                          Choose a payment method
                        </p>
                      </div>
                      <div>
                        <h5 class="font-size-14 mb-3">Payment method :</h5>
                        <div class="row">
                          <div class="col-lg-3 col-sm-6">
                            <div data-bs-toggle="collapse">
                              <label class="card-radio-label">
                                <input
                                  type="radio"
                                  name="pay-method"
                                  id="pay-methodoption1"
                                  className="card-radio-input"
                                  onChange={() => setShowCreditCardInput(true)}
                                />
                                <span class="card-radio py-3 text-center text-truncate">
                                  <i class="bx bx-credit-card d-block h2 mb-3"></i>
                                  Credit Card
                                </span>
                              </label>
                            </div>
                          </div>

                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <label class="card-radio-label">
                                <input
                                  type="radio"
                                  name="pay-method"
                                  id="pay-methodoption2"
                                  class="card-radio-input"
                                  onChange={() => setShowCreditCardInput(false)}
                                />
                                <span class="card-radio py-3 text-center text-truncate">
                                  <i class="bx bx-money d-block h2 mb-3"></i>
                                  Cash
                                </span>
                              </label>
                            </div>
                          </div>

                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <label class="card-radio-label">
                                <input
                                  type="radio"
                                  name="pay-method"
                                  id="pay-methodoption3"
                                  class="card-radio-input"
                                  checked=""
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
                              <div class="row">
                                <div class="col-lg-4">
                                  <div class="mb-4 mb-lg-0">
                                    <label class="form-label">
                                      Card number
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter card number"
                                    />
                                  </div>
                                </div>

                                <div class="col-lg-4">
                                  <div class="mb-4 mb-lg-0">
                                    <label class="form-label">
                                      Name on card
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter name"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-lg-4">
                                  <div class="mb-0">
                                    <label class="form-label">
                                      Expiry date
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter expiry date"
                                    />
                                  </div>
                                </div>
                                <div class="col-lg-4">
                                  <div class="mb-0">
                                    <label class="form-label">CVV Code</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter CVV code"
                                    />
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
            <div class="row my-4">
              <div class="col">
                <a href="products.html" class="btn btn-link text-muted">
                  <i class="mdi mdi-arrow-left me-1"></i> Continue Shopping{" "}
                </a>
              </div>
              <div class="col">
                <div className="text-end mt-2 mt-sm-0">
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
                          <td>${item.price * item.amount}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="2">
                          <h5 className="font-size-14 m-0">Sub Total :</h5>
                        </td>
                        <td>${subtotal}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <h5 className="font-size-14 m-0">
                            Shipping Charge :
                          </h5>
                        </td>
                        <td>${shipping_fee}</td>
                      </tr>
                      <tr className="bg-light">
                        <td colSpan="2">
                          <h5 className="font-size-14 m-0">Total:</h5>
                        </td>
                        <td>${total_amount + shipping_fee}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
