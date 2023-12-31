import React, { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../../App";
import "./OrderHistoryPage.css";
import "../../components/CheckOut/StripeCheckout.js";
import { PageHero } from "../../components/General";
import OrderStatusBar from "./OrderStatus.js";

const OrderHistoryPage = () => {
  const { user } = useContext(GeneralContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `http://185.229.226.27:3001/user/order-history/${user.customId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  const toggleOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(!isModalOpen);
  };

  const subtotal = selectedOrder?.cart.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  return (
    <main>
      <PageHero title="checkout" />
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index} onClick={() => toggleOrderDetails(order)}>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>View Details</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
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
                          {selectedOrder.cart.map((item) => (
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
                            <td>${10}</td>
                          </tr>
                          <tr className="bg-light">
                            <td colSpan="2">
                              <h5 className="font-size-14 m-0">Total:</h5>
                            </td>
                            <td>${subtotal + 10}</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <h5 className="font-size-14 m-0">
                                Order Status :
                              </h5>
                            </td>
                            <td>
                              <OrderStatusBar order={selectedOrder} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderHistoryPage;
