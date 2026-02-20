import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProducCard/ProductCard";
import CarouselImage from "../components/CarouselImages/CarouselImage";
import { CartContext } from "../context/CartContext";
import { getAllProducts } from "../service/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm, selectedCategory, sortOption } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    getAllProducts(20)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
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
      {/* Carousel */}
      <CarouselImage />

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
          <i className="bi bi-search"></i>
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
