import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../components/css/Cart.css";


function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 && <p className="empty-text">Cart is empty 😢</p>}

      <div className="cart-grid">
        {cart.map(item => (
          <div key={item.id} className="cart-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cart;
