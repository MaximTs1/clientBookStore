import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../../App";
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
    const { user } = useContext(GeneralContext);
    const [orderHistory, setOrderHistory] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`http://185.229.226.27:3001/user/order-history/${user.customId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  });

  const toggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  return (
    <div>
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleOrderDetails(index)}>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>View Details</td>
              </tr>
              {selectedOrderId === index && (
                <tr className="details-row">
                  <td colSpan="2">
                    <div className="details-content">
                      <ul>
                        {order.cart.map((item, idx) => (
                          <li key={idx}>
                            {item.name} - {item.amount} x ${item.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryPage;
