import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Css/ProductCard.css";
import { convertToINR, formatINR } from "../../utils/currency";

function ProductCard({ product }) {
  const { cart, addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(CartContext);
  const inWishlist = isInWishlist(product.id);
  const navigate = useNavigate();

  const inCart = cart.some(item => item.id === product.id);

  // Ratings from API
  const rating = product.rating?.rate || 0;
  const reviewCount = product.rating?.count || 0;

  // Render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  };

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

        <div className="product-rating d-flex align-items-center gap-2 mb-2">
          <span className="rating-badge px-2 py-1">{rating.toFixed(1)} <i className="bi bi-star-fill"></i></span>
          <span className="rating-count">({reviewCount})</span>
        </div>

        <p className="product-price">{formatINR(convertToINR(product.price))}</p>

        {inCart ? (
          <button onClick={() => navigate('/cart')} className="btn-gradient w-100 mt-2 d-flex justify-content-center align-items-center">
            <i className="bi bi-cart-check me-2"></i>
            Go to Cart
          </button>
        ) : (
          <button onClick={handleCartClick} className="btn-gradient w-100 mt-2 d-flex justify-content-center align-items-center">
            <i className="bi bi-cart3 me-2"></i>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
