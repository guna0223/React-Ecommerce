import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProducCard/ProductCard";
import { CartContext } from "../context/CartContext";

import { getProductById, getAllProducts } from "../service/api";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Css/ProductDetails.css";
import { convertToINR, formatINR } from "../utils/currency";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(CartContext);

    const fetchData = () => {
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0);
        setQty(1);
        
        getProductById(id)
            .then(data => {
                setProduct(data);
                return data.category;
            })
            .then(category => {
                getAllProducts()
                    .then(allProducts => {
                        const rec = allProducts.filter(p => p.category === category && p.id != id);
                        setRecommended(rec.slice(0, 4));
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.error("Error:", err);
                setError(err.message || "Failed to load product");
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="details-container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="details-container text-center py-5">
                <div className="card mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
                    <div className="card-body">
                        <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '3rem' }}></i>
                        <h4 className="mt-3">Oops!</h4>
                        <p className="text-muted">{error}</p>
                        <button onClick={fetchData} className="btn btn-primary mt-2">Retry</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="details-container">
                <div className="no-products text-center py-5">
                    <h3>Product not found</h3>
                    <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
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

    const handleQtyChange = (delta) => {
        const newQty = qty + delta;
        if (newQty >= 1 && newQty <= 10) {
            setQty(newQty);
        }
    };

    return (
        <section className="details-container">
            <div className="product-details">
                <div className="product-details-image">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-details-info">
                    <span className="category">{product.category}</span>
                    <h1>{product.title}</h1>
                    
                    <div className="details-rating d-flex align-items-center gap-2 mb-3">
                        <span className="rating-badge">{rating.toFixed(1)} <i className="bi bi-star-fill"></i></span>
                        <span className="rating-count">({reviewCount} reviews)</span>
                    </div>

                    <p className="price">{formatINR(convertToINR(product.price))}</p>
                    <p className="description">{product.description}</p>
                    
                    <div className="d-flex align-items-center gap-3 mb-4 mt-3">
                        <span className="fw-bold">Quantity:</span>
                        <div className="qty-selector">
                            <button onClick={() => handleQtyChange(-1)} className="qty-btn" disabled={qty <= 1}>
                                <i className="bi bi-dash"></i>
                            </button>
                            <span className="qty-display">{qty}</span>
                            <button onClick={() => handleQtyChange(1)} className="qty-btn" disabled={qty >= 10}>
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div className="details-buttons">
                        <button 
                            onClick={() => addToCart({ ...product, quantity: qty })} 
                            className="btn-gradient w-100"
                        >
                            <i className="bi bi-cart3 me-2"></i>
                            Add to Cart
                        </button>
                        <button 
                            onClick={handleWishlistClick} 
                            className={`wishlist-btn-details ${inWishlist ? 'active' : ''} w-100`}
                        >
                            <i className={`bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                            {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommended */}
            {recommended.length > 0 && (
                <div className="recommended-section mt-5">
                    <h2 className="sub-heading mb-4">You May <span>Also Like</span></h2>
                    <div className="recommended-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
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
