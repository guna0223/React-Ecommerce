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
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-card">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <h5>{item.title}</h5>
                  <p className="cart-price">{formatINR(convertToINR(item.price))}</p>
                  
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="qty-selector">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn" disabled={item.quantity <= 1}><i className="bi bi-dash"></i></button>
                      <span className="qty-display">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn"><i className="bi bi-plus"></i></button>
                    </div>
                    <p className="cart-subtotal mb-0 text-muted">Subtotal: {formatINR(convertToINR(item.price) * item.quantity)}</p>
                  </div>
                  
                  <div className="cart-actions d-flex gap-2 mt-2">
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-remove">
                      <i className="bi bi-trash3"></i> Remove
                    </button>
                    <button onClick={() => handleMoveToWishlist(item)} className="btn btn-move">
                      <i className="bi bi-heart"></i> Move to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Items ({cartCount}):</span>
              <span>{formatINR(cartTotal)}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%):</span>
              <span>{formatINR(gst)}</span>
            </div>
            <div className="summary-row total">
              <span>Grand Total:</span>
              <span>{formatINR(grandTotal)}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="btn-gradient w-100 mb-3 text-center">
              Proceed to Checkout <i className="bi bi-arrow-right ms-1"></i>
            </button>
            <button onClick={clearCart} className="btn btn-clear w-100 py-2">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
