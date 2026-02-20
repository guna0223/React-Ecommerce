import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";
import { CartContext } from "../context/CartContext";
import "../components/css/index.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm, selectedCategory, sortOption } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products?limit=20")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Filter by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Filter by search term
  const searchedProducts = filteredProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products
  const finalProducts = [...searchedProducts].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="home-container">
      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && finalProducts.length === 0 && (
        <div className="no-products">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            <path d="M8 8l6 6M14 8l-6 6"/>
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      )}

      {!loading && finalProducts.length > 0 && (
        <div className="products-grid">
          {finalProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
