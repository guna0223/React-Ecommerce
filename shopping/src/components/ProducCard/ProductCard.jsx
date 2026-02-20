import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "../Css/ProductCard.css"

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
          {inWishlist ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          )}
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
              <svg key={i} viewBox="0 0 24 24" fill={i < Math.floor(rating) ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="rating-count">({reviewCount})</span>
        </div>

        <p className="product-price">{product.price.toFixed(2)}</p>

        <button onClick={handleCartClick} className="add-to-cart-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
