import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProducCard/ProductCard";
import CarouselImage from "../components/CarouselImages/CarouselImage";
import { CartContext } from "../context/CartContext";
import { getAllProducts, getAllCategories } from "../service/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm, selectedCategory, setSelectedCategory, sortOption } = useContext(CartContext);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    Promise.all([getAllProducts(20), getAllCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
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

      {/* Category Tabs - Desktop Only */}
      <div className="d-none d-md-flex justify-content-center gap-3 my-4 flex-wrap px-3">
        <button 
          className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 text-capitalize`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-5">
            <div className="card mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                    <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '3rem' }}></i>
                    <h4 className="mt-3">Oops!</h4>
                    <p className="text-muted">{error}</p>
                    <button onClick={fetchData} className="btn btn-primary mt-2">Retry</button>
                </div>
            </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && finalProducts.length === 0 && (
        <div className="no-products text-center py-5">
          <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
          <h3 className="mt-3">No products found</h3>
          <p className="text-muted">Try adjusting your search or filter</p>
        </div>
      )}

      {!loading && !error && finalProducts.length > 0 && (
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
