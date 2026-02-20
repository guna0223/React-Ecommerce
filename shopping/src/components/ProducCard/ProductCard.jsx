import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Css/ProductCard.css";

// Convert USD to INR (approx rate: 1 USD = 83 INR)
const convertToINR = (usdPrice) => {
  return Math.round(usdPrice * 83);
};

function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(CartContext);
  const inWishlist = isInWishlist(product.id);

  // Generate random rating for demo (FakeStoreAPI doesn't provide ratings)
  const rating = (3.5 + Math.random() * 1.5).toFixed(1);
  const reviewCount = Math.floor(50 + Math.random() * 200);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <i className={`bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
      </div>

      <div className="card-content">
        <span className="product-category">{product.category}</span>
        
        <Link to={`/product/${product.id}`} className="card-title-link">
          <h2 className="product-title">{product.title}</h2>
        </Link>

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : 'bi-star'}`}
              ></i>
            ))}
          </div>
          <span className="rating-count">({reviewCount})</span>
        </div>

        <p className="product-price">₹{convertToINR(product.price).toLocaleString('en-IN')}</p>

        <button onClick={handleCartClick} className="add-to-cart-btn">
          <i className="bi bi-cart3"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
