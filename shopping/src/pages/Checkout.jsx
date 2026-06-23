import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { convertToINR, formatINR } from "../utils/currency";
import "../components/Css/Checkout.css";

function Checkout() {
  const { cart, cartTotal, clearCart, showToast } = useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: "", phone: "", email: "",
    address1: "", address2: "",
    city: "", state: "", pin: "", country: "India"
  });
  const [errors, setErrors] = useState({});
  
  const [payment, setPayment] = useState({
    method: "UPI",
    detail: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const gst = cartTotal * 0.18;
  const delivery = cartTotal > 500 ? 0 : 49;
  const grandTotal = cartTotal + gst + delivery;

  // Handle input changes
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); // clear error on type
  };

  const handlePaymentChange = (e) => {
    setPayment({ method: e.target.value, detail: "" });
  };

  // Validate Address Step
  const validateAddress = () => {
    const newErrors = {};
    const required = ["name", "phone", "email", "address1", "city", "state", "pin"];
    required.forEach(field => {
      if (!address[field].trim()) newErrors[field] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateAddress()) return;
    if (step === 2) {
      if (payment.method === "UPI" && !payment.detail) {
        showToast("Please enter UPI ID", "error");
        return;
      }
      if (payment.method === "Card" && !payment.detail) {
        showToast("Please enter Card Details", "error");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const placeOrder = () => {
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 5);

    const newOrder = {
      orderId: `ORD-${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}-${Math.floor(100000 + Math.random() * 900000)}`,
      placedAt: today.toISOString(),
      estimatedDelivery: deliveryDate.toISOString().split('T')[0],
      status: "Processing",
      items: cart,
      address,
      payment,
      subtotal: cartTotal,
      gst,
      delivery,
      total: grandTotal
    };

    const existingOrders = JSON.parse(localStorage.getItem('vexo_orders') || '[]');
    localStorage.setItem('vexo_orders', JSON.stringify([newOrder, ...existingOrders]));

    setOrderData(newOrder);
    setOrderPlaced(true);
    clearCart();
    showToast("Order placed successfully!", "success");
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-container text-center mt-5">
        <h3>Your cart is empty</h3>
        <button onClick={() => navigate("/")} className="btn btn-primary mt-3">Continue Shopping</button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="success-modal checkout-content">
          <i className="bi bi-check-circle-fill"></i>
          <h2>Order Placed Successfully!</h2>
          <p className="fs-5 mt-3">Order ID: <strong>{orderData?.orderId}</strong></p>
          <p className="text-muted">Estimated Delivery: {orderData?.estimatedDelivery}</p>
          <button onClick={() => navigate("/")} className="btn btn-success mt-4 py-2 px-4">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="mb-4">Checkout</h2>
      
      <div className="checkout-steps">
        <div className={`step-indicator ${step >= 1 ? 'step-active' : ''}`}>1</div>
        <div className={`step-indicator ${step >= 2 ? 'step-active' : ''}`}>2</div>
        <div className={`step-indicator ${step >= 3 ? 'step-active' : ''}`}>3</div>
      </div>

      <div className="checkout-content">
        {step === 1 && (
          <div className="checkout-form">
            <h4 className="mb-4">Delivery Address</h4>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" value={address.name} onChange={handleAddressChange} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input type="text" name="phone" value={address.phone} onChange={handleAddressChange} />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={address.email} onChange={handleAddressChange} />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Address Line 1 *</label>
              <input type="text" name="address1" value={address.address1} onChange={handleAddressChange} />
              {errors.address1 && <span className="error-text">{errors.address1}</span>}
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input type="text" name="address2" value={address.address2} onChange={handleAddressChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input type="text" name="city" value={address.city} onChange={handleAddressChange} />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>State *</label>
                <input type="text" name="state" value={address.state} onChange={handleAddressChange} />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>PIN Code *</label>
                <input type="text" name="pin" value={address.pin} onChange={handleAddressChange} />
                {errors.pin && <span className="error-text">{errors.pin}</span>}
              </div>
              <div className="form-group">
                <label>Country *</label>
                <input type="text" name="country" value={address.country} onChange={handleAddressChange} disabled />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button onClick={nextStep} className="btn btn-primary px-4 py-2">Next Step <i className="bi bi-arrow-right"></i></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="checkout-form">
            <h4 className="mb-4">Payment Method</h4>
            <div className="payment-options">
              <div className={`payment-option ${payment.method === 'UPI' ? 'selected' : ''}`}>
                <label>
                  <input type="radio" name="payment" value="UPI" checked={payment.method === 'UPI'} onChange={handlePaymentChange} />
                  <i className="bi bi-phone fs-4"></i> UPI
                </label>
                {payment.method === 'UPI' && (
                  <div className="payment-details">
                    <input type="text" className="form-control" placeholder="Enter UPI ID (e.g., user@upi)" 
                           value={payment.detail} onChange={e => setPayment({...payment, detail: e.target.value})} />
                  </div>
                )}
              </div>
              <div className={`payment-option ${payment.method === 'Card' ? 'selected' : ''}`}>
                <label>
                  <input type="radio" name="payment" value="Card" checked={payment.method === 'Card'} onChange={handlePaymentChange} />
                  <i className="bi bi-credit-card-2-front fs-4"></i> Credit / Debit Card
                </label>
                {payment.method === 'Card' && (
                  <div className="payment-details">
                    <input type="text" className="form-control mb-2" placeholder="Card Number" 
                           value={payment.detail} onChange={e => setPayment({...payment, detail: e.target.value})} />
                    <div className="d-flex gap-2">
                      <input type="text" className="form-control" placeholder="MM/YY" />
                      <input type="text" className="form-control" placeholder="CVV" />
                    </div>
                  </div>
                )}
              </div>
              <div className={`payment-option ${payment.method === 'NetBanking' ? 'selected' : ''}`}>
                <label>
                  <input type="radio" name="payment" value="NetBanking" checked={payment.method === 'NetBanking'} onChange={handlePaymentChange} />
                  <i className="bi bi-bank fs-4"></i> Net Banking
                </label>
                {payment.method === 'NetBanking' && (
                  <div className="payment-details">
                    <select className="form-select" value={payment.detail} onChange={e => setPayment({...payment, detail: e.target.value})}>
                      <option value="">Select Bank</option>
                      <option value="SBI">SBI</option>
                      <option value="HDFC">HDFC</option>
                      <option value="ICICI">ICICI</option>
                      <option value="Axis">Axis</option>
                      <option value="Kotak">Kotak</option>
                    </select>
                  </div>
                )}
              </div>
              <div className={`payment-option ${payment.method === 'COD' ? 'selected' : ''}`}>
                <label>
                  <input type="radio" name="payment" value="COD" checked={payment.method === 'COD'} onChange={handlePaymentChange} />
                  <i className="bi bi-cash-coin fs-4"></i> Cash on Delivery
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button onClick={prevStep} className="btn btn-outline-secondary px-4 py-2"><i className="bi bi-arrow-left"></i> Back</button>
              <button onClick={nextStep} className="btn btn-primary px-4 py-2">Review Order <i className="bi bi-arrow-right"></i></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="checkout-form">
            <h4 className="mb-4">Order Review</h4>
            <div className="row">
              <div className="col-md-7">
                <div className="order-items mb-4">
                  <h5>Items</h5>
                  {cart.map(item => (
                    <div key={item.id} className="d-flex align-items-center gap-3 mb-3 border-bottom pb-2">
                      <img src={item.image} alt={item.title} style={{ width: '60px', objectFit: 'contain' }} />
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>{item.title}</p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                      </div>
                      <div className="fw-bold">{formatINR(convertToINR(item.price) * item.quantity)}</div>
                    </div>
                  ))}
                </div>
                <div className="address-review mb-4">
                  <h5>Delivery Address</h5>
                  <p className="mb-0">{address.name}, {address.phone}</p>
                  <p className="mb-0">{address.address1}, {address.address2}</p>
                  <p className="mb-0">{address.city}, {address.state} - {address.pin}</p>
                </div>
                <div className="payment-review">
                  <h5>Payment Method</h5>
                  <p>{payment.method} {payment.detail ? `(${payment.detail})` : ''}</p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="order-summary-panel">
                  <h5 className="mb-3">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>{formatINR(cartTotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>GST (18%):</span>
                    <span>{formatINR(gst)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Delivery:</span>
                    <span>{delivery === 0 ? <span className="text-success">FREE</span> : formatINR(delivery)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4 fs-5 fw-bold text-success">
                    <span>Grand Total:</span>
                    <span>{formatINR(grandTotal)}</span>
                  </div>
                  <button onClick={placeOrder} className="btn btn-success place-order-btn">
                    Place Order
                  </button>
                  <button onClick={prevStep} className="btn btn-link w-100 mt-2 text-muted text-decoration-none">
                    <i className="bi bi-arrow-left"></i> Back to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
