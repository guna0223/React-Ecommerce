import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";
import { CartContext } from "../context/CartContext";
import "../components/css/index.css";


function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");
  const { searchTerm } = useContext(CartContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data));

    axios.get("https://fakestoreapi.com/products/categories")
      .then(res => setCategories(res.data));
  }, []);

  const filteredProducts =
    filter === "all" ? products : products.filter(p => p.category === filter);

  const searchedProducts = filteredProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const finalProducts = [...searchedProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <div className="home-container">

        {/* Filter & Sort */}
        <div className="filter-sort-bar">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="products-grid">
          {finalProducts.length === 0 && <h3>No products found</h3>}
          {finalProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </>
  );
}

export default Home;
