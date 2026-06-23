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
      <div className="orders-container text-center mt-5">
        <i className="bi bi-box-seam" style={{ fontSize: '4rem', color: '#ccc' }}></i>
        <h3 className="mt-3">No orders yet</h3>
        <p className="text-muted">Looks like you haven't placed any orders.</p>
        <Link to="/" className="btn btn-primary mt-3">Start Shopping</Link>
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
              <div>
                <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Order ID</p>
                <h6 className="mb-0">{order.orderId}</h6>
              </div>
              <div>
                <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Placed On</p>
                <h6 className="mb-0">{new Date(order.placedAt).toLocaleDateString()}</h6>
              </div>
              <div>
                <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Total</p>
                <h6 className="mb-0">{formatINR(order.total)}</h6>
              </div>
              <div>
                <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>
              </div>
            </div>

            <div className="order-body d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex flex-column">
                <span className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
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
                className="btn btn-outline-primary btn-sm"
              >
                {isExpanded ? 'Hide Details' : 'View Details'} <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
              </button>
            </div>

            {isExpanded && (
              <div className="order-detail-expanded">
                <div className="row">
                  <div className="col-md-8">
                    <h6 className="mb-3">Items in your order</h6>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <img src={item.image} alt={item.title} style={{ width: '50px', objectFit: 'contain' }} />
                        <div className="flex-grow-1">
                          <p className="mb-0" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.title}</p>
                          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                        </div>
                        <div className="fw-bold">{formatINR(item.price * item.quantity * 83)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-4 mt-4 mt-md-0">
                    <div className="mb-4">
                      <h6 className="mb-2">Delivery Address</h6>
                      <div className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                        <p className="mb-0 fw-bold text-dark">{order.address.name}</p>
                        <p className="mb-0">{order.address.address1}, {order.address.address2}</p>
                        <p className="mb-0">{order.address.city}, {order.address.state} - {order.address.pin}</p>
                        <p className="mb-0 mt-1"><i className="bi bi-telephone"></i> {order.address.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-2">Payment Method</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                        {order.payment.method} {order.payment.detail && `ending with ...${order.payment.detail.slice(-4)}`}
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
