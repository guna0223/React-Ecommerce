import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProducCard/ProductCard";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Css/Cart.css";

function Wishlist() {
  const { wishlist } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your <span>Wishlist</span></h2>

      {wishlist.length === 0 && (
        <div className="empty-cart">
          <i className="bi bi-heart"></i>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite products here</p>
          <Link to="/" className="back-btn">Explore Products</Link>
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
