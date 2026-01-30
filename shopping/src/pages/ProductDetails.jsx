import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";
import { CartContext } from "../context/CartContext";
import "../components/Css/ProductDetails.css";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setProduct(res.data);
                return res.data.category;
            })
            .then(category => {
                axios.get("https://fakestoreapi.com/products")
                    .then(res => {
                        const rec = res.data.filter(p => p.category === category && p.id != id);
                        setRecommended(rec);
                    });
            });
    }, [id]);

    if (!product) return <div className="loading">Loading...</div>;

    return (
        <section className="details-container">
            <div className="product-details">
                <img src={product.image} alt={product.title} className="details-image" />
                <div className="details-info">
                    <h1>{product.title}</h1>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className="category"><b>Category:</b> {product.category}</p>
                    <p className="description">{product.description}</p>
                    <button 
                        onClick={() => addToCart(product)} 
                        className="add-btn"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Recommended */}
            <div className="recommended-section">
                <h2 className="sub-heading">Recommended Products</h2>
                <div className="recommended-grid">
                    {recommended.map(P => (
                        <ProductCard key={P.id} product={P} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;
