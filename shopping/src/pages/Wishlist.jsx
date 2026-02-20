import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProducCard/ProductCard";
import "../components/css/Cart.css";

function Wishlist() {
  const { wishlist } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your <span>Wishlist</span></h2>

      {wishlist.length === 0 && (
        <div className="empty-cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite premium items</p>
          <Link to="/" className="back-btn">Explore Collection</Link>
        </div>
      )}

      <div className="cart-grid">
        {wishlist.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
