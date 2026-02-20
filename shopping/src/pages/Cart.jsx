import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Css/Cart.css";

// Convert USD to INR
const convertToINR = (usdPrice) => {
  return Math.round(usdPrice * 83);
};

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your <span>Cart</span></h2>

      {cart.length === 0 && (
        <div className="empty-cart">
          <i className="bi bi-cart-x"></i>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started</p>
          <Link to="/" className="back-btn">Start Shopping</Link>
        </div>
      )}

      <div className="cart-grid">
        {cart.map(item => (
          <div key={item.id} className="cart-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="cart-price">₹{convertToINR(item.price).toLocaleString('en-IN')}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
            >
              <i className="bi bi-trash3"></i> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
