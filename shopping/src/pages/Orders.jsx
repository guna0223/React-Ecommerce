import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatINR } from "../utils/currency";
import "../components/Css/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('vexo_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing": return "status-processing";
      case "Shipped": return "status-shipped";
      case "Delivered": return "status-delivered";
      default: return "status-processing";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="empty-orders">
          <i className="bi bi-box-seam"></i>
          <h3>No orders yet</h3>
          <p>Looks like you haven't placed any orders.</p>
          <Link to="/" className="btn-gradient px-4 py-2 mt-2">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="mb-4">My Orders</h2>
      
      {orders.map((order, index) => {
        // Apply index-based logic for demo purposes as requested
        const status = index === 0 ? "Delivered" : index === 1 ? "Shipped" : "Processing";
        const isExpanded = expandedOrders[order.orderId];

        return (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <div className="order-header-item">
                <p>Order ID</p>
                <h6>{order.orderId}</h6>
              </div>
              <div className="order-header-item">
                <p>Placed On</p>
                <h6>{new Date(order.placedAt).toLocaleDateString()}</h6>
              </div>
              <div className="order-header-item">
                <p>Total</p>
                <h6>{formatINR(order.total)}</h6>
              </div>
              <div>
                <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>
              </div>
            </div>

            <div className="order-body d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex flex-column">
                <span className="text-muted fw-bold" style={{ fontSize: '0.9rem' }}>
                  {status === 'Delivered' ? 'Delivered on' : 'Estimated Delivery'}: {new Date(order.estimatedDelivery).toLocaleDateString()}
                </span>
                <div className="order-thumbnails">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img key={i} src={item.image} alt={item.title} title={item.title} />
                  ))}
                  {order.items.length > 3 && (
                    <div className="more-thumbnails">+{order.items.length - 3}</div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => toggleExpand(order.orderId)} 
                className={`btn-view-details ${isExpanded ? 'expanded' : ''}`}
              >
                {isExpanded ? 'Hide Details' : 'View Details'} <i className="bi bi-chevron-down ms-1"></i>
              </button>
            </div>

            {isExpanded && (
              <div className="order-detail-expanded">
                <div className="row">
                  <div className="col-md-7">
                    <h5 className="mb-4 fw-bold">Items in your order</h5>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <img src={item.image} alt={item.title} />
                        <div className="flex-grow-1">
                          <h6>{item.title}</h6>
                          <p>Qty: {item.quantity}</p>
                        </div>
                        <div className="price">{formatINR(item.price * item.quantity * 83)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-5 mt-4 mt-md-0">
                    <div className="receipt-info-block">
                      <h6>Delivery Address</h6>
                      <p className="fw-bold">{order.address.name}</p>
                      <p>{order.address.address1}, {order.address.address2}</p>
                      <p>{order.address.city}, {order.address.state} - {order.address.pin}</p>
                      <p className="mt-2"><i className="bi bi-telephone me-2"></i>{order.address.phone}</p>
                    </div>
                    <div className="receipt-info-block mb-0">
                      <h6>Payment Method</h6>
                      <p className="fw-bold">
                        <i className="bi bi-credit-card-2-front me-2"></i>
                        {order.payment.method} {order.payment.detail && `(ending with ...${order.payment.detail.slice(-4)})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
