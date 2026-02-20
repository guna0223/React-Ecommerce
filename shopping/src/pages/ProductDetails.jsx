import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";
import { CartContext } from "../context/CartContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Css/ProductDetails.css";

// Convert USD to INR
const convertToINR = (usdPrice) => {
  return Math.round(usdPrice * 83);
};

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setProduct(res.data);
                return res.data.category;
            })
            .then(category => {
                axios.get("https://fakestoreapi.com/products")
                    .then(res => {
                        const rec = res.data.filter(p => p.category === category && p.id != id);
                        setRecommended(rec.slice(0, 4));
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="details-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="details-container">
                <div className="no-products">
                    <h3>Product not found</h3>
                    <Link to="/" className="back-btn">Back to Home</Link>
                </div>
            </div>
        );
    }

    const inWishlist = isInWishlist(product.id);

    const handleWishlistClick = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    // Generate random rating for demo
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    const reviewCount = Math.floor(100 + Math.random() * 300);

    return (
        <section className="details-container">
            <div className="product-details">
                <div className="product-details-image">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-details-info">
                    <span className="category">{product.category}</span>
                    <h1>{product.title}</h1>
                    
                    <div className="details-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <i 
                                    key={i} 
                                    className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : 'bi-star'}`}
                                ></i>
                            ))}
                        </div>
                        <span>{rating} ({reviewCount} reviews)</span>
                    </div>

                    <p className="price">₹{convertToINR(product.price).toLocaleString('en-IN')}</p>
                    <p className="description">{product.description}</p>
                    
                    <div className="details-buttons">
                        <button 
                            onClick={() => addToCart(product)} 
                            className="add-btn"
                        >
                            <i className="bi bi-cart3"></i>
                            Add to Cart
                        </button>
                        <button 
                            onClick={handleWishlistClick} 
                            className={`wishlist-btn-details ${inWishlist ? 'active' : ''}`}
                        >
                            <i className={`bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                            {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommended */}
            {recommended.length > 0 && (
                <div className="recommended-section">
                    <h2 className="sub-heading">You May <span>Also Like</span></h2>
                    <div className="recommended-grid">
                        {recommended.map(P => (
                            <ProductCard key={P.id} product={P} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProductDetails;
