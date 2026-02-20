import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";
import { CartContext } from "../context/CartContext";
import "../components/Css/ProductDetails.css";

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
                                <svg key={i} viewBox="0 0 24 24" fill={i < Math.floor(rating) ? "#D4AF37" : "none"} stroke="#D4AF37" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                            ))}
                        </div>
                        <span>{rating} ({reviewCount} reviews)</span>
                    </div>

                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className="description">{product.description}</p>
                    
                    <div className="details-buttons">
                        <button 
                            onClick={() => addToCart(product)} 
                            className="add-btn"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1"/>
                                <circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                            Add to Cart
                        </button>
                        <button 
                            onClick={handleWishlistClick} 
                            className={`wishlist-btn-details ${inWishlist ? 'active' : ''}`}
                        >
                            <svg viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
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
