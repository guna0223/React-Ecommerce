import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommended, setRecommended] = useState([]);

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

    if (!product) return <h2>Loading...</h2>;

    return (
        <section className="details-container">
            <div className="product-details">
                <img src={product.image} alt={product.title} className="details-image" />
                <div>
                    <h1>{product.title}</h1>
                    <p className="price">$ {product.price}</p>
                    <p>{product.description}</p>
                    <p><b>Category:</b> {product.category}</p>
                    <button className="add-btn">Add to Cart</button>
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
