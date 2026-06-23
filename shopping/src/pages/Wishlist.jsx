import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProducCard/ProductCard";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Css/Cart.css";

function Wishlist() {
  const { wishlist, addToCart, clearWishlist } = useContext(CartContext);

  const handleAddAllToCart = () => {
    wishlist.forEach(item => addToCart(item));
    clearWishlist();
  };

  return (
    <div className="cart-container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="cart-title mb-0">Your <span>Wishlist</span></h2>
        {wishlist.length > 0 && (
          <div className="d-flex gap-2">
            <button onClick={handleAddAllToCart} className="btn btn-success">
              <i className="bi bi-cart-plus me-2"></i>Add All to Cart
            </button>
            <button onClick={clearWishlist} className="btn btn-outline-danger">
              <i className="bi bi-trash3 me-2"></i>Clear Wishlist
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-cart">
          <i className="bi bi-heart"></i>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite products here</p>
          <Link to="/" className="back-btn">Explore Products</Link>
        </div>
      ) : (
        <div className="cart-grid">
          {wishlist.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
