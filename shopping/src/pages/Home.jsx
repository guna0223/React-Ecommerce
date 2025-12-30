import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProducCard/ProductCard";
import "../components/css/index.css";


function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(res => setProducts(res.data));
    axios.get("https://fakestoreapi.com/products/categories").then(res => setCategories(res.data));
  }, []);

  const filteredProducts =
    filter === "all" ? products : products.filter(p => p.category === filter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
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
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

export default Home;
