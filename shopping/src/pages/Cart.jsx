import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Css/Cart.css";
import { convertToINR, formatINR } from "../utils/currency";

function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    addToWishlist, 
    cartTotal, 
    cartCount 
  } = useContext(CartContext);
  
  const navigate = useNavigate();

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  const gst = cartTotal * 0.18;
  const grandTotal = cartTotal + gst;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your <span>Cart</span></h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <i className="bi bi-cart-x"></i>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started</p>
          <Link to="/" className="back-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-content d-flex flex-column flex-lg-row gap-4">
          <div className="cart-items flex-grow-1">
            {cart.map(item => (
              <div key={item.id} className="cart-card d-flex flex-column flex-md-row gap-3 align-items-center mb-3 p-3 border rounded shadow-sm">
                <img src={item.image} alt={item.title} style={{ width: '100px', objectFit: 'contain' }} />
                <div className="cart-item-details flex-grow-1">
                  <h5>{item.title}</h5>
                  <p className="cart-price fw-bold text-success mb-2">{formatINR(convertToINR(item.price))}</p>
                  
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="qty-controls btn-group" role="group">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-outline-secondary btn-sm"><i className="bi bi-dash"></i></button>
                      <span className="btn btn-outline-secondary btn-sm disabled text-dark">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-outline-secondary btn-sm"><i className="bi bi-plus"></i></button>
                    </div>
                    <p className="cart-subtotal mb-0 text-muted">Subtotal: {formatINR(convertToINR(item.price) * item.quantity)}</p>
                  </div>
                  
                  <div className="cart-actions d-flex gap-2 mt-2">
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm">
                      <i className="bi bi-trash3"></i> Remove
                    </button>
                    <button onClick={() => handleMoveToWishlist(item)} className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-heart"></i> Move to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary p-4 border rounded shadow-sm h-100" style={{ minWidth: '300px' }}>
            <h4 className="mb-4">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Items ({cartCount}):</span>
              <span>{formatINR(cartTotal)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>GST (18%):</span>
              <span>{formatINR(gst)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4 fw-bold fs-5 text-success">
              <span>Grand Total:</span>
              <span>{formatINR(grandTotal)}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="btn btn-success w-100 mb-2 py-2 fw-bold">
              Proceed to Checkout <i className="bi bi-arrow-right"></i>
            </button>
            <button onClick={clearCart} className="btn btn-outline-danger w-100 py-2">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
