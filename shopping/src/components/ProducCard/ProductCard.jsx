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
          <span className="rating-badge fw-bold px-2 py-1 bg-light rounded text-dark">{rating.toFixed(1)}</span>
          <span className="d-flex align-items-center gap-1 fs-6">
            {renderStars()}
          </span>
          <span className="rating-count text-muted ms-1">({reviewCount})</span>
        </div>

        <p className="product-price fw-bold text-success fs-5">{formatINR(convertToINR(product.price))}</p>

        {inCart ? (
          <button onClick={() => navigate('/cart')} className="add-to-cart-btn btn btn-success w-100" style={{ backgroundColor: '#198754', borderColor: '#198754', color: 'white' }}>
            <i className="bi bi-cart-check me-2"></i>
            Go to Cart
          </button>
        ) : (
          <button onClick={handleCartClick} className="add-to-cart-btn btn btn-primary w-100">
            <i className="bi bi-cart3 me-2"></i>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
